import * as imageDal from '../dal/image'
//import {GetAllImagesFilters} from '../../db/dal/types'
import {ImageInput, ImageOuput} from '../models/Image'

export const create = (payload: ImageInput): Promise<ImageOuput> => {
    return imageDal.create(payload)
}
export const update = (id: number, payload: Partial<ImageInput>): Promise<ImageOuput> => {
    return imageDal.update(id, payload)
}
export const getById = (id: number): Promise<ImageOuput> => {
    return imageDal.getById(id)
}
export const deleteById = (id: number): Promise<boolean> => {
    return imageDal.deleteById(id)
}
/* export const getAll = (filters: GetAllImagesFilters): Promise<ImageOuput[]> => {
    return imageDal.getAll(filters)
} */