<template>
  <div id="app">
    <div class="container">
      <img src="./assets/mrg-logo.png" class="logo" />
      <span id="nav">
        <router-link :to="{name: 'itemsByType', params: {category: 'policy'}}">Policies</router-link> | 
        <router-link :to="{name: 'itemsByType', params: {category: 'clip'}}">Clips</router-link> | 
        <router-link to="/search">Search</router-link>      
        </span>
      <router-view />
    </div>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import searchForm from '@/components/searchForm.vue';
import api from '@/js/api';
import factories from '@/js/factories';

export default Vue.extend({
  name: 'Home',
  components: {
    searchForm
  },
  data () {
    return {
    }
  },
  mounted: function(){
  },
  watch: {
  },
  methods: {
  }
});
</script>



<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    color: #2c3e50;
    text-decoration: underline;
    &.router-link-exact-active {
      color: green;
      font-weight: bold;
      text-decoration: none;
    }
  }
}
.container {
  text-align: left
}
img.logo {
  width: 50px;
}
.item {
  h6 {
    a {
      font-weight: bold
    }
  }
}
span.type {
  opacity: .5;
  text-transform: uppercase;
  font-size: .85em;
}
span.type.chip {
  color: green
}
span.type.policy {
  color: red
}
.chip.clip {
  background-color: #94abbb;
  color: white;
}
.chip.policy {
  background-color: #365e7a;
  color: white;
}
i.material-icons {
  vertical-align: bottom !important;
}
i.material-icons.large {
  vertical-align: middle !important;
}
i.material-icons.tiny {
  vertical-align: middle !important;
}
</style>
