import { eModel, eKey, eJson, eType } from 'e-model'


@eModel('ProjectInfo')
export class ProjectInfo {
    @eKey
    @eType('string')
    @eJson('id')
    projectId = ''

    @eType('string')
    @eJson('name')
    title = ''

    @eType('string')
    @eJson('desc')
    desc = ''

    @eType('string')
    @eJson('location')
    location = ''
}

@eModel('FolderInfo')
export class FolderInfo {
    @eKey
    @eType('string')
    @eJson('id')
    folderId = ''


    @eType('string')
    @eJson('name')
    name = ''

    @eType('string')
    @eJson('remark')
    remark = ''

    @eType('string')
    @eJson('location')
    location = ''

    @eKey
    @eType('string')
    @eJson('projectId')
    projectId = ''

    @eKey
    @eType('string')
    @eJson('parentId')
    parentId = ''

    @eKey
    @eType('boolean')
    @eJson('existChildrenFolder')
    existChildrenFolder
}

@eModel('FileInfo')
export class FileInfo {
    static type(file) {
        const ext = (file.ext || '').toLocaleLowerCase()
        const types = {
            'image': ['jpg', 'png', 'gif'],
            'excel': ['xls'],
            'word': ['doc'],
            'ppt': ['ppt'],
            'music': ['mp3'],
            'code': ['js', 'ts', 'vue', 'css'],
            'link': ['html'],
            'zip': ['zip', 'rar', '7z'],
            'gif': ['gif'],
            'exe': ['exe'],
            'pdf': ['pdf'],
            'txt': ['txt'],
        }

        const type = Array.from(Object.entries(types))
            .find(([_, list]) => {
                return !!list.find(e => ext.indexOf(e) === 0)
            })

        return type ? type[0] : 'unknown'
    }

    @eKey
    @eType('string')
    @eJson('id')
    fileId = ''

    @eType('string')
    @eJson('fileId')
    uploadFileId = ''

    @eType('string')
    @eJson('name')
    name = ''

    @eType('string')
    @eJson('ext')
    ext = ''

    @eType('string')
    @eJson('projectId')
    projectId = ''

    @eType('string')
    @eJson('folderId')
    folderId = ''

    @eType('string')
    @eJson('location')
    location = ''
}