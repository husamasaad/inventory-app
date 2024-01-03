import React from 'react'
import Modal from './Modal'
import AddNewForm from './AddNewForm'
import { newProductFields, updateEmployeeFields } from '../constants/data'
import { useStateContext } from '../context/ContextProvider'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const UpdateModal = () => {
  
  const { 
    updateModal, 
    productsArray, 
    setProductsArray, 
    setUpdateModal, 
    employeesArray,
    setEmployeesArray 
  } = useStateContext()

  const { token } = useAuth()

  const confirmUpdate = async (newObj) => {
    if (updateModal.type === "product") {
      const { id } =  updateModal
      const { name, amount, price } = newObj
      if ( !id|| !name || !amount || !price) {
        return
      }
      try {
        toast.loading('Just a second..')
        const response = await fetch(`https://inventory-backend-khaki.vercel.app/products/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(newObj)
        })
        
        const data = await response.json()
        if (response.ok) {
          toast.remove()
          toast.success(data.message)
          const filteredArray = productsArray.filter(product => product._id !== data.productObj._id)
          setProductsArray([data.productObj, ...filteredArray])
          setUpdateModal({
            show: false,
            id: "",
            type: "",
            item: {}
          })
        } else {
          toast.remove()
          toast.error(data.message)
        }

      } catch (error) {
        toast.remove()
        toast.error("Something Went Wrong")
        console.error('Error updating product:', error);
      }
      
    } else if (updateModal.type === "employee") {
      const { id } =  updateModal
      const { name, role, salary, username } = newObj
      if ( !name || !role || !salary || !username) {
        return
      }
      try {
        toast.loading('Just a second..')
        const response = await fetch(`https://inventory-backend-khaki.vercel.app/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newObj),
      });
      const data = await response.json();
      if (response.ok) {
        toast.remove()
        toast.success(data.message)
        const filteredArray = employeesArray.filter(item => item._id !== data.userObj._id)
        setEmployeesArray([...filteredArray, data.userObj])
        setUpdateModal({
          show: false,
          id: "",
          type: "",
          item: {}
        })
      } else {
        toast.remove()
        toast.error(data.message)
      }

    } catch (error) {
      toast.remove()
      toast.error("Something Went Wrong")
      console.error('Error updating product:', error);
    }
    }
  }


  const cancelUpdate = () => {
    setUpdateModal({
      show: false,
      id: "",
      type: "",
      item: {}
    })
  }

  return (
    <Modal show={updateModal.show}>
      {updateModal.type === "product" 
        ? (
          <div className='modal-content'>
            <h4>Create a new Product</h4>
            <AddNewForm fields={newProductFields} createNew={confirmUpdate} cancel={cancelUpdate} values={updateModal} />
          </div>
        )
        : updateModal.type === "employee" ? (
          <div className='modal-content'>
            <h4>Update {updateModal.name}</h4>
            <AddNewForm fields={updateEmployeeFields} createNew={confirmUpdate} cancel={cancelUpdate} values={updateModal} />
          </div>
        ) : (
          <div className='modal-content'>
            <h4>Something went wrong</h4>
            <button className='add-btn go-back' onClick={() => cancelUpdate()}>go back</button>
          </div>
        )
      }
    </Modal>
  )
}

export default UpdateModal