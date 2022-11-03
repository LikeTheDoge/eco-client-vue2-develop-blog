import Vue from "vue";

export const titleEvent = new Vue()

titleEvent.$on('update', (title) => { console.log('title', title) })