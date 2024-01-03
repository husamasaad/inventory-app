import React from 'react'
import Modal from './Modal'
import { useStateContext } from '../context/ContextProvider'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const DeleteModal = () => {

  const { deleteModal, setProductsArray, setEmployeesArray, setDeleteModal } = useStateContext()
  const { token } = useAuth()

  const confirmDelete = async () => {
    if (deleteModal.type === "product") {
      try {
        toast.loading('Just a second..')
        const response = await fetch(`https://inventory-backend-khaki.vercel.app/products/${deleteModal.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json()
        if (response.ok) {
          toast.remove()
          toast.success(data.message)
          setProductsArray(prevArray => prevArray.filter(item => item._id !== deleteModal.id))
        } else {
          toast.remove()
          toast.error(data.message)
        }
      } catch (error) {
        toast.remove()
          toast.error('Something Went Wrong!')
        console.error('Error deleting product:', error);
      }
    } else if (deleteModal.type === "employee") {
      try {
        toast.loading('Just a second..')
        const response = await fetch(`https://inventory-backend-khaki.vercel.app/users/${deleteModal.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json()
        if (response.ok) {
          toast.remove()
          toast.success(data.message)
          setEmployeesArray(prevArray => prevArray.filter(item => item._id !== deleteModal.id) )
        } else {
          toast.remove()
          toast.error(data.message)
        }
      } catch (error) {
        toast.remove()
          toast.error("Something Went Wrong!")
        console.error('Error deleting employee:', error);
      }
    }
    setDeleteModal({
      show: false,
      name: "",
      id: "",
      type: ""
    })
  }

  const cancelDelete = () => {
    setDeleteModal({
      show: false,
      name: "",
      id: "",
      type: ""
    })
  }

  return (
    <Modal show={deleteModal.show}>
      <div className='modal-content'>
        <h4>You are about to delete : {deleteModal.name} with ID: {deleteModal.id}</h4>
        <p>Are you Sure ?</p>
        <button onClick={() => confirmDelete()} className='tab-btn'>Yes, I'am Sure</button>
        <button onClick={() => cancelDelete()} className='tab-btn'>No</button>
      </div>
    </Modal>
  )
}

export default DeleteModal