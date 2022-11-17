import VueRouter from 'vue-router';
// import Home from './pages/Home'

export default new VueRouter({
    base: '/develop-blog',
    mode: 'history',
    linkActiveClass: 'active',
    // routes: [{
    //     path: '/:pathMatch(.*)*',
    //     component: Home
    // }],
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