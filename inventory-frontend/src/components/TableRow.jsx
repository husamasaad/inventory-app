import React from 'react'
import { FaPencilAlt, FaTrash } from 'react-icons/fa'
import { useStateContext } from '../context/ContextProvider'

const TableRow = ({ item }) => {

  const { deleteProduct, updateItem } = useStateContext()

  const { name, amount, price } = item
  return (
    <tr>
      <td>{name}</td>
      <td>{amount}</td>
      <td>${price}</td>
      <td className='actions-cell'>
        <button className='edit-btn' onClick={() => updateItem(item, 'product')}>
          <FaPencilAlt />
        </button>
        <button 
          onClick={() => deleteProduct(item, 'product')}
          className='delete-btn'
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  )
}

export default TableRow