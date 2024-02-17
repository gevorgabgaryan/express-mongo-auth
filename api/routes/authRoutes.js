import { Router } from 'express'
import AuthController from '../controllers/authController'
import {checkAuthorization} from '../middlewares/checkAuthorization'
import {
  validateRegisterData,
  validateLoginData,
} from '../middlewares/validation'



const authRoutes = Router()

authRoutes.post('/register', validateRegisterData, AuthController.register)

authRoutes.post('/login', validateLoginData, AuthController.login)

authRoutes.get(
  '/logout',
  checkAuthorization(['admin', 'editor', 'user']),
  AuthController.logout
)

export default authRoutes
