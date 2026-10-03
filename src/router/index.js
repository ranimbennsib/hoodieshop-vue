import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "HomeView",
    component: HomeView,
  },
  {
    path: "/catalogue",
    name: "CatalogueView",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CatalogueView.vue"),
  },
   {
    path: "/contact",
    name: "contactView",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ContactView.vue"),
  },
  // Dans routes array - AJOUTEZ :
{
  path: "/cart",
  name: "CartView",
  component: () => import("../views/CartView.vue"),
},
{
  path: "/checkout", 
  name: "CheckoutView",
  component: () => import("../views/CheckoutView.vue"),
}
 
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
