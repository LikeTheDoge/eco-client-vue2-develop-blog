import { eModel, eType, eJson, fromJson } from "e-model"
import { TextareaWithAt } from '../components/discuss/at/at'
import { auth } from '../auth'
@eModel('AtUser')
export class AtUser {
    @eType('string')
    @eJson('uid')
    uid

    @eType('string')
    @eJson('username')
    username = ''

    @eType('string')
    @eJson('nickname')
    nickname = ''


    @eType('string')
    @eJson('account')
    account = ''


    @eType('string')
    @eJson('avatarUrl')
    avatarUrl = ''
}

@eModel('CommentUplodaFile')
export class CommentUplodaFile {
    @eType('string')
    @eJson('id')
    fileId = ''

    @eType('number')
    @eJson('size')
    size = 0

    @eType('string')
    @eJson('name')
    fileName = ''

    @eType('string')
    @eJson('downloadUrl')
    downloadUrl = ''
}

@eModel('Comment')
export class CommentInput {

    @eType('string')
    @eJson('content')
    content = ''

    @eType('string')
    @eJson('dataId')
    dataId = ''

    @eType('string')
    @eJson('type')
    type = ''

    @eType('string')
    @eJson('jumpUrl')
    jumpUrl = ''

    @eType('string')
    @eJson('pageName')
    pageName = ''

    @eJson(() => {}, (m, j) => {
        if (m.option) Object.assign(j, m.option)
    })
    option = null

    @eJson(() => {}, (m, j) => {
        j.users = m.atUsers.map(v => v.uid).join()
    })
    atUsers = []


    @eJson(() => {}, (m, j) => {
        j.attachList = m.files.map(v => v.file).map(v => v.fileId)
    })
    files = []

    @eJson(() => {}, (m, j) => {
        j.jsonUser = JSON.stringify(TextareaWithAt.toJson([m.content], m.atUsers))
    })
    json = []
}

export const searchAt = async() => [fromJson(AtUser, await auth.getInfo())]

export const createComment = (option) => Object.assign(new CommentInput(), { option })