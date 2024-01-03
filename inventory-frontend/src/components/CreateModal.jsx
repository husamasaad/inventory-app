import React from 'react'
import { useStateContext } from '../context/ContextProvider'
import Modal from './Modal'
import { newEmployeeFields, newProductFields } from '../constants/data';
import AddNewForm from './AddNewForm';
import { useAuth } from '../context/AuthContext';
import toast from "react-hot-toast"

const CreateModal = () => {

  const { createModal, setProductsArray, setCreateModal, setEmployeesArray, employeesArray } = useStateContext()
  const { token } = useAuth()

  // New Product
  const createProduct = async (productObj) => {
    const { name, amount, price } = productObj
    if ( !name || !amount || !price || !token) {
      return
    }
    try {
      toast.loading('Just a second..')
      const response = await fetch('https://inventory-backend-khaki.vercel.app/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productObj),
      });
      const data = await response.json();
      if (response.ok) {
        toast.remove()
        toast.success(data.message)
        setProductsArray(prevArray => [data.productObj, ...prevArray])
        setCreateModal({
          show: false,
          type: ""
        })
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('Something Went Wrong')
      console.error('Error creating product:', error);
    }
  }

  // New Employee
  const createEmployee = async (employeeObj) => {
    const { name, role, salary } = employeeObj
    if ( !name || !role || !salary || !token) {
      return
    }
    try {
      toast.loading('Just a second..')
      const response = await fetch('https://inventory-backend-khaki.vercel.app/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(employeeObj),
      });
      const data = await response.json();
      if (response.ok) {
        toast.remove()
        toast.success(data.message)
        setEmployeesArray([...employeesArray, data.userObj])
        setCreateModal({
          show: false,
          type: ""
        })
      } else {
        toast.remove()
        toast.error(data.message)
      }
    } catch (error) {
      toast.remove()
      toast.error('Something Went Wrong')
      console.error('Error creating employee:', error);
    }
  }

  const cancelCreate = (itemType) => {
    setCreateModal({
      show: false,
      type: ""
    })
  }

  return (
    <Modal show={createModal.show}>
      {createModal.type === "product" 
        ? (
          <div className='modal-content'>
            <h4>Create a new Product</h4>
            <AddNewForm fields={newProductFields} createNew={createProduct} cancel={cancelCreate} />
          </div>
        )
        : createModal.type === "employee" ? (
          <div className='modal-content'>
            <h4>Create a new Employee</h4>
            <AddNewForm fields={newEmployeeFields} createNew={createEmployee} cancel={cancelCreate} />
          </div>
        ) : (
          <div className='modal-content'>
            <h4>Something went wrong</h4>
            <button className='add-btn go-back' onClick={() => cancelCreate()}>go back</button>
          </div>
        )
      }
    </Modal>
  )

}

export default CreateModal