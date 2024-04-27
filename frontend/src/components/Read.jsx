import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Read = () => {

  const [data, setData] = useState()
  const [error, setError] = useState("")

  async function getData() {
    const response = await fetch("http://localhost:5000/")

    const result = await response.json()
    if (!response.ok) {
      setError(result.error)
    }

    if (response.ok) {
      setData(result)

    }
  }

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE"
    })
    const result = await response.json()

    if (!response.ok) {
      setError(result.error)
    }

    if (response.ok) {
      setError("DELETED data")
      setTimeout(() => {
        setError("")
        getData()
      }, 1000)
    }


  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className=' container my-2'>
      {error && <div className=' alert alert-danger '>{error}</div>}
      <h2 className=' text-center'>All Data</h2>
      <div className=' row'>
        {data?.map(i => (<div key={i._id} className=' col-3'><div className="card w-100">
          <div className="card-body">
            <h5 className="card-title">{i.name}</h5>
            <h5 className="card-title">{i.email}</h5>

            <h6 className="card-subtitle mb-2 text-muted">{i.age}</h6>
            <a href="#" className="card-link" onClick={() => handleDelete(i._id)}>Delete</a>
            <Link to={`/${i._id}`}  href="#" className="card-link">Edit</Link>
          </div>
        </div>
        </div>

        ))}

      </div>
    </div>
  )
}

export default Read
