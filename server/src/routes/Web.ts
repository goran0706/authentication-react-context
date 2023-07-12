import { Router } from 'express'
import UserController from '../controllers/User'
import Passport from '../middlewares/Passport'

const router = Router()
router.get('/users/', Passport.requireAuth(), UserController.getUsers)
router.post('/users/', Passport.requireAuth(), UserController.createUser)
router.get('/users/:id', Passport.requireAuth(), UserController.getUserById)
router.put('/users/:id', Passport.requireAuth(), UserController.updateUser)
router.delete('/users/:id', Passport.requireAuth(), UserController.deleteUser)

export default router
