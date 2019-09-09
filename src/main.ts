import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.filter('capitalize', function (value:any) {
  if (!value) return '';
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
})

Vue.filter('truncateURL', function (value:any) {
  if (!value) return '';
  let url = new URL(value);
  let path = url.pathname;
  let str = '';
  if(path.indexOf('minutes') > -1 || path.indexOf('meeting') > -1){
    str = path
  } else {
    str = value
  }
  return str;
})

Vue.filter('readerFriendlyDate', function (value:any) {
  if (!value) return '';
  let date = new Date(value);
  let options = { year: 'numeric', month: 'short', day: 'numeric' };            
  let dateString = new Date(date).toLocaleDateString('en-US', options);
  return dateString;
})

Vue.filter('truncateBodyText', function (value:any, limit:number) {
  if (!value) return '';
  if (limit && value.length > limit) {
      value = value.substring(0, (limit - 3)) + '...';
  }
  return value
})


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
