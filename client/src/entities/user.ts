export interface IUser {
  _id: string | number
  email: string
  password?: string
  confirmPassword?: string
  firstName: string
  lastName: string
  fullName: string
  gender?: string
  geolocation?: string
  picture?: string
}
