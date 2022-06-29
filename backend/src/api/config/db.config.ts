import { Sequelize } from 'sequelize'

/* configurações do banco de dados postgresql */

const database = process.env.DB;
const username = 'upload';
const password = 'upload'
const hostname = process.env.HOST;

const sequelizeConnection = new Sequelize(database!, username, password, {
  host: hostname,
  dialect: 'postgres'
})

export default sequelizeConnection