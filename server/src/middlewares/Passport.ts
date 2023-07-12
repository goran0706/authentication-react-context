import { Application } from 'express'
import passport from 'passport'
import passportJWT from 'passport-jwt'
import { Strategy as LocalStrategy } from 'passport-local'
import User from '../models/User'
import Locals from '../providers/Locals'

const JwtStrategy = passportJWT.Strategy
const ExtractJwt = passportJWT.ExtractJwt

class Passport {
  public static mount(_express: Application): Application {
    Passport.loadJwtStrategy()
    Passport.loadLocalStrategy()

    _express.use(passport.initialize())

    return _express
  }

  public static requireAuth() {
    return passport.authenticate('jwt', { session: false })
  }

  public static requireSignIn() {
    return passport.authenticate('local', { session: false })
  }

  private static loadJwtStrategy() {
    const opts: any = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
    opts.secretOrKey = Locals.config().appSecret

    passport.use(
      new JwtStrategy(opts, function (jwt_payload, done) {
        User.findOne({ _id: jwt_payload.sub })
          .then((user) => {
            if (user) {
              return done(null, user)
            } else {
              return done(null, false)
              // or you could create a new account
            }
          })
          .catch((err) => {
            return done(err, false)
          })
      })
    )
  }

  private static loadLocalStrategy() {
    passport.use(
      new LocalStrategy(
        {
          usernameField: 'email',
          passwordField: 'password'
        },
        (email, password, done) => {
          User.findOne({ email })
            .then((user) => {
              if (!user) {
                return done(null, false, {
                  message: 'Incorrect email or password.'
                })
              }
              const isPasswordValid = User.comparePassword(
                password,
                user.password
              )
              if (!isPasswordValid) {
                return done(null, false, {
                  message: 'Incorrect email or password.'
                })
              }
              return done(null, user)
            })
            .catch((err) => {
              return done(err)
            })
        }
      )
    )
  }
}

export default Passport
