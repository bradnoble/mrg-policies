<template>
    <div v-if="loading" class="loader">

      <img src="../assets/mrg-logo.png" class="rotate" />




    </div>
</template>

<script lang="ts">
import axios from 'axios';
import Vue from 'vue';

export default Vue.extend({
  name: 'loading',
  props: [
    'loading',
  ],
});
</script>
<style lang="scss">
div.loader {
  display: flex; 
  align-items: center; 
  justify-content: center;
  height: 300px;
  position: relative;
}
img.rotate {
  animation: rotation 1s infinite;
  opacity: .25;
  height: 100px;
}
@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
