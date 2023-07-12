import { Application } from 'express'
import { IError, INext, IRequest, IResponse } from '../interfaces/vendors'

import Locals from '../providers/Locals'

class ErrorHandler {
  public static clientErrorHandler(
    err: IError,
    req: IRequest,
    res: IResponse,
    next: INext
  ) {
    if (req.xhr) {
      return res.status(500).send({ error: 'Something went wrong!' })
    } else {
      return next(err)
    }
  }

  public static errorHandler(
    err: IError,
    req: IRequest,
    res: IResponse,
    next: INext
  ) {
    res.status(500)

    const apiPrefix = Locals.config().apiPrefix
    if (req.originalUrl.includes(`/${apiPrefix}/`)) {
      return res.json({
        error: err
      })
    }

    return res.render('error', {
      error: err.stack,
      title: 'Under Maintenance'
    })
  }

  public static notFoundHandler(_express: Application): any {
    const apiPrefix = Locals.config().apiPrefix

    _express.use('*', (req, res) => {
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress

      if (req.xhr || req.originalUrl.includes(`/${apiPrefix}/`)) {
        return res.json({
          error: 'Page Not Found'
        })
      } else {
        res.status(404)
        return res.render('error', {
          title: 'Page Not Found',
          error: []
        })
      }
    })

    return _express
  }
}

export default ErrorHandler
