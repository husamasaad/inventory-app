import React from 'react'
import { useStateContext } from '../context/ContextProvider'
import { tabs } from '../constants/data'
import { BsX, BsDoorOpen } from 'react-icons/bs'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Sidebar = () => {

  const { pathname } = useLocation()
  const navigate = useNavigate()

  const { showSidebar, setShowSidebar, loggedUser, setLoggedUser } = useStateContext()


  const logOut = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('loggedUser');
    setLoggedUser({
      name: '',
      role: '',
      username: ''
    })
    setShowSidebar(false)
    navigate('/')
    window.location.reload()
  }

  return (
    <aside className={`tabs-container ${showSidebar && "show"}`}>
      <button onClick={() => setShowSidebar(false)} className='close-btn'>
        <BsX />
      </button>
      <h1 className='tabs-title'>Hi, {loggedUser.name || "..."}</h1>
      <div>
        {tabs.map(tab => {
          const { value, label, icon } = tab
          const btnClass = pathname.split('/')[1] === value ?
          "tab-btn active" : "tab-btn"
          return (
          <Link
            to={`/${label.toLowerCase()}`}
            key={value}
            className={btnClass}
            onClick={() => setShowSidebar(false)}
          >
            {icon} {label}
          </Link>
        )})}
        <button
          className="tab-btn log-out"
          onClick={logOut}
        >
          <BsDoorOpen />  Logout
        </button>
      </div>
    </aside>
  )
}

export default Sidebar