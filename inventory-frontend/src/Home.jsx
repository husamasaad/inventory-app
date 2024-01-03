import React from 'react'
import { useStateContext } from './context/ContextProvider'
import { Link } from 'react-router-dom'
import { tabs } from './constants/data'
import LoginModal from './components/LoginModal'
import { useAuth } from './context/AuthContext'


const Home = () => {
  const { setLoginModal, loggedUser } = useStateContext()
  const { isAuthenticated } = useAuth()

  let content = null

  if (isAuthenticated) {
    content = (
      <div className='welcome-content'>
        <h1>Welcome Back {loggedUser.name}</h1>
        <div>
        {tabs.map(tab => {
          const { value, label, icon } = tab
          return (
          <Link
            to={`/${label.toLowerCase()}`}
            key={value}
            className='tab-btn'
          >
            {icon} {label}
          </Link>
        )})}
        </div>
      </div>
    )
  } else {
    content = (
      <>
        <div className="welcome-content">
          <h1>Hi, There..</h1>
          <p>this is an inventory management app, built by Husam Asaad as a solution for an assigment to earn an internship oppurtonity as a Frontend Developer.</p>
          <button 
            className='add-btn'
            onClick={() => setLoginModal(true)}
          >
            Login as admin
          </button>
          <p>Or request access to take a look by contacting 
            <br />
            <a href="mailto:husamibnasaad@gmail.com">husamibnasaad@gmail.com</a></p>
        </div>
        <LoginModal />
      </>
    )
  }
  return (
    <>
      <main className='welcome-container'>
        {content}
      </main>
    </>
  )
}

export default Home