import { eModel, eKey, eJson, eType } from 'e-model'

const rand4 = () => Math.floor(Math.random() * 16 * 16 * 16 * 16).toString(16)

@eModel('ArticleContent')
export class ArticleContent {
    @eKey
    @eType('string')
    path = ''

    @eType('string')
    markdown = ''
}


@eModel('ArticleSiderHeader')
export class ArticleSiderHeader {
    @eKey
    @eType('string')
    id = Math.random().toString()

    @eType('number')
    deep = 1

    @eType('string')
    content = ''

    target = null
}


@eModel('ArticleSiderHeader')
export class Comment {
    commentId = ''

    createTime = null

    createUser = null

    content = ''

    json = []

    files = []

    isDelete = false

    canDelete = false
}


export class CommentFile {
    json = {}
    isPic = false
    static fromServer(json) {
        return Object.assign(new CommentFile(), File.fromServer(json), {
            json,
            isPic: /.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/.test(json.fileName)
        })
    }

    toServer() {
        return this.json
    }
}