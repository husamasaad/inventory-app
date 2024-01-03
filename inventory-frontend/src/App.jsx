import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import { Toaster } from "react-hot-toast"

const App = () => {

  const { pathname } = useLocation()
  
  return (
    <>
      { pathname.split('/')[1] && <Sidebar />}
      <Outlet />
      <Toaster />
    </>
  )
}

export default App