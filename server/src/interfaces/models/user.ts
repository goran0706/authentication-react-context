import { Document, Model } from 'mongoose'

export interface IUser {
  id: string
  email: string
  password: string
  passwordResetToken: string
  passwordResetExpires: Date
  firstName: string
  lastName: string
  fullName: string
  gender: string
  geolocation: string
  picture: string
}

export interface IUserMethods {}

export interface UserModel extends Model<IUser, {}, IUserMethods> {
  comparePassword(requestPassword: string, password: string): boolean
  validPassword(password: string): boolean
  toClientObject(user: Document): IUser
}
