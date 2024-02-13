import mongoose from 'mongoose'
import config from '../config'

class MongooseService {
  static async init () {
    const url = config.mongoDB.url
    const db = mongoose.connection

    db.on('connected', () => {
      console.log('connected to MongoDB')
    })
    db.on('error', (e) => {
      console.error('MongoDB connect error')
      console.error(e)
    })
    db.once('open', () => {
      console.log('Mongo DB connecet')
    })

    try {
      await mongoose.connect(`${url}/${config.mongoDB.dbName}`)
    } catch (e) {
      console.log('Mongo connection error')
      console.error(e)
    }
  }

}

export default MongooseService