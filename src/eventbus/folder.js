import Vue from "vue";

export const folderEvent = new Vue()

folderEvent.$on('reloadChilren', (projectId, folderId) => console.log('reloadChilren', { projectId, folderId }))