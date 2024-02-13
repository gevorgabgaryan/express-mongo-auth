import AuthService from '../services/authService'

class AuthController {
  static async register (req, res) {
    const { email, password, firstName, lastName } = req.body
    try {
      const result = await AuthService.register(
        email,
        password,
        firstName,
        lastName
      )
      res.status(200).json({
        status: true,
        result
      })
    } catch (e) {
      console.log(e)
      res.status(400).json({
        status: false,
        error: true,
        message: 'System error'
      })
    }
  }

  static async login (req, res) {
    try {
      const { email, password  } = req.body
      const result = await AuthService.login(email, password)
      res.status(200).json({
        status: true,
        result
      })
    } catch (e) {
      console.log(e)
      res.status(400).json({
        status: false,
        error: true,
        message: 'System error'
      })
    }
  }

}

export default AuthController
