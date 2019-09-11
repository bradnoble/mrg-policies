<template>
  <div class="">
    <div class="row">
      <div class="col s12 m12 ">

        <error :errors="errors" />
        <loading :loading="loading" />

        <h1>
          {{ item.title | capitalize }}
        </h1>

        <div class="section flow-text">
          <div>
            <div class="chip" :class="item.type">{{ item.type }}</div>
            <span v-if="item.date" class="chip date">
              <span v-if="item.type == 'policy'">Adopted:</span> 
              {{ item.date | readerFriendlyDate }}
            </span>
          </div>
          <p>
            {{ item.body | capitalize }}
          </p>

          <p v-if="item.url">
            More: <url :item="item" />
          </p>
        </div>

        <div class="section" v-if="item.policies && item.policies.length > 0">
          <h5>
            Related policies
          </h5>
          <items :items="policies" />
        </div><!--section-->

        <div class="section" v-if="relatedItems && relatedItems.length > 0">
          <h5>
            Related items
          </h5>
          <items :items="relatedItems" />
        </div><!--section-->



        <div class="section">
          <div class="divider"></div>
          <p>
            <router-link :to="{name: 'itemsByType', params: {category: 'policy'}}">
              &larr; Back to policies
            </router-link>
            <router-link :to="{name: 'edit', params: {id: $route.params.id}}" class="right">
              <i class="material-icons tiny">edit</i> Edit this item
            </router-link>
          </p>
        </div>
      </div><!--col-->


    </div><!--row-->
        <pre class="hide">{{ errors }}</pre>
        <pre class="hide">{{ item }}</pre>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import items from '@/components/items.vue';
import url from '@/components/url.vue';
import loading from '@/components/loading.vue';
import error from '@/components/error.vue';
import api from '@/js/api';
import factories from '@/js/factories';

export default Vue.extend({
  name: 'ItemDetail',
  components: {
    error,
    loading,
    items,
    url,
  },
  data() {
    return {
      item: {} as any,
      errors: [] as any,
      policies: [] as any[],
      relatedItems: [] as any[],
      loading: true,
    };
  },
  mounted() {
    return setTimeout(() => {
      this.fetchData();
    }, 1000);
  },
  watch: {
    $route(to, from) {
      this.fetchData();
    },
  },
  methods: {
    async getItem() {
      try {
        const { data } = await api.lookup(this.$route.params.id);
        return data;
      } catch (e) {
        this.errors.push(e);
      }
    },
    async getRelatedPolicies() {
      try {
        const { data } = await api.getItemsById(this.item.policies);
        // https://wesbos.com/destructuring-objects/
        return factories.extractRows(data);
      } catch (e) {
        this.errors.push(e);
      }
    },
    async getRelatedItems() {
      try {
        const { data } = await api.getRelatedItems(this.item._id);
        return factories.extractRows(data);
      } catch (e) {
        this.errors.push(e);
      }
    },
    async fetchData() {
      try {
        this.item = await this.getItem();
        if (this.item.type !== 'policy') {
          this.policies = await this.getRelatedPolicies();
        } else {
          this.relatedItems = await this.getRelatedItems();
        }
      } catch (e) {
        this.errors.push(e);
      } finally {
        if (this.errors && this.errors.length > 0) {
          this.$emit('show-error', this.errors);
        }
        this.loading = false;
      }
    },
  },
});
</script>
<style lang="scss">
.chip {
  text-transform: uppercase;
  &.policy {
    background: red;
    color: white;
  }
  &.date {
    background: ghostwhite;
  }

}
</style>
