

<template>
  <div>
      <h1>{{ msg }}</h1>
      <p class="import-meta-url">{{ message }}</p>
      <p class="import-meta-url">{{ store.state.age }}</p>
      <img src="../assets/test.jpeg" alt="">
  </div>
</template>
<script lang="ts">
import {useStore} from 'vuex';
import {defineComponent, onMounted, ref} from 'vue';

export default defineComponent({
  asyncData({ store }){
     return store.dispatch('fetchMessage');
  },
  setup() {
    const store = useStore();
    const message = store.state.message;
    onMounted(async()=>{
      
    })
    return {
      msg: 'About',
      message,
      store
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
