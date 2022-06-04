import {Op} from 'sequelize'
import Image from '../models/Image'
import {ImageInput, ImageOuput} from '../models/Image'

export const create = async (payload: ImageInput): Promise<ImageOuput> => {
    const image = await Image.create(payload)
    return image
}

export const update = async (id: number, payload: Partial<ImageInput>): Promise<ImageOuput> => {
    const image = await Image.findByPk(id)
    if (!image) {
        // @todo throw custom error
        throw new Error('not found')
    }
    const updatedImage = await (image as Image).update(payload)
    return updatedImage
}

export const getById = async (id: number): Promise<ImageOuput> => {
    const image = await Image.findByPk(id)
    if (!image) {
        // @todo throw custom error
        throw new Error('not found')
    }
    return image
}

export const deleteById = async (id: number): Promise<boolean> => {
    const deletedImageCount = await Image.destroy({
        where: {id}
    })
    return !!deletedImageCount
}

/* export const getAll = async (filters?: GetAllImagesFilters): Promise<ImageOuput[]> => {
    return Image.findAll({
        where: {
            ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}})
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
    })
} */