import { ERequest } from "e-request";
import { FileInfo, FolderInfo, ProjectInfo } from "../models/base";
import { fromJson } from 'e-model'

const plat = new ERequest('/eco-plat-static-server')

export const getArticleFile = (id = '20221116152601GMN09FKTJFC6ZG34C7') => plat.get(`/file/getFileById/${id}`, null)
    .then(data => fromJson(FileInfo, data))