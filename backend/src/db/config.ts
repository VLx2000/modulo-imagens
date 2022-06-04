import { Sequelize } from 'sequelize'

const dbName = 'postgres'
const dbUser = 'teste'
const dbPassword = 'teste'

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: 'localhost',
  dialect: 'postgres'
})

export default sequelizeConnection