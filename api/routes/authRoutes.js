import { Router } from 'express'
import AuthController from '../controllers/authController'
import {
  validateRegisterData,
  validateLoginData,
} from '../middlewares/validation'

const authRoutes = Router()

authRoutes.post('/register', validateRegisterData, AuthController.register)

authRoutes.post('/login', validateLoginData, AuthController.login)

export default authRoutes
