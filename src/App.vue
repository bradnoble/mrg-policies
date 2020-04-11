<template>
  <div id="app">
    <div class="navbar-fixed">
      <nav>
          <!--
          <searchForm class="hide-on-small-only" />   
          <a href="#" class="brand-logo">
            <img src="./assets/mrg-logo.png" class="logo" />
          </a>
          -->
      </nav>
    </div>
      <div class="row hide-on-med-and-up interior-form">
        <div class="col s12">
        </div><!--col-->
      </div><!--row-->
    <div class="container">
      
      <searchForm />   

      <transition name="fade">
        <div v-if="alert" class="alert">
          <p class="green white-text">
            {{ this.alert }}
          </p>
        </div>
      </transition>
      <router-view @alert="onSaveAlert" />
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
    searchForm,
  },
  data() {
    return {
      alert: '',
    };
  },
  methods: {
    onSaveAlert(val: any) {
      // console.log('saved!');
      this.alert = val;
      return setTimeout(() => {
        this.alert = '';
      }, 2000);

    },
  },
});
</script>



<style lang="scss">
#app {
  /* background-color: ghostwhite; */
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
nav {
  background-color: white;
  background-image: url('./assets/mrg-logo.png');
  background-repeat: no-repeat;
  background-size: 40px;
  background-position: center; /* Center the image */
}

// for the search form on mobile
.interior-form {
  background-color: white;
  border-bottom: 1px solid #dedede;
}
.collection {
  border: 0;
  .collection-item {
    border: 0
  }
}
.item {
  b {
    a {
      color: #2c3e50;
      font-weight: bold
    }
  }
  &.row {
    margin-bottom: 0
  }
  .type {
    color: grey;
    font-size: .75rem;
    text-align: right;
    text-transform: uppercase;
  }
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

// for sidenav
a.collection-item.router-link-exact-active {
  background: #eee;
  color: black;
  font-weight: bold;
}
// for alert animations, like saving
.alert {
  position: absolute;
  left: 0;
  top: 50px;
  width: 100%;
  text-align: center;
  z-index: 1000;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
