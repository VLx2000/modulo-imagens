import * as service from '../../../db/services/imageService'
import {CreateImageDTO, UpdateImageDTO, /*FilterImagesDTO*/} from '../../dto/image.dto'
import {Image} from '../../interfaces'
import * as mapper from './mapper'

export const create = async(payload: CreateImageDTO): Promise<Image> => {
    return mapper.toImage(await service.create(payload))
}
export const update = async (id: number, payload: UpdateImageDTO): Promise<Image> => {
    return mapper.toImage(await service.update(id, payload))
}
export const getById = async (id: number): Promise<Image> => {
    return mapper.toImage(await service.getById(id))
}
export const deleteById = async(id: number): Promise<Boolean> => {
    const isDeleted = await service.deleteById(id)
    return isDeleted
}
/* export const getAll = async(filters: FilterImagesDTO): Promise<Image[]> => {
    return (await service.getAll(filters)).map(mapper.toImage)
} */