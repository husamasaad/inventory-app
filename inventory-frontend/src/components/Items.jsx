import React, { useEffect, useState } from 'react'
import { useStateContext } from '../context/ContextProvider'
import TableRow from './TableRow'
import DeleteModal from './DeleteModal'
import CreateModal from './CreateModal'
import UpdateModal from './UpdateModal'
import Loading from './Loading'


const Items = () => {

  const { productsArray, showCreate, loading, setLoading, setProductsArray } = useStateContext()
  const [failedFetch, setFailedFetch] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      setFailedFetch(false)
      setLoading(true)
      try {
        const response = await fetch('http://localhost:3500/products');
        if (response.ok) {
          const data = await response.json();
          setProductsArray(data);
          setLoading(false)
        } else {
          setLoading(false)
        }
      } catch (error) {
        setLoading(false)
        setFailedFetch(true)
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [setLoading, setProductsArray]);


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
  
  if (loading) {
    return <Loading />
  }

  return (
    <section>
      <header className='header-container'>
        <h2 className='section-title'>Stored Products</h2>
        <button onClick={() => showCreate("product")} className='add-btn'>add new</button>
      </header>
      <div className="projects">
        <div className="responsive-table">
          <table className="fs-15 w-full">
            <thead>
              <tr>
                <td>Product name</td>
                <td>Amount</td>
                <td>Price</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {
                productsArray.length >0 &&
                  productsArray.map(item => <TableRow key={item._id} item={item}/>)
              }
              </tbody>
          </table>
          {productsArray.length === 0 && <p className='empty'>The Store is Empty</p>}
        </div>
      </div>
      <DeleteModal />
      <CreateModal />
      <UpdateModal />
    </section>
  )
}

export default Items