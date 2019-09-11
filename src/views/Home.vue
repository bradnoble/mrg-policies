<template>
  <div class="home">
    <h1>
      Welcome to MRG Policies
    </h1>
    <ul>
      <li>
        <router-link :to="{name: 'policies'}">
          Policies
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Home',
  components: {
  },
});
</script>
