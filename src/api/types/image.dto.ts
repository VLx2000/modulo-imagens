import { Optional } from "sequelize/types"

export type CreateImageDTO = {
    //id: number;
    idPaciente: number;
    caminho: string;
    tipo: string;
    aquisicao: string;
    arquivado: boolean;
}

export type UpdateImageDTO = Optional<CreateImageDTO, 'idPaciente'|'caminho'|'tipo'|'aquisicao'|'arquivado'>