import { IdxDBOption } from './idx/idxDB'
import { IdxProjectInfo, IdxFileContent, IdxFileInfo, IdxFolderInfo } from './idx/idxCls'

let idx = null

const init = async() => {
    const option = Object.assign(new IdxDBOption(), {
        name: "file-manage",
        version: 2,
        cols: [
            IdxProjectInfo.col,
            IdxFileContent.col,
            IdxFileInfo.col,
            IdxFolderInfo.col
        ]
    })

    idx = await option.open()
    return idx
}


export const connext = async() => {
    if (idx)
        return idx.db
    else
        return (await init()).db
}