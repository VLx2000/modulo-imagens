import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from 'db/config/db.config'

interface ImageAttributes {
    id: number;
    caminho: string;
    tipo: string;
    aquisicao: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
export interface ImageInput extends Optional<ImageAttributes, 'id' | 'caminho'> { }
export interface ImageOuput extends Required<ImageAttributes> { }

class Image extends Model<ImageAttributes, ImageInput> implements ImageAttributes {
    public id!: number
    public caminho!: string
    public tipo!: string
    public aquisicao!: string
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
    }
}, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true
})

export default Image