import { NextFunction, Request, Response } from 'express'

class HomeController {
  public static index(req: Request, res: Response, next: NextFunction): void {
    res.render('index')
    next()
  }
}

export default HomeController
