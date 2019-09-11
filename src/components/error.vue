<template>
  <div v-if="errors && errors.length > 0">
    <div class="row">
      <div class="col s12 m12 red white-text">
        <h4>
          Whoops, something went wrong.
        </h4>
        <p>
          Here are some hints that may help explain what happened:
        </p>
        <ol>
          <li v-for="(error, idx) in errors" v-bind:key="idx">
            {{ error }}
          </li>
        </ol>
        <p>It also may simply be that the item you're trying to access has been deleted.</p>
        <pre class="hide">{{ errors }}</pre>
      </div><!--col-->
    </div><!--row-->
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import Vue from 'vue';
import api from '@/js/api';
import factories from '@/js/factories';

export default Vue.extend({
  name: 'error',
  props: [
    'errors',
  ],
});
</script>
