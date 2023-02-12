import { createRouter, createWebHistory } from "vue-router";
import UserVirtualScroll from "@/views/UserVirtualScroll.vue";

const routes = [
  {
    path: "/",
    name: "user-virtual-scroll",
    component: UserVirtualScroll,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
