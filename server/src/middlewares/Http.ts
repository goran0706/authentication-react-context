import compression from 'compression'
import cors from 'cors'
import express, { Application } from 'express'
import morgan from 'morgan'
import path from 'path'

class Http {
  public static mount(_express: Application): Application {
    _express.use(morgan('combined'))
    _express.use(cors())
    _express.use(compression())
    _express.use(express.json())
    _express.use(express.urlencoded({ extended: false }))
    _express.use(express.static(path.join(__dirname, 'public')))

    return _express
  }
}

export default Http
