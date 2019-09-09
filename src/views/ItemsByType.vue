<template>
  <div class="">
    <h1 class="hide">Clips</h1>

    <searchForm />

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
    searchForm
  },
  data () {
    return {
      loading: true,
      items: [] as string[],
      errors: [] as string[]
    }
  },
  mounted: function(){
    this.fetchData();
  },
  watch: {
    '$route'(to, from) {
      this.fetchData();
    }
  },
  methods: {
    async fetchData () {
      // console.log(this.$route.params.category)
      try {
        const { data } = await api.getItemsByType([this.$route.params.category]);
        this.items = factories.extractRows(data);
      } catch (e) {
        this.errors.push(e);
      } finally {
        this.$emit('show-error', this.errors);
        this.loading = false;
      }
    }
  }
});
</script>
