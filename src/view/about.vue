

<template>
  <div>
      <h1>{{ msg }}</h1>
      <p class="import-meta-url">{{ store.state.message }}</p>
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
    onMounted(async()=>{
      
    })
    return {
      msg: 'About',
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
