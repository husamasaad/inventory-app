import React from 'react'
import AddNewForm from './AddNewForm'
import { loginFields } from '../constants/data'
import { useStateContext } from '../context/ContextProvider'
import Modal from './Modal'
import toast from 'react-hot-toast'

const LoginModal = () => {

  const { loginModal, setLoginModal, setLoggedUser } = useStateContext()

  const login = async (userObj) => {
    const { username, password } = userObj
    if (!username || !password) {
      return
    }
    try {
      toast.loading('Just a second..')
      const response = await fetch('https://inventory-backend-khaki.vercel.app/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      
      if (response.ok) {
        const token = data.token;

        // Store the token in a secure way (e.g., in a cookie or local storage)
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('loggedUser', JSON.stringify(data.loggedUser));
        toast.remove()
        toast.success(data.message)
        setLoggedUser(data.loggedUser)
        setLoginModal(false)
        window.location.reload()
      } else {
        toast.remove()
        toast.error(data.message)
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      toast.remove()
      toast.error('Something Went Wrong!')
    }
  }

  const cancelLoginModal = () => {
    setLoginModal(false)
  }

  return (
    <Modal show={loginModal}>
      <div className='modal-content'>
        <h4>Login as Admin</h4>
        <AddNewForm fields={loginFields} createNew={login} cancel={cancelLoginModal} />
      </div>
    </Modal>
  )
}

export default LoginModal