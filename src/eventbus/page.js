import Vue from "vue";

export const pageEvent = new Vue()

pageEvent.$on('update', (title) => { console.log('post', title) })
pageEvent.$on('showSider', (title) => { console.log('showSider', title) })
pageEvent.$on('focusContent', (title) => { console.log('focusContent', title) })