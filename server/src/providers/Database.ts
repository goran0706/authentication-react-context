import mongoose from 'mongoose'
import Locals from './Locals'

class Database {
  public init() {
    try {
      const mongooseUrl = Locals.config().mongooseUrl
      mongoose.connect(mongooseUrl)
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export default new Database()
