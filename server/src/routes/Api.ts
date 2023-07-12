import { Router } from 'express'
import AuthController from '../controllers/Auth'
import HomeController from '../controllers/Home'
import Passport from '../middlewares/Passport'

const router = Router()
router.get('/', HomeController.index)

router.post('/auth/sign-up', AuthController.signUp)
router.post('/auth/sign-in', Passport.requireSignIn(), AuthController.signIn)
router.post(
  '/auth/refresh-token',
  Passport.requireSignIn(),
  AuthController.refreshToken
)

export default router
