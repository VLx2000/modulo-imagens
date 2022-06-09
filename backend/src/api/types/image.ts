import { Optional } from "sequelize/types"

export interface Image {
    id: number;
    caminho: string;
    tipo: string;
    aquisicao: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export type CreateImageDTO = {
    //id: number;
    caminho: string;
    tipo: string;
    aquisicao: string;
}

export type UpdateImageDTO = Optional<CreateImageDTO, 'aquisicao'>