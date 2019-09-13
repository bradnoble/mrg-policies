<template>
  <div class="">
    <h1 class="center">
      Edit Item
    </h1>

    <!-- <EditForm /> -->

    <error :errors="errors" />
    <loading :loading="loading" />

    <form action="#" @submit.prevent="saveItem" class="" v-if="!loading">

      <!-- title -->
      <div class="row">
        <div class="col s12 m12">
          <div class="input-field">
            <h6>Title</h6>
            <input type="text" id="title" v-model="item.title" class="validate required" />
            <!-- <label for="title" class="active">Title</label> -->
            <span class="helper-text red-text text-darken-2">Required</span>
          </div>
        </div><!--col-->
      </div><!--row-->

      <!-- type -->
      <div class="row">
        <div class="col s12 m12">
          <h6>Type</h6>
          <p>
            Items marked "policy" will appear on the Policies page. Everything else will be discoverable via search.
          </p>
          <p v-for="(value, idx) in types" v-bind:key="idx">
            <label v-bind:for="item._id + '-' + idx">
              <input 
                type="radio" 
                :name="item._id + '-' + idx" 
                :id="item._id + '-' + idx" 
                :value="value" 
                v-model="item.type" 
                class="with-gap"
              />
              <span>{{ value }}</span>
            </label>
          </p>                
        </div><!--col-->
      </div><!--row-->

      <!-- body -->
      <div class="row">
        <div class="col s12 m12">
          <div class="input-field">
            <h6>Body</h6>
            <p>
              In most cases, a body&mdash;or, description&mdash;will help someone understand the item better than a title alone. It also gives the search engine more to chew on. Feel free to copy and paste directly from the primary source (e.g., a policy doc, meeting minutes, etc) into this field.
            </p>
            <textarea id="textarea-body" v-model="item.body" class="materialize-textarea validate required"></textarea>
            <!-- <label for="body" class="active">Body</label> -->
            <span class="helper-text red-text text-darken-2">Required</span>
          </div>
        </div><!--col-->
      </div><!--row-->

      <!-- URL -->
      <div class="row">
        <div class="col s12 m12">
          <div class="input-field">
            <h6>URL</h6>
            <p>
              Most likely, this item originated as, or at least relates to, a Web page. Add the address of that Web page here (e.g., the URL of a board meeting minutes page).
            </p>
            <input type="text" id="url" v-model="item.url" @input="checkURL()" class="validate required" placeholder="http://..." />
            <!-- <label for="url" class="active">URL</label> -->
            <span class="helper-text red-text text-darken-2">Required</span>
          </div>
        </div><!--col-->
      </div><!--row-->

      <!-- date -->
      <div class="row">
        <div class="col s12 m12">
          <h6>
            Date
          </h6>
          <p>
            The date the policy was adopted, or this item was cited. If you're citing board minutes, it's the date of the board meeting.
          </p><!--col-->
          <p class="hide">
            {{ item.date | readerFriendlyDate() }}
          </p>

          <div class="row date-picker">
            <div class="input-field col s12 m4">
                <select class="browser-default" v-model="dateValuesForSelects.month" @change="changeDate()" id="month">
                  <option value="Month" disabled>Month</option>
                  <option v-for="(month, key) in months" :key="key" :value="month">
                    {{ month }}
                  </option>
                </select>
                <!-- <label for="month" class="active">Month</label> -->
            </div><!--col-->

            <div class="col s12 m4">
              <div class="input-field">
                <select class="browser-default" v-model="dateValuesForSelects.day" @change="changeDate()" id="day">
                  <option value="Day" disabled>Day</option>
                  <option v-for="(day, key) in days" v-bind:key="key" v-bind:value="day">
                    {{ day }}
                  </option>
                </select>
                <!-- <label for="day" class="active">Day</label> -->
              </div><!--input field-->
            </div><!--col-->

            <div class="col s12 m4">
              <div class="input-field">
                <select class="browser-default" v-model="dateValuesForSelects.year" @change="changeDate()" id="year">
                  <option value="Year" disabled>Year</option>
                  <option v-for="(year, key) in years" v-bind:key="key" v-bind:value="year">
                    {{ year }}
                  </option>
                </select>
                <!-- <label for="year" class="active">Year</label> -->
              </div>
            </div><!--col-->
          </div><!--row-->

        </div><!--col-->
      </div><!--row-->

      <div class="row" v-if="policies && policies.length > 0 && item.type != 'policy'">
        <div class="col s12 m12">
          <h6>
            Policies
          </h6>
          <p>
            Select any policies to which this item relates.
          </p>
          <div class="collection">
            <div v-for="(policy, idx) in policies" v-bind:key="idx" class="collection-item">
              <label>
                <input 
                  type="checkbox" 
                  class="filled-in"
                  :name="'policy-' + idx" 
                  :id="'policy-' + idx" 
                  :value="policy._id" 
                  v-model="item.policies" />
                <item :item="policy" />
              </label>
            </div>
          </div>

        </div>
      </div>

      <!-- hidden fields required to save this form -->
      <input type="hidden" id="id" v-model="item._id" />
      <input type="hidden" id="rev" v-model="item._rev" />
      <input type="hidden" id="date" v-model="item.date" />
      
      <!--actions -->
      <div class="section">
        <button type="submit" class="btn btn-large">Save</button>
      </div>
      <div class="section">
        <div class="divider"></div>
        <p>
          <a href="#" @click.prevent="deletionCheck()" class="red-text">Delete this item</a>
        </p>
      </div>

    </form>

        <div class="col s12 m6">
          <div class="">
            <pre>{{item}}</pre>
          </div>
        </div><!--row-->


  </div>
</template>

<script lang="ts">
import axios from 'axios';
import Vue from 'vue';
import item from '@/components/item.vue';
import loading from '@/components/loading.vue';
import error from '@/components/error.vue';
import api from '@/js/api';
import factories from '@/js/factories';

export default Vue.extend({
  name: 'EditForm',
  components: {
    item,
    error,
    loading,
  },
  data() {
    return {
      item: {} as any,
      policies: [] as any[],
      dateValuesForSelects: {
        month: 'Month',
        year: 'Year',
        day: 'Day',
      } as any, // '' as string
      errors: [] as any[],
      loading: true,
    };
  },
  computed: {
    types() {
      return factories.getDocTypes();
    },
    months() {
      return factories.getMonths();
    },
    days() {
      return factories.getDays();
    },
    years() {
      return factories.getYears();
    },
  },
  mounted() {
    this.fetchData();
  },
  watch: {
    $route(to, from) {
      this.fetchData();
    },
  },
  methods: {
    async fetchData() {
      const id = this.$route.params.id;
      try {
        if (!id) {
          this.item = factories.setDocDefaults();
        } else {
          this.item = await this.getItem();
          if (this.item.date) {
            this.dateValuesForSelects = await this.setDateValuesForSelects();
          }
        }
        this.policies = await this.getPolicies();
      } catch (e) {
        this.errors.push(e);
      } finally {
        if (this.errors && this.errors.length > 0) {
          this.$emit('show-error', this.errors);
        }
        this.loading = false;
      }
    },
    async setDateValuesForSelects() {
      // save the date field to a temporary variable and
      // convert to Date() so that we can extract day, month, year values from it
      const date = new Date(this.item.date);
      // use those values to populate the day, month, year selects in the form
      // https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
      return {
        year: date.toLocaleDateString('en-US', { year: 'numeric' }),
        month: date.toLocaleDateString('en-US', { month: 'long' }),
        day: date.toLocaleDateString('en-US', { day: 'numeric' }),
      };
    },
    async getPolicies() {
      try {
        const category = [] as any;
        category.push('policy');
        const { data } = await api.getItemsByType(category);
        return factories.extractRows(data);
      } catch (e) {
        this.errors.push(e);
      } finally {
        if (this.errors && this.errors.length > 0) {
          this.$emit('show-error', this.errors);
        }
        this.loading = false;
      }
    },
    async getItem() {
      try {
        const { data } = await api.lookup(this.$route.params.id);
        return data;
      } catch (e) {
        this.errors.push(e);
      } finally {
        if (this.errors && this.errors.length > 0) {
          this.$emit('show-error', this.errors);
        }
        this.loading = false;
      }
    },
    async saveItem() {
      try {
        const { data } = await api.save(this.item);
      } catch (e) {
        this.errors = e;
      } finally {
        this.loading = false;
        this.$router.replace({ name: 'item', params: { category: this.item.type, id: this.item._id } });
        this.$emit('alert', 'Saved!');
      }
    },
    async deleteItem() {
      try {
        const { data } = await api.save(this.item);
      } catch (e) {
        this.errors = e;
      } finally {
        this.loading = false;
        this.$router.replace({ name: 'item', params: { category: this.item.type, id: this.item._id } });
        this.$emit('alert', 'Deleted!');
      }
    },
    deletionCheck() {
      Vue.set(this.item, '_deleted', true);
      // console.log('delete')
      const proceed = confirm('Are you sure you want to remove this item? This action can not be undone.');

      if (proceed) {
        this.deleteItem();
      }
    },
    changeDate() {
      // called by the date select inputs in the form
      // when the user changes the value of a date select,
      // we take the values of all three selects and format them into one ISOstring
      // which is what the database wants to store and use
      const date = factories.setDateToISOString(this.dateValuesForSelects);
      if (date) {
        this.item.date = date;
      }
    },
    checkURL(e: any) {
      /*
      let url = new URL(this.item.url);
      let path = url.pathname;
      let array = path.split('/');
      let str = '';
      for(let i in array){
        if(array[i].indexOf('board') > -1){
          str = array[i];
        }
      }
      if(this.item.date == ''){
        this.dateValuesForSelects.month = "March";
      }
      console.log(str)
      */
    },
  },
});
</script>

<style scoped>
  .date-picker {
    background-color: #eee;
  }
  textarea#textarea-body {
    background-color: white; 
    height: 200px;
    line-height: 1.4rem;
    padding: 1rem;
  }
  #app form input {
    background: white;
  }
</style>