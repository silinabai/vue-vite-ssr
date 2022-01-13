const fs = require('fs');
const path = require('path');
const express = require('express');

const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD;
const isProd = process.env.NODE_ENV === 'production';
const resolve = (p) => path.resolve(__dirname, p);
console.log(process.env.NODE_ENV, 'isProdisProd')

const templateProd = fs.readFileSync(resolve('./dist/client/index.html'), 'utf-8');
const manifest = isProd ? require('./dist/client/ssr-manifest.json') : {};

async function createApp(){

  const app = express();
  const root = process.cwd();
  let vite;

  if(isProd){
    app.use(
      require('serve-static')(resolve('dist/client'), {
        index: false
      })
    )
  } else {
    vite = await require('vite').createServer({
      root,
      logLevel: isTest ? 'error' : 'info',
      server: {
        middlewareMode: 'ssr',
        watch: {
          usePolling: true,
          interval: 100
        }
      }
    })
    app.use(vite.middlewares)
  }

  app.use('*', async (req, res) => {
    // 服务 index.html 
    const url = req.originalUrl;
    try {
      // 1. 读取 index.html
      let template, render;
      if(isProd) {
        template = templateProd;
        render = require('./dist/server/entry-server.js').render;
      } else {
        template = fs.readFileSync(
          path.resolve(__dirname, 'index.html'),
          'utf-8'
        )
        template = await vite.transformIndexHtml(url, template);
        let server  = await vite.ssrLoadModule('/src/entry-server.js');
        render = server.render;
      }

      const { appHtml, preloadLinks } = await render(url, manifest);

      const html = template.replace(`<!--preload-links-->`, preloadLinks).replace(`<!--ssr-outlet-->`, appHtml);

      // console.log(html, 'appHtml');

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)

    } catch (e) {
      // 如果捕获到了一个错误，让 Vite 来修复该堆栈，这样它就可以映射回
      // 你的实际源码中。
      vite && vite.ssrFixStacktrace(e)
      console.error(e)
      res.status(500).end(e.message)
    }
  })
  app.listen(3001, () => {
    console.log('http://localhost:3001');
  });
}

createApp()


