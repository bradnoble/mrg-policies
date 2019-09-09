<template>
    <form action="#" @submit.prevent="pushToRouter">
      <div class="input-field">
        <i class="material-icons prefix">search</i>

        <input id="search" type="text" v-model="searchStr" placeholder="Search..." />
        <!-- <label for="search">Search</label> -->
      </div>
    </form>
</template>

<script lang="ts">
import axios from 'axios';
import Vue from 'vue';
import myAPI from '@/js/api';

export default Vue.extend({
  name: 'SearchForm',
  data: function(){
    return {
      searchStr: this.$route.query.q
    }
  },
  computed: {},
  updated(){
    // TODO: M.updateTextFields();
  },
  methods: {
    pushToRouter: function(){
      if(Object.keys(this.searchStr).length > 0){
        this.$router.push({
          name: 'search',
          query: {
            q: this.searchStr
          }
        });
      }
    }
  }
});
</script>
