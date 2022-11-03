import { FolderInfo, ProjectInfo, FileInfo } from '../models/base'
import { fromJson } from 'e-model'
import * as server from '../mock/server'
export const getProjectList = async() => {
    const list = await server.getProjectList()
    return list.map(v => fromJson(ProjectInfo, v))
}

export const getProjectByLoc = async(location) => {
    const list = await server.getProjectList()
    return list.map(v => fromJson(ProjectInfo, v)).find(v => v.location === location)
}

export const getFolderList = async(projectId, parentId) => {
    const list = await server.getAllFolder()
    console.log(list)
    return list.map(v => fromJson(FolderInfo, v)).filter(v => {
        return v.projectId === projectId
    }).filter(v => {
        if (parentId)
            return v.parentId === parentId
        else
            return !v.parentId
    }).map(v => {
        console.log(v, v instanceof FolderInfo)
        return v
    })
}

export const getFileList = async(projectId, folderId) => {
    const list = await server.getFolderFiles({
        projectId,
        folderId
    })

    return list.map(v => fromJson(FileInfo, v))
}

export const getFolderById = async(folderId) => {
    const list = await server.getAllFolder()
    return list.map(v => fromJson(FolderInfo, v)).find(v => {
        return v.folderId === folderId
    })
}

export const createFolder = async(projectId, parentId = '', name = "") => {
    await server.insertFolder({ parentId, projectId, name })
}

export const getFolderParents = async(folderId) => {
    const list = await server.getFolderParents(folderId)
    return list.map(v => fromJson(FolderInfo, v))
}

export const insertFile = async(projectId, file, folderId = '') => {
    const { fileId } = await server.uploadFile(file)
    const info = await server.insertFile({ fileId, folderId, projectId })
    return fromJson(FileInfo, info)
}