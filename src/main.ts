import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.filter('capitalize', (value: any) => {
  value = (value) ? value.toString() : '';
  return (!value) ? '' : value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.filter('truncateURL', (value: any) => {
  const url = new URL(value);
  const path = url.pathname;
  let str = '';
  if (path.indexOf('minutes') > -1 || path.indexOf('meeting') > -1) {
    str = path;
  } else {
    str = value;
  }
  return (!value) ? '' : str;
});

Vue.filter('readerFriendlyDate', (value: any) => {
  const date = new Date(value);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const dateString = new Date(date).toLocaleDateString('en-US', options);
  return (!value) ? '' : dateString;
});

Vue.filter('truncateBodyText', (value: any, limit: number) => {
  if (limit && value.length > limit) {
      value = value.substring(0, (limit - 3)) + '...';
  }
  return (!value) ? '' : value;
});


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
