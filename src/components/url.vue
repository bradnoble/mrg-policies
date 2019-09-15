<template>
  <a :href="item.url" target="_blank" class="">
    {{ item.url | truncateURL }}
    <i class="material-icons tiny">launch</i>
  </a>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'url',
  props: [
    'item',
  ],
});
</script>
