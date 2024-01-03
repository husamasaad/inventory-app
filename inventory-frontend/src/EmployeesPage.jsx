import React, { useEffect } from 'react'
import { FaBars } from 'react-icons/fa'
import { useStateContext } from './context/ContextProvider'
import Employees from './components/Employees'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
const EmployeesPage = () => {

  const { setShowSidebar } = useStateContext()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
    }

  }, [isAuthenticated, navigate])

  if (isAuthenticated) {
    return (
    <main className='main-container'>
      <button onClick={() => setShowSidebar(true)} className='open-btn'>
        <FaBars />
      </button>
      <Employees />
    </main>
    )
  }

}

export default EmployeesPage