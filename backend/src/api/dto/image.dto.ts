import { Optional } from "sequelize/types"

export type CreateImageDTO = {
    //id: number;
    caminho: string;
    tipo: string;
    aquisicao: string;
}

export type UpdateImageDTO = Optional<CreateImageDTO, 'caminho'>