import { useContext } from 'react'
import { UserContext } from '../context/UserProvider'

export const useUsers = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUsers must be within the UserProvider')
  }
  return context
}
