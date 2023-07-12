import { AxiosError, CanceledError } from 'axios'
import { ReactNode, createContext, useEffect, useState } from 'react'
import { IUser } from '../entities/user'
import { useAuth } from '../hooks/useAuth'
import userService from '../services/user-service'

interface IUserContext {
  users: IUser[]
  error: string
  isLoading: boolean
  getUsers: () => () => void
  createUser: (user: IUser) => void
  updateUser: (user: IUser) => void
  deleteUser: (user: IUser) => void
}

export const UserContext = createContext<IUserContext | null>(null)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<IUser[]>([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { token } = useAuth()

  useEffect(() => {
    if (token) {
      getUsers()
    }
  }, [token])

  const getUsers = () => {
    setIsLoading(true)
    const { request, cancel } = userService.getAll<IUser>()
    request
      .then((res) => {
        setUsers(res.data)
        setIsLoading(false)
      })
      .catch((err) => {
        if (err instanceof CanceledError) return
        if (err instanceof AxiosError) {
          const _error = (err.response?.data as string) || err.message
          setError(_error)
        } else {
          throw err
        }
      })

    return () => cancel()
  }

  const createUser = (user: IUser) => {
    const originalUsers = [...users]
    const newUser = { ...user }
    setUsers([newUser, ...users])
    userService.create(newUser).catch((err) => {
      if (err instanceof AxiosError) {
        const _error = (err.response?.data as string) || err.message
        setError(_error)
        setUsers(originalUsers)
      } else {
        throw err
      }
    })
  }

  const updateUser = (user: IUser) => {
    const originalUsers = [...users]
    const editedUser = { ...user }
    setUsers(users.map((u) => (u._id === user._id ? editedUser : u)))
    userService.update(editedUser).catch((err) => {
      if (err instanceof AxiosError) {
        const _error = (err.response?.data as string) || err.message
        setError(_error)
        setUsers(originalUsers)
      } else {
        throw err
      }
    })
  }

  const deleteUser = (user: IUser) => {
    const originalUsers = [...users]
    setUsers(users.filter((u) => u._id !== user._id))
    userService.delete(user).catch((err) => {
      if (err instanceof AxiosError) {
        const _error = (err.response?.data as string) || err.message
        setError(_error)
        setUsers(originalUsers)
      } else {
        throw err
      }
    })
  }

  const value = {
    users,
    error,
    isLoading,
    getUsers,
    createUser,
    updateUser,
    deleteUser
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
