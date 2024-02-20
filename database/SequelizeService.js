import Sequelize from "sequelize"
import config from "../config"
import Models from "../api/models/sequelize"

class SequelizeService {
  static async init() {
    try {
      const sequelize = new Sequelize(config.mysql.options)
      sequelize.authenticate()
      console.log("Successfully connected to MySQL")
      config.mysql.client = sequelize
      Models(sequelize)
      return sequelize
    } catch (e) {
      console.log("Sequelize connection error")
      console.log(e)
      process.exit(1)
    }
  }

  static async close() {
    try {
      if (config.mysql.client) {
        await config.mysql.client.close()
        console.log("Closed MySQL connection")
      }
    } catch (e) {
      console.log("Error closing MySQL connection:", e)
    }
  }
}

export default SequelizeService
