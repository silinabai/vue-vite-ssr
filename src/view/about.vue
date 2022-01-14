

<template>
  <div>
        <h1>{{ msg }}</h1>
        <p class="import-meta-url">{{ message }}</p>

      <img src="../assets/test.jpeg" alt="">
  </div>
</template>
<script lang="ts">
import {useStore} from 'vuex';
import {defineComponent, onMounted, ref} from 'vue';

export default defineComponent({
  setup() {
    const store = useStore();
    const message = ref<string>('')


    const asyncData=({ store })=> {
      return store.dispatch('fetchMessage');
    };

    onMounted(async()=>{
      let res = await asyncData({store})
      console.log(res, 'res');
      message.value = res
    })

    return {
      msg: 'About',
      message
    }
   
  },
})
</script>

<style>
img {
  width: 100px;
}
.import-meta-url {
  height: 30px;
  width: 100%;
}
</style>
