<template>
  <a :href="item.url" target="_blank" class="green-text">
    {{ item.url | truncateURL }}
    <i class="material-icons tiny hide">launch</i>
  </a>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'url',
  props: [
    'item'
  ]
});
</script>
