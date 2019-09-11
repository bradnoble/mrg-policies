<template>
    <div v-if="loading">
      <div class="progress">
        <div class="indeterminate"></div>
      </div>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import Vue from 'vue';

export default Vue.extend({
  name: 'loading',
  props: [
    'loading',
  ],
});
</script>
