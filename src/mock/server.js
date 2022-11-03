import { connext } from './connext'
import { IdxFileContent, IdxFileInfo, IdxFolderInfo } from './idx/idxCls';


const onsuccess = (val) => new Promise(res => {
    val.onsuccess = (event) => { res(event.target.result) }
})

export const getProjectList = async() => {
    const db = await connext()
    const transaction = db.transaction(["project"]);

    return await onsuccess(transaction.objectStore("project").getAll())
}
export const getAllFolder = async() => {
    const db = await connext()
    const transaction = db.transaction(["folder"]);

    const list = await onsuccess(transaction.objectStore("folder").getAll())
    const existChildrenFolder = new Set()
    list.forEach(element => {
        if (element.parentId) existChildrenFolder.add(element.parentId)
    });
    return list.map(item => Object.assign(item, {
        existChildrenFolder: existChildrenFolder.has(item.id)
    }))
}
export const getFolderParents = async(id) => {
    console.log(id)
    const db = await connext()
    const transaction = db.transaction(["folder"]);
    const list = await onsuccess(transaction.objectStore("folder").getAll())
    const result = []
    let target = list.find(v => v.id === id)

    while (target && target.parentId) {
        target = list.find(v => v.id === target.parentId)
        result.push(target)
    }
    console.log('result', result.reverse())

    return result
}
export const insertFolder = async({ parentId, projectId, name }) => {
    if (!name) throw new Error('need name')
    const db = await connext()
    const transaction = db.transaction(["folder"], "readwrite");
    const folder = Object.assign(new IdxFolderInfo(), {
        parentId,
        projectId,
        name,
        location: name
    })

    await onsuccess(transaction.objectStore("folder").add(folder))
}
export const uploadFile = async(file) => {
    const db = await connext()
    const { name, size } = file
    const ext = name.split('.').filter((_, i) => i !== 0).reverse()[0] || ''
    const transaction = db.transaction(["upload_file"], "readwrite");
    const content = Object.assign(new IdxFileContent(), {
        fileName: name,
        fileSize: size,
        ext
    })
    await onsuccess(transaction.objectStore("upload_file").add(content))
    return content
}
export const insertFile = async({
    projectId,
    fileId,
    folderId
}) => {
    const db = await connext()
    const transaction = db.transaction(["upload_file", "folder", "project", 'file'], "readwrite");
    const { fileName, ext } = await onsuccess(transaction.objectStore('upload_file').get(fileId))
    const info = Object.assign(new IdxFileInfo(), {
        name: fileName,
        projectId,
        fileId,
        ext,
        folderId: folderId ? folderId : null
    })
    await onsuccess(transaction.objectStore("file").add(info))

    return info
}
export const getFolderFiles = async({ projectId, folderId }) => {
    const db = await connext()
    const transaction = db.transaction(["file"]);
    const all = await onsuccess(transaction.objectStore("file").getAll())

    return all.filter(file => {
        return file.projectId === projectId
    }).filter(file => {
        if (!folderId) return file.folderId === null
        else return file.folderId === folderId
    })
}
export const updateFile = async() => {}