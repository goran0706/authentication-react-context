import express from 'express'
import ErrorHandler from '../errors/Handler'
import Http from '../middlewares/Http'
import Passport from '../middlewares/Passport'
import Statics from '../middlewares/Statics'
import Views from '../middlewares/Views'
import Locals from './Locals'
import Router from './Router'

class Express {
  public express: express.Application

  constructor() {
    this.express = express()
    this.mountDotEnv()
    this.mountMiddlewares()
    this.mountRoutes()
    this.mountErrorHandlers()
  }

  private mountDotEnv() {
    this.express = Locals.init(this.express)
  }

  private mountMiddlewares() {
    this.express = Http.mount(this.express)
    this.express = Views.mount(this.express)
    this.express = Statics.mount(this.express)
    this.express = Passport.mount(this.express)
  }

  private mountRoutes() {
    this.express = Router.mountWeb(this.express)
    this.express = Router.mountApi(this.express)
  }

  private mountErrorHandlers() {
    this.express.use(ErrorHandler.clientErrorHandler)
    this.express.use(ErrorHandler.errorHandler)
    this.express = ErrorHandler.notFoundHandler(this.express)
  }

  public init() {
    const port = Locals.config().port

    this.express
      .listen(port, () => console.log('Express listening on port', port))
      .on('error', (error) => console.log('Error:', error.message))
  }
}

export default new Express()
