import { Request, Response } from 'express';
import UserService from '../services/userServices';

const userService = new UserService();

class UserController {
  async registerUser(req: Request, res: Response) {
    try {
      const { username, mobileNumber, email, role, password } = req.body;
      ///console.log("-------------registerUser-----")
      const newUser = await userService.registerUser(username, mobileNumber, email, role, password);
      return res.status(201).json({ status: 200, message: 'success', data: newUser });
    } catch (error) {
      let errorMessage = 'Failed to register user';
      if (error instanceof Error) {
        errorMessage = error.message; // Access the error message if it's an instance of Error
      }
      console.log("registerUser ===========error", errorMessage);
      return res.status(500).json({ status: 500, message: errorMessage });
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const { email, mobileNumber, password } = req.body;

      const token = await userService.loginUser(email, mobileNumber, password);
      return res.status(200).json({ status: 200, message: 'success', data: token });
    } catch (error) {
      let errorMessage = 'Failed to get user details';
      if (error instanceof Error) {
        errorMessage = error.message; // Access the error message if it's an instance of Error
      }
      return res.status(500).json({ status: 500, message: errorMessage });
    }
  }
}

export default UserController;
