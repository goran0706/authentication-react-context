import { INext, IRequest, IResponse } from '../../interfaces/vendors'
import User from '../../models/User'

class UserController {
  public static async getUsers(
    req: IRequest,
    res: IResponse,
    next: INext
  ): Promise<void | any> {
    try {
      const users = []
      for await (const user of User.find()) {
        users.push(User.toClientObject(user))
      }
      return res.status(200).json(users)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message })
      }
    }
  }

  public static async getUserById(
    req: IRequest,
    res: IResponse,
    next: INext
  ): Promise<void | any> {
    const id = req.params.id
    try {
      const user = await User.findById(id)
      return user
        ? res.status(200).json(User.toClientObject(user))
        : res.status(404).json({ message: 'No such user found!' })
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message })
      }
    }
  }

  public static async createUser(
    req: IRequest,
    res: IResponse,
    next: INext
  ): Promise<void | any> {
    const { email, password, firstName, lastName } = req.body
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

      return createdUser
        ? res.status(200).json(User.toClientObject(createdUser))
        : res.status(409).json({ message: 'Failed to create a user' })
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message })
      }
    }
  }

  public static async updateUser(
    req: IRequest,
    res: IResponse,
    next: INext
  ): Promise<void | any> {
    const id = req.params.id
    const user = req.body

    try {
      const updatedUser = await User.findOneAndUpdate({ _id: id }, user)

      return updatedUser
        ? res.status(200).json(User.toClientObject(updatedUser))
        : res.status(409).json({ message: 'Failed to update a user' })
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message })
      }
    }
  }

  public static async deleteUser(
    req: IRequest,
    res: IResponse,
    next: INext
  ): Promise<void | any> {
    const id = req.params.id

    try {
      const deletedUser = await User.findByIdAndDelete(id)

      return deletedUser
        ? res.status(200).json(User.toClientObject(deletedUser))
        : res.status(409).json({ message: 'Failed to delete a user' })
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message })
      }
    }
  }
}

export default UserController
