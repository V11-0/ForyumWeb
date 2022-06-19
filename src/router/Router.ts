import { createRouter, createWebHashHistory } from 'vue-router';

import Home from "@/pages/Home.vue";
import Welcome from "@/pages/Welcome.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/welcome', component: Welcome }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;