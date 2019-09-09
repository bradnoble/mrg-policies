// api.js
// from: https://stackoverflow.com/questions/51061592/how-to-modularize-rest-api-calls-using-axios-in-vuejs

// TODO: https://dev.to/kevinleedrum/axios-tips-for-real-world-apps-3bo4

import axios from 'axios';

const HTTP = axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
})

export default {
  search (query) {
    return HTTP.get('/api/search', {
      params: query
    });
  },
  lookup (id){
    return HTTP.get('/api/lookup/' + id);
  },
  save (item) {
    return HTTP.post('/api/save/', item);
  },
  getItemsByType (types) {
    // types is expected to be an array
    return HTTP.get('/api/get/items', {
      params: {
        type: types
      }
    });
  },
  getItemsById (array) {
    // console.log(array);
    return HTTP.get('/api/get/itemsById', {
      params: {
        keys: array
      }
    })
  },
  getRelatedItems (id) {
    return HTTP.get('/api/get/relatedItems', {
      params: {
        id: id
      }
    })
  },
  getPolicies (){
    // console.log('getPolicies');
    // todo: get results by type(s)
    // take an array of types as a param and
    // send that param to the view
    return HTTP.get('/api/get/policies')
  }
}
