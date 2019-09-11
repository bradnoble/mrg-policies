<template>
  <div class="item">
    <h6>
      <router-link :to="{name: 'item', params: {category: item.type, id: item._id}}" class="purple-text">
        {{ item.title | capitalize }}
      </router-link>
    </h6>
    <div v-if="item.url">
      <url :item="item" />
    </div>
    <div>
      <span class="date" v-if="item.date">
        {{ item.date | readerFriendlyDate }}
      </span>
      {{ item.body | truncateBodyText(90) }}
    </div>
    <span class="hide" :class="item.type">{{ item.type }}</span>      
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import url from '@/components/url.vue';

export default Vue.extend({
  name: 'ItemComponent',
  components: {
    url,
  },
  props: [
    'item',
    'editLink',
  ],
});
</script>
