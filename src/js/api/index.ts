// api.js
// from: https://stackoverflow.com/questions/51061592/how-to-modularize-rest-api-calls-using-axios-in-vuejs

// TODO: https://dev.to/kevinleedrum/axios-tips-for-real-world-apps-3bo4

import axios from 'axios';

const HTTP = axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
});

export default {
  search(query: any) {
    return HTTP.get('/api/search', {
      params: query,
    });
  },
  lookup(id: string) {
    return HTTP.get('/api/lookup/' + id);
  },
  save(item: {}) {
    return HTTP.post('/api/save/', item);
  },
  getItemsByType(types: any) {
    const obj = {
      params: {
        type: types,
      },
    };
    // types is expected to be an array
    return HTTP.get('/api/get/items', obj);
  },
  getItemsById(array: []) {
    // console.log(array);
    // when itemDetail is a clip
    // show the policies that it relates to
    // note: expects an array; e.g., this.item.policies
    return HTTP.get('/api/get/itemsById', {
      params: {
        keys: array,
      },
    });
  },
  getRelatedItems(val: string) {
    // when itemDetail is a policy
    // show the items that link to it
    // note: expects a string, which is the id of the policy
    return HTTP.get('/api/get/relatedItems', {
      params: {
        id: val,
      },
    });
  },
  getPolicies() {
    // console.log('getPolicies');
    // todo: get results by type(s)
    // take an array of types as a param and
    // send that param to the view
    return HTTP.get('/api/get/policies');
  },
};
