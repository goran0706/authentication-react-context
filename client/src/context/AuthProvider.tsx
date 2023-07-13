import { AxiosError } from 'axios'
import { ReactNode, createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authService, { AuthResponse } from '../services/auth-service'

type AuthContextType = {
  token: string
  error: string
  isError: boolean
  isLoading: boolean
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => void
}

// Context
export const AuthContext = createContext<AuthContextType | null>(null)

// Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string>(
    () => localStorage.getItem('token') || ''
  )
  const [error, setError] = useState<string>('')
  const [isError, setIsError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  const signUp = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const response = await authService.signUp(email, password)
      setToken(response.data.token)
      setError('')
      setIsError(false)
      setIsLoading(false)
      navigate('/dashboard')
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      }
      if (err instanceof AxiosError) {
        const data = err.response?.data as AuthResponse
        const _error = data?.message || (data as unknown as string)
        setError(_error)
      }
      setToken('')
      setIsError(true)
      setIsLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const response = await authService.signIn(email, password)
      setToken(response.data.token)
      setError('')
      setIsError(false)
      setIsLoading(false)
      navigate('/dashboard')
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      }
      if (err instanceof AxiosError) {
        const data = err.response?.data as AuthResponse
        const _error = data?.message || (data as unknown as string)
        setError(_error)
      }
      setToken('')
      setIsError(true)
      setIsLoading(false)
    }
  }

  const signOut = () => {
    setToken('')
    navigate('/sign-out')
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        error,
        isError,
        isLoading,
        signUp,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
