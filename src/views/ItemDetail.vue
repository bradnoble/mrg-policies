<template>
  <div class="">

    <error :errors="errors" />
    <loading :loading="loading"  class="hide" />

    <transition name="fade">
      <div v-if="!loading">
        <div class="row" >
          <div class="col s12 m12">
            <h1>
              {{ item.title | capitalize }}
            </h1>
          </div><!--col-->
        </div><!--row-->
        <div class="row">
          <div class="col s12 m9">
            <div class="section flow-text">
              <div>
                <div class="chip" :class="item.type">{{ item.type }}</div>
                <span v-if="item.date" class="chip date">
                  <span v-if="item.type == 'policy'">Adopted:</span> 
                  {{ item.date | readerFriendlyDate }}
                </span>
                <span v-if="!item.date || item.date == ''" class="chip date">
                  [ Date of adoption ]
                </span>
              </div>
              <p>
                {{ item.body | capitalize }}
              </p>

              <p v-if="item.url">
                More: <url :item="item" />
              </p>
            </div>

            <div class="section" v-if="relatedItems && relatedItems.length > 0">
              <h5 v-if="item.policies && item.policies.length > 0">
                Related policies
              </h5>
              <h5 v-else>
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
          <div class="col m3">
            <div class="collection with-header">
              <div class="collection-header">
                <h6>Policies</h6>
              </div>
              <router-link v-for="(item, idx) in sidenav" :key="idx" :to="{name: 'item', params: {id: item._id, category: item.type}}" class="collection-item">
                {{ item.title }}
              </router-link>
            </div><!--collection-->
          </div><!--col-->
        </div><!--row-->
      </div>
    </transition>

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
      relatedItems: [] as any[],
      sidenav: [] as any[],
      loading: true,
    };
  },
  mounted() {
    this.fetchData();
    /*
    return setTimeout(() => {
      this.fetchData();
    }, 3000);
    */
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
    async getSidenav() {
      try {
        const { data } = await api.getPolicies();
        return factories.extractRows(data);
      } catch (e) {
        this.errors.push(e);
      }
    },
    async fetchData() {
      this.loading = true;
      try {
        this.item = await this.getItem();
        this.sidenav = await this.getSidenav();
        if (this.item.type !== 'policy') {
          this.relatedItems = await this.getRelatedPolicies();
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
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}


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
