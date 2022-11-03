import VueRouter from 'vue-router';
import Home from './pages/Home'
import Project from './pages/Project'

export default new VueRouter({
    base: '/file',
    mode: 'history',
    linkActiveClass: 'active',
    routes: [{
        path: '/',
        redirect: '/home'
    }, {
        path: '/home',
        component: Home
    }, {
        path: '/project/:location',
        component: Project
    }],
    scrollBehavior: (to) => {
        if (to.hash) {
            return {
                selector: to.hash,
            };
        } else {
            return { top: 0 }
        }
    },


});