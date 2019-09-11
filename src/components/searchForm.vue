<template>
    <form action="#" @submit.prevent="pushToRouter">
      <div class="input-field">
        <i class="material-icons prefix tiny hide">search</i>

        <input id="search" type="text" v-model="searchStr" placeholder="Search..." @focus="activate()" @blur="deactivate()" :class="{active: activated == true || searchStr }" />
        <!-- <label for="search">Search</label> -->
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
