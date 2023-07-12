import { Application } from 'express'
import path from 'path'

class Views {
  public static mount(_express: Application): Application {
    _express.set('view engine', 'ejs')
    _express.set('view options', { pretty: true })
    _express.set('views', path.join(__dirname, '../views'))

    return _express
  }
}

export default Views
