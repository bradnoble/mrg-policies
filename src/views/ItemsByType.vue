<template>
  <div class="">
    <h1 class="">
      {{ title | capitalize }}
    </h1>

    <error :errors="errors" />
    <loading :loading="loading" />

    <items 
      :items="items" 
    /> 
    <router-link :to="{name: 'add' }">
      <i class="material-icons tiny">add</i> Add item
    </router-link>

  </div>
</template>

<script lang="ts">
import axios from 'axios';
import Vue from 'vue';
import loading from '@/components/loading.vue';
import error from '@/components/error.vue';
import items from '@/components/items.vue';
import searchForm from '@/components/searchForm.vue';
import api from '@/js/api';
import factories from '@/js/factories';

export default Vue.extend({
  name: 'Types',
  components: {
    loading,
    error,
    items,
    searchForm,
  },
  data() {
    return {
      loading: true,
      items: [] as string[],
      errors: [] as string[],
    };
  },
  computed: {
    title() {
      let cat = '';
      switch (this.$route.params.category) {
        case 'policy':
          cat = 'policies';
          break;
        case 'clip':
          cat = 'clips';
          break;
        default:
          cat = '[no title]';
      }
      // this.$route.params.category
      return cat;
    },
  },
  mounted() {
    this.fetchData();
  },
  watch: {
    $route(to, from) {
      this.fetchData();
    },
  },
  methods: {
    async fetchData() {
      // console.log(this.$route.params.category)
      try {
        const category = [] as any;
        category.push(this.$route.params.category);
        const { data } = await api.getItemsByType(category);
        this.items = factories.extractRows(data);
      } catch (e) {
        this.errors.push(e);
      } finally {
        this.$emit('show-error', this.errors);
        this.loading = false;
      }
    },
  },
});
</script>
