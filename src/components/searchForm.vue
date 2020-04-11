<template>
  <form action="#" @submit.prevent="pushToRouter" class="searchForm">
    <div class="input-field">
      <!-- <i class="material-icons prefix tiny">search</i> -->
      <input type="text" v-model="searchStr" placeholder="Search for policies..." @focus="activate()" @blur="deactivate()" :class="{active: activated == true || $route.query.q }" class="search" />
    </div>
  </form>
</template>

<script lang="ts">
import axios from 'axios';
import Vue from 'vue';
import api from '@/js/api';

export default Vue.extend({
  name: 'SearchForm',
  data() {
    return {
      searchStr: this.$route.query.q,
      activated: false,
    };
  },
  updated() {
    // TODO: M.updateTextFields();
  },
  watch: {
    $route(to, from) {
      // this will hide the search query when the view
      // is something other than search results
      if (!this.$route.query.q) {
        this.searchStr = '';
      }
    },
  },
  methods: {
    pushToRouter() {
      if (Object.keys(this.searchStr).length > 0) {
        this.$router.push({
          name: 'search',
          query: {
            q: this.searchStr,
          },
        });
      }
    },
    activate() {
      this.activated = true;
    },
    deactivate() {
      this.activated = false;
    },
  },
});
</script>
<style lang="scss">
.searchForm.hide-on-small-only {
  input.search {
    width: 35%;
    &.active {
      background-color: white;
      border-bottom: 0px;
    }
  }
}
</style>
