import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from 'api/config/db.config';

interface ImageAttributes {
    id: number;
    caminho: string;
    tipo: string;
    aquisicao: string;
    arquivado: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
export interface ImageInput extends Optional<ImageAttributes, 'id' | 'caminho' | 'arquivado'> { }
export interface ImageOuput extends Required<ImageAttributes> { }

class Image extends Model<ImageAttributes, ImageInput> implements ImageAttributes {
    public id!: number;
    public caminho!: string;
    public tipo!: string;
    public aquisicao!: string;
    public arquivado!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Image.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    caminho: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    aquisicao: {
        type: DataTypes.STRING
    },
    arquivado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true
})

export default Image;