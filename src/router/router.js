import { createRouter, createWebHistory } from "vue-router";
import UpdateEmployee from "../components/UpdateEmployee.vue";
import Indexcomponent from "../components/IndexComponnet.vue";

const routes = [
  {
    path: "/",
    name: "Index",
    component: Indexcomponent,
  },
  {
    path: "/update-employee",
    name: "UpdateEmployee",
    component: UpdateEmployee,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
