<template>

  <div class="collection" v-if="items && items.length > 0">
    <div class="collection-item" v-for="(item, index) in items" v-bind:key="index">
      <itemWithLinks :item="item" :editLink=true />
    </div>
  </div><!--collection-->

</template>

<script lang="ts">
import Vue from 'vue';
import itemWithLinks from '@/components/itemWithLinks.vue';

export default Vue.extend({
  name: 'Items',
  components: {
    itemWithLinks,
  },
  props: [
    'items',
    'error',
  ],
});
</script>
