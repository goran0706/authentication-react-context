import dotenv from 'dotenv'
import { Application } from 'express'
import path from 'path'

class Locals {
  public config() {
    dotenv.config({ path: path.join(__dirname, '../../.env') })

    const url = process.env.APP_URL || `http://localhost:${process.env.PORT}`
    const port = process.env.PORT || 3000
    const appSecret = process.env.APP_SECRET || 'This is your responsibility!'
    const apiPrefix = process.env.API_PREFIX
    const mongooseUrl = process.env.MONGOOSE_URL as string
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN

    return {
      url,
      port,
      appSecret,
      apiPrefix,
      mongooseUrl,
      jwtExpiresIn
    }
  }

  public init(_express: Application): Application {
    _express.locals.app = this.config()
    return _express
  }
}

export default new Locals()
