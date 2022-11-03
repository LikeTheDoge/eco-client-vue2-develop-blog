const rand4 = () => Math.floor(Math.random() * 16 * 16 * 16 * 16).toString(16)

export class CommentInput {
    content = ''
    dataId = ''
    type = ''
    jumpUrl = ''
    pageName = ''
    files = []
    cid = `${rand4()}${rand4()}-${rand4()}-${rand4()}-${rand4()}-${rand4()}${rand4()}${rand4()}`
}

export class CommentInputWithAt extends CommentInput {
    atUsers = []
}