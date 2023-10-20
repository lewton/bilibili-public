import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // 路由级别代码分割
      // 这会为此路由生成一个单独的块（About.[hash].js）
      // 当访问路线时，它是懒加载的。
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/testing",
      name: "testing",
      // 路由级别代码分割
      // 这会为此路由生成一个单独的块（About.[hash].js）
      // 当访问路线时，它是懒加载的。
      component: () => import("../views/TestingView.vue"),
    },
  ],
});

export default router;
