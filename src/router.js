import VueRouter from 'vue-router';
import Home from './pages/Home'
import Project from './pages/Project'

export default new VueRouter({
    base: '/develop-blog',
    mode: 'history',
    linkActiveClass: 'active',
    routes: [{
        path: '/',
        component: Home
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