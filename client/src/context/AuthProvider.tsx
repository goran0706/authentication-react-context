import axios, { AxiosError } from 'axios'
import { ReactNode, createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type JSONResponse = {
  token: string
  message: string
}

type AuthContextType = {
  token: string
  error: string
  isError: boolean
  isLoading: boolean
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

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
    setIsLoading(true)
    const url = 'http://localhost:3000/api/v1/auth/sign-up'
    try {
      const response = await axios.post<JSONResponse>(url, { email, password })
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
        const data = err.response?.data as JSONResponse
        const _error = data?.message || (data as unknown as string)
        setError(_error)
      }
      setToken('')
      setIsError(true)
      setIsLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    setIsLoading(true)
    const url = 'http://localhost:3000/api/v1/auth/sign-in'
    try {
      const response = await axios.post<JSONResponse>(url, { email, password })
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
        const data = err.response?.data as JSONResponse
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
