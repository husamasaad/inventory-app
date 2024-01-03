import React from 'react'
import { FaPencilAlt, FaTrash } from 'react-icons/fa'
import { useStateContext } from '../context/ContextProvider'

const EmployeeRow = ({ item }) => {

  const { deleteProduct, loggedUser, updateItem } = useStateContext()

  let disabled = loggedUser.role !== "owner"

  const { name, role, salary } = item
  return (
    <tr>
      <td>{name}</td>
      <td>{role}</td>
      <td>${salary}</td>
      <td className='actions-cell'>
        <button title={disabled ? 'owners only' : 'edit' } disabled={disabled} className='edit-btn' onClick={() => updateItem(item, 'employee')}>
          <FaPencilAlt />
        </button>
        <button title={disabled ? 'owners only' : 'delete' } disabled={disabled || role === 'owner'} onClick={() => deleteProduct(item, 'employee')} className='delete-btn'>
          <FaTrash />
        </button>
      </td>
    </tr>
  )
}

export default EmployeeRow