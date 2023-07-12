import jwt, { JwtPayload } from 'jsonwebtoken'
import { INext, IRequest, IResponse } from '../../interfaces/vendors'
import User from '../../models/User'

class AuthController {
  public static async signUp(
    req: IRequest,
    res: IResponse,
    next: INext
  ): Promise<void | any> {
    const { email, password } = req.body
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Please provide email and password' })
    }

    try {
      const user = await User.findOne({ email })
      if (user) {
        return res.status(400).json({ message: 'User already exists' })
      }

      const newUser = new User(req.body)
      const createdUser = await newUser.save()

      const secret = req.app.locals.app.appSecret
      const expires = req.app.locals.app.jwtExpiresIn
      const token = jwt.sign({ sub: createdUser._id }, secret, {
        expiresIn: expires * 60
      })

      return createdUser
        ? res.status(200).json({ token })
        : res.status(409).json({ message: 'Failed to create a user' })
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message })
      }
    }
  }

  public static async signIn(
    req: IRequest,
    res: IResponse,
    next: INext
  ): Promise<void | any> {
    const { email, password } = req.body
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Please provide email and password' })
    }

    try {
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' })
      }

      const isPasswordValid = User.comparePassword(password, user.password)
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid email or password' })
      }

      const secret = req.app.locals.app.appSecret
      const expiresIn = req.app.locals.app.jwtExpiresIn
      const token = jwt.sign({ sub: user._id }, secret, {
        expiresIn: expiresIn * 60
      })

      return res.status(200).json({ token })
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message })
      }
    }
  }

  public static async refreshToken(
    req: IRequest,
    res: IResponse,
    next: INext
  ): Promise<void | any> {
    const _token = AuthController.getToken(req)
    if (_token === '') {
      return res.status(400).json({ message: 'Invalid token' })
    }

    try {
      const secret = req.app.locals.app.appSecret
      const expires = req.app.locals.app.jwtExpiresIn
      const decoded = jwt.verify(_token, secret) as JwtPayload
      const { email, password } = decoded

      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ message: 'No such user found' })
      }

      const isPasswordValid = User.comparePassword(password, user.password)
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Unauthorized' })
      }

      const token = jwt.sign({ sub: user._id }, secret, {
        expiresIn: expires * 60
      })

      return res.status(200).json({ token })
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message })
      }
    }
  }

  public static getToken(req: IRequest): string {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      return req.headers.authorization.split(' ')[1]
    } else if (req.query && req.query.token) {
      return req.query.token as string
    }
    return ''
  }
}

export default AuthController
