import { Sequelize } from 'sequelize'

const dbName = 'upload'
const dbUser = 'upload'
const dbPassword = 'upload'

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: 'localhost',
  dialect: 'postgres'
})

export default sequelizeConnection