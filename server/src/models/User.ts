import bcrypt from 'bcrypt'
import { CallbackError, Document, Query, Schema, model } from 'mongoose'
import { IUser, IUserMethods, UserModel } from '../interfaces/models/user'

const schema = new Schema<IUser, UserModel, IUserMethods>({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: function (value: string) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
      },
      message: 'Please enter a valid email'
    },
    required: [true, 'Email required']
  },
  password: { type: 'string', trim: true, minlength: 8, required: true },
  passwordResetToken: { type: 'string' },
  passwordResetExpires: { type: Date },
  firstName: { type: 'string' },
  lastName: { type: 'string' },
  fullName: { type: 'string' },
  gender: { type: 'string' },
  geolocation: { type: 'string' },
  picture: { type: 'string' }
})

schema.pre<UserModel>('save', function (next) {
  const user: any = this
  if (!user.isModified('password')) return next()

  try {
    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(user.password, salt)
    user.password = hash
    return next()
  } catch (error: unknown) {
    if (error instanceof Error) {
      next(error as CallbackError)
    }
  }
})

schema.pre<Query<IUser, UserModel>>('findOneAndUpdate', async function (next) {
  const user: any = this.getUpdate()
  if (!user.password) return next()

  try {
    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(user.password, salt)
    user.password = hash
    return next()
  } catch (error: unknown) {
    if (error instanceof Error) {
      next(error as CallbackError)
    }
  }
})

schema.statics.toClientObject = (user: Document) => {
  const userObj: IUser = user?.toObject()
  return { ...userObj, password: undefined }
}

schema.statics.comparePassword = (
  requestPassword: string,
  password: string
): boolean => {
  return bcrypt.compareSync(requestPassword, password)
}

const User = model<IUser, UserModel>('User', schema)

export default User
