import React from 'react'

const Modal = ({ children, show }) => {
  return (
    <div className={`modal-conatiner ${show && "show"}`}>
      {children}
    </div>
  )
}

export default Modal