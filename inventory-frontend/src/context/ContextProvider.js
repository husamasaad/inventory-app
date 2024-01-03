import React, { createContext, useContext, useState } from 'react';
const StateContext = createContext()

export const ContextProvider = ({ children }) => {

  const [showSidebar, setShowSidebar] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const sessionData = sessionStorage.getItem('loggedUser');
  const initialLoggedUser = sessionData ? JSON.parse(sessionData) : null;

  const [loggedUser, setLoggedUser] = useState(initialLoggedUser);

  const [loginModal, setLoginModal] = useState(false)


  // Create...
  const [createModal, setCreateModal] = useState({
    show: false,
    type: ""
  })
  const showCreate = (itemType) => {
    setCreateModal({
      show: true,
      type: itemType
    })
  }


  // Read...
  const [productsArray, setProductsArray] = useState([])
  const [employeesArray, setEmployeesArray] = useState([])


  // Update...
  const [updateModal, setUpdateModal] = useState({
    show: false,
    name: "",
    id: "",
    type: "",
    item: {}
  })
  const updateItem = (item, itemType) => {
    setUpdateModal({
      show: true,
      id: item._id,
      type: itemType,
      name: item.name,
      item: {
        ...item
      }
    })
  }


  // Delete...
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    name: "",
    id: "",
    type: ""
  })
  const deleteProduct = (item, itemType) => {
    setDeleteModal({
      show: true,
      name: item.name,
      id: item._id,
      type: itemType
    })
  }


  return (
    <StateContext.Provider
      value={{
        showSidebar,
        setShowSidebar,
        productsArray,
        employeesArray,
        setEmployeesArray,
        setProductsArray,
        deleteProduct,
        deleteModal,
        createModal,
        showCreate,
        loginModal,
        setLoginModal,
        loggedUser,
        setLoggedUser,
        updateModal,
        updateItem,
        loading,
        setLoading,
        setCreateModal,
        setUpdateModal,
        setDeleteModal
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)