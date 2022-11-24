import { ERequest } from "e-request";
import { fromJson } from 'e-model'
import { CommentUplodaFile } from "../models/comment";

const upload = new ERequest('/eco-plat-file')

export const uploadCommentFile = async(file) => {
    const uploadData = new FormData()
    uploadData.append('file', file)
    const data = await upload.post('/plat/file/upload', uploadData)
    return fromJson(CommentUplodaFile, data)
}