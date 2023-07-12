import { Application } from 'express'
import apiRouter from './../routes/Api'
import webRouter from './../routes/Web'
import Locals from './Locals'

class Router {
  public mountWeb(_express: Application): Application {
    return _express.use('/', webRouter)
  }

  public mountApi(_express: Application): Application {
    const apiPrefix = Locals.config().apiPrefix
    return _express.use(`/${apiPrefix}`, apiRouter)
  }
}

export default new Router()
