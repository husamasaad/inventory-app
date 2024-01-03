import React, { useState } from 'react'

const AddNewForm = ({ fields, createNew, cancel, values }) => {

  let fieldsState={};

  const item = values?.item

  if(values) {
    fields.forEach(field=>fieldsState[field.id]=item[field.id]);
  } else {
    fields.forEach(field=>fieldsState[field.id]="");
  }


  const [formData, setformData]=useState(fieldsState);
  const handleChange=(e)=>setformData({...formData,[e.target.id]:e.target.value});

  const handleSubmit = (e) => {
    e.preventDefault()
    createNew(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      {
        fields.map(field=> {
          const { id, labelText, labelFor, name, type, isRequired, placeholder } = field
          return (
          <div key={id}>
            <label htmlFor={labelFor} className="sr-only">
              {labelText}
            </label>
            <input
              onChange={handleChange}
              value={formData[id]}
              id={id}
              name={name}
              type={type}
              required={isRequired}
              placeholder={placeholder}
            />
          </div>
            )
          }
        )
      }
      <div className='btns-container'>
        <button onClick={() => cancel()} className='add-btn cancel' type='button'>cancel</button>
        <button className='add-btn submit' type='submit'>submit</button>
      </div>
    </form>
  )
}

export default AddNewForm