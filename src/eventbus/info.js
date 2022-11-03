import Vue from "vue";

export const infoEvent = new Vue()

infoEvent.$on('update', (list) => { console.log('info', list) })