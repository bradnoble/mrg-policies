<template>
  <span class="">
    <b>
      {{ item.title }}
    </b>
    <div>
      {{ item.body }}
    </div>
  </span>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ItemComponent',
  props: [
    'item',
    'editLink',
  ],
});
</script>
