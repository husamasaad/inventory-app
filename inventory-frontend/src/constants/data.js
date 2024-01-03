import { FaBox, FaUser } from "react-icons/fa"

export const tabs = [
  {
    value: 'products',
    label: 'Products',
    icon: <FaBox />,
  },
  {
    value: 'employees',
    label: 'Employees',
    icon: <FaUser />,
  },
]

export const newProductFields = [
  {
    labelText:"Product Name",
    labelFor:"name",
    id:"name",
    name:"name",
    type:"text",
    isRequired: true,
    placeholder:""   
  },
  {
    labelText:"Product Amount",
    labelFor:"amount",
    id:"amount",
    name:"amount",
    type:"number",
    isRequired: true,
    placeholder:""   
  },
  {
    labelText:"Product Price",
    labelFor:"price",
    id:"price",
    name:"price",
    type:"number",
    isRequired: true,
    placeholder:""   
  }
]

export const newEmployeeFields = [
  {
    labelText:"Employee Name",
    labelFor:"name",
    id:"name",
    name:"name",
    type:"text",
    isRequired: true,
    placeholder:""   
  },
  {
    labelText:"Username",
    labelFor:"username",
    id:"username",
    name:"username",
    type:"text",
    isRequired: true,
    placeholder:""   
  },
  {
    labelText:"Password",
    labelFor:"password",
    id:"password",
    name:"password",
    type:"password",
    isRequired: true,
    placeholder:""   
  },
  {
    labelText:"Role",
    labelFor:"role",
    id:"role",
    name:"role",
    type:"text",
    isRequired: true,
    placeholder:""   
  },
  {
    labelText:"Salary",
    labelFor:"salary",
    id:"salary",
    name:"salary",
    type:"number",
    isRequired: true,
    placeholder:""   
  }
]
export const updateEmployeeFields = [
  {
    labelText:"Employee Name",
    labelFor:"name",
    id:"name",
    name:"name",
    type:"text",
    isRequired: true,
    placeholder:""   
  },
  {
    labelText:"Username",
    labelFor:"username",
    id:"username",
    name:"username",
    type:"text",
    isRequired: true,
    placeholder:""   
  },
  {
    labelText:"Role",
    labelFor:"role",
    id:"role",
    name:"role",
    type:"text",
    isRequired: true,
    placeholder:""   
  },
  {
    labelText:"Salary",
    labelFor:"salary",
    id:"salary",
    name:"salary",
    type:"number",
    isRequired: true,
    placeholder:""   
  }
]

export const loginFields = [
  {
    labelText:"Username",
    labelFor:"username",
    id:"username",
    name:"username",
    type:"text",
    isRequired: true,
    placeholder:""   
  },
  {
    labelText:"Password",
    labelFor:"password",
    id:"password",
    name:"password",
    type:"password",
    isRequired: true,
    placeholder:""   
  },
]

