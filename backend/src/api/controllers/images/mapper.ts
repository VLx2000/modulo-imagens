import {Image} from 'api/types/image'
import {ImageOuput} from 'db/models/Image'

export const toImage = (image: ImageOuput): Image => {
    return {
        id: image.id,
        caminho: image.caminho,
        tipo: image.tipo,
        aquisicao: image.aquisicao,
        createdAt: image.createdAt,
        updatedAt: image.updatedAt,
    }
}