import { IdxDBColumn } from "./idxDB"

// 项目表
export class IdxProjectInfo {
    static col = Object.assign(new IdxDBColumn(), {
        name: 'project',
        option: { keyPath: 'id' },
        data: () => {
            return [
                Object.assign(new IdxProjectInfo(), {
                    id: 'a822b5916ce34',
                    name: '团队文档',
                    desc: '团队技术文档',
                    location: 'document'
                }),
                Object.assign(new IdxProjectInfo(), {
                    id: '2b20a5f56fbd4',
                    name: '平台资源',
                    desc: '平台通用资源文件',
                    location: 'common'
                }), Object.assign(new IdxProjectInfo(), {
                    id: '1bb6b4d3d6b5f5',
                    name: '云适配项目',
                    desc: '云适配各项目静态资源文件',
                    location: 'eco'
                }),
            ]
        }
    })

    id = Math.floor(Math.random() * Math.pow(10, 16)).toString(16)
    name = '测试项目 '
    desc = '(blank)'
    location = ''
    createTime = new Date().toLocaleString()
    updateTime = new Date().toLocaleString()
}

// 文件夹
export class IdxFolderInfo {
    static col = Object.assign(new IdxDBColumn(), {
        name: 'folder',
        option: { keyPath: 'id' },
        data: () => {
            return []
        }
    })

    id = Math.floor(Math.random() * Math.pow(10, 6)).toString(16)

    name = "folder-" + this.id
    desc = ''
    createTime = new Date().toLocaleString()
    updateTime = new Date().toLocaleString()

    location = 'folder-' + this.id

    projectId = ''
    parentId = ''
}

export class IdxFileInfo {
    static col = Object.assign(new IdxDBColumn(), {
        name: 'file',
        option: { keyPath: 'id' },
        data: () => {
            return []
        }
    })

    id = Math.floor(Math.random() * Math.pow(10, 16)).toString(16)

    name = "file-" + this.id
    desc = ''
    ext = ''
    createTime = new Date().toLocaleString()
    updateTime = new Date().toLocaleString()

    location = 'f_' + this.id

    projectId = ''
    folderId = null
    fileId = ""
}

export class IdxFileContent {
    static col = Object.assign(new IdxDBColumn(), {
        name: 'upload_file',
        option: { keyPath: 'fileId' },
        data: () => {
            return []
        }
    })

    fileId = Math.floor(Math.random() * Math.pow(10, 6)).toString(16)
    fileUrl = ''
    fileName = ''
    fileSize = 0
    ext = ''
}