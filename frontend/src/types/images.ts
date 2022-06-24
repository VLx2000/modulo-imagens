export type Image = {
    id: number;
    caminho: string;
    tipo: string;
    aquisicao: string;
    arquivado: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}