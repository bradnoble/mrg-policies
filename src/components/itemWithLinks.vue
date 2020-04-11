<template>
  <div class="item row">
    <div class="col s12 m2 type">
      <span class="">{{ item.type | capitalize }}</span>
    </div>
    <div class="col s12 m10">
      <b>
        <router-link :to="{name: 'item', params: {category: item.type, id: item._id}}" class="underline">
          {{ item.title | capitalize }}
        </router-link>
      </b>
      <div v-if="item.url" class="hide">
        <url :item="item" />
      </div>
      <div>
        <p>
          {{ item.body | truncateBodyText(150) }}
        </p>
      </div>
      <span class="date hide" v-if="item.date">{{ item.date | readerFriendlyDate }}</span>
    </div>
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
