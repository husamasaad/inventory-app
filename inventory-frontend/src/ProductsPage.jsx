import React, { useEffect } from 'react'
import { useStateContext } from './context/ContextProvider'
import { FaBars } from 'react-icons/fa'
import Items from './components/Items'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

const ProductsPage = () => {

  const { setShowSidebar, loggedUser } = useStateContext()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
    }

  }, [isAuthenticated, loggedUser, navigate])


  if (isAuthenticated) {
    return (
      <main className='main-container'>
        <button onClick={() => setShowSidebar(true)} className='open-btn'>
          <FaBars />
        </button>
        <Items />
      </main>
    )
  }
}

export default ProductsPage