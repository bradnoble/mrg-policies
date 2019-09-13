import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Search from './views/Search.vue';
import Edit from './views/Edit.vue';
import Item from './views/ItemDetail.vue';
import Items from './views/ItemsByType.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { name: 'itemsByType', params: { category: 'policy' } },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/type/policy',
      name: 'policies',
      redirect: { name: 'itemsByType', params: { category: 'policy' } },
    },
    {
      path: '/type/:category',
      name: 'itemsByType',
      component: Items,
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
    },
    {
      path: '/add-item',
      name: 'add',
      component: Edit,
      props: true,
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: Edit,
      props: true,
    },
    {
      path: '/:category/:id',
      name: 'item',
      component: Item,
      props: true,
    },
  ],
});
