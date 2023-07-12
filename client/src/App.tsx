import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import { AuthProvider } from './context/AuthProvider'
import { UserProvider } from './context/UserProvider'

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Navbar />
        <Outlet />
      </UserProvider>
    </AuthProvider>
  )
}

export default App
