import React, { useEffect, useState } from 'react'
import EmployeeRow from './EmployeeRow'
import DeleteModal from './DeleteModal'
import { useStateContext } from '../context/ContextProvider'
import CreateModal from './CreateModal'
import UpdateModal from './UpdateModal'
import Loading from './Loading'

const Employees = () => {

  const { showCreate, loggedUser, loading, setLoading, employeesArray, setEmployeesArray } = useStateContext()
  const [failedFetch, setFailedFetch] = useState(false)
  
  useEffect(() => {
    const fetchEmployees = async () => {
      setFailedFetch(false)
      setLoading(true)
      try {
        const response = await fetch('http://localhost:3500/users');
        const data = await response.json();
        if (Array.isArray(data)) {
          setEmployeesArray(data);
          setLoading(false)
        } else {
          console.log("not array")
        }
      } catch (error) {
        setLoading(false)
        setFailedFetch(true)
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();

  }, [setLoading, setEmployeesArray]);

  const tryAgain = () => {
    window.location.reload();
  }

  if (failedFetch) {
    return (
      <section className='loading-container'>
        <div className='error-content'>
          <h2>Something Went Wrong</h2>
          <button className='add-btn go-back' onClick={tryAgain}>Try Again</button>
        </div>
      </section>
    )
  }

  let disabled = loggedUser.role !== "owner"

  if (loading) {
    return <Loading />
  }
  return (
    <section>
      <header className='header-container'>
        <h2 className='section-title'>Employees</h2>
        <button title={disabled ? 'owners only' : 'add new' } disabled={disabled} onClick={() => showCreate("employee")} className='add-btn'>add new</button>
      </header>
      <div className="projects">
        <div className="responsive-table">
          <table className="fs-15 w-full">
            <thead>
              <tr>
                <td>Employee name</td>
                <td>Role</td>
                <td>Salary/month</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              { employeesArray.length > 0 &&
                employeesArray.map(item => <EmployeeRow key={item._id} item={item}/>)
              }
            </tbody>
          </table>
            {employeesArray.length === 0 && <p className='empty'>You have no Employees yet</p>}
        </div>
      </div>
      <DeleteModal />
      <CreateModal />
      <UpdateModal />
    </section>
  )
}

export default Employees