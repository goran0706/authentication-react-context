import express, { Application } from 'express'
import path from 'path'

class Statics {
  public static mount(_express: Application): Application {
    // Loads Options
    const options = { maxAge: 31557600000 }

    // Load Statics
    _express.use(
      '/public',
      express.static(path.join(__dirname, '../../public'), options)
    )

    // Load NPM Statics
    _express.use(
      '/vendor',
      express.static(path.join(__dirname, '../../node_modules'), options)
    )

    return _express
  }
}

export default Statics
