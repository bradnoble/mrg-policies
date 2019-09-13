<template>
  <div class="">
    <h1 class="hide">Search</h1>

    <error :errors="errors" />
    <loading :loading="loading" />

    <div class="row" v-if="!loading && results && results.length > 0">

      <div class="facets col s12 m3">
        <h5>
          Filters
        </h5>
        <div v-for="(facet, key) in facets" v-bind:key="key">
          <div class="divider"></div>
          <h6>
            {{ key }}
          </h6>
          <ul class="browser-default">
            <li v-for="(value, index) in facet" v-bind:key="index">
              <router-link :to="{name: 'search', query: {'q': $route.query.q ,'drilldown': JSON.stringify([key, index ]) }}">{{ index }} ({{value}})</router-link>
            </li>
          </ul>
        </div>
      </div><!--col-->

      <div class="results col s12 m9">
        <h5>
          Search results
        </h5>
        <div class="collections">
            <items :items="results" />
        </div><!--collection-->
        <div class="section">
          <div class="divider"></div>
          <p>
            <router-link :to="{name: 'policies'}">
              &larr; Back to policies
            </router-link>
          </p>
        </div>
      </div><!--col-->
    </div><!--row-->
    <div v-else>
      <p v-if="$route.query.q">
        No results for <b>{{ $route.query.q }}</b>
      </p>
    </div>

  </div>
</template>

<script lang="ts">
import axios from 'axios';
import Vue from 'vue';
import items from '@/components/items.vue';
import loading from '@/components/loading.vue';
import error from '@/components/error.vue';
import searchForm from '@/components/searchForm.vue';
import api from '@/js/api';
import factories from '@/js/factories';

export default Vue.extend({
  name: 'SearchResults',
  components: {
    searchForm,
    items,
    loading,
    error,
  },
  data() {
    return {
      results: [] as string[],
      facets: [] as string[],
      errors: [] as string[],
      loading: true,
    };
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
      const searchStr = this.$route.query;
      this.loading = true;
      this.errors = [];
      try {
        if (Object.keys(searchStr).length > 0) {
          const { data } = await api.search(searchStr);
          this.results = factories.extractRows(data);
          this.facets = data.counts;
        }
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
