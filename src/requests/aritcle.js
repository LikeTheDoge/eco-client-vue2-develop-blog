import { ERequest } from "e-request";
import { FileInfo, FolderInfo, ProjectInfo } from "../models/base";
import { fromJson } from 'e-model'

const plat = new ERequest('/eco-plat-static-server')

export const getArticleFile = (id = '20221116152601GMN09FKTJFC6ZG34C7') => plat.get(`/file/getFileById/${id}`, null)
    .then(data => fromJson(FileInfo, data))

export const getArticleFileList = (projectId = '2', parentId) => plat.get(`/file/getFileList/${projectId}`, { parentId })
    .then(({ project, viewFileList }) => viewFileList.map(v => Object.assign(v, { project })))
    .then(list => list.map(data => fromJson(FileInfo, data)))

export const getSliderShowData = async() => {
    const list = await fetch('http://192.168.161.10:11080/eco-plat-static-server/file/download/dev-blog/slideshow.json')
        .then(response => response.json())

    const files = await Promise.all(list.map(v => getArticleFileByPath(v.path)))

    return files.map((file, idx) => ({ file, bg: list[idx].bg }))
}

export const getArticleFileByPath = (path) => plat.get(`/file/getFileByPath${path}`)
    .then(data => fromJson(FileInfo, data))




export const getAllAritcleFileAndFolders = (projectId = '2') => plat.get(`/file/getProjectListData/${projectId}`)
    .then(({ project, viewFileList }) => viewFileList.map(v => Object.assign(v, { project })))
    .then(list => {
        const folders = list.filter(v => v.isDir).map(data => fromJson(FolderInfo, data))
        const files = list.filter(v => !v.isDir).map(data => fromJson(FileInfo, data))


        const folderTable = new Map()
        folders.forEach(folder => folderTable.set(folder.folderId, folder))

        // 过滤空文件和文件夹
        const mdFiles = files.filter(v => v.ext === 'md')
        const folderIds = new Set()
        let stepIds = mdFiles.map(v => v.folderId).filter(v => !!v)

        while (stepIds.length) {
            stepIds.forEach(id => folderIds.add(id))
            stepIds = stepIds
                .map(v => folderTable.get(v)) // id 转 file 对象
                .filter(v => !!v)
                .map(v => v.parentId)
                .filter(v => !!v)
        }

        const mdFolders = Array.from(folderIds.values())
            .map(v => folderTable.get(v))
            .filter(v => !!v)


        return { folders: mdFolders, files: mdFiles }
    })