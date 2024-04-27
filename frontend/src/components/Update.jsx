import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const Update = () => {

  const { id } = useParams()
  const navigate = useNavigate();

  const [data, setData] = useState()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [age, setAge] = useState(0)
  const [error, setError] = useState("")


  const getData = async (id) => {
    const response = await fetch(`http://localhost:5000/${id}`)
    const result = await response.json()
    if (!response.ok) {
      setError(result.error)
    }

    if (response.ok) {
      setData(result)
      setName(result.name)
      setEmail(result.email)
      setAge(result.age)
    }
  }

  useEffect(() => { getData(id) }, [])

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    const addUser = {name,email,age}
    const response = await fetch(`http://localhost:5000/${id}`, {
      method: "PATCH",
      body: JSON.stringify(addUser),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const result = await response.json()

    if (!response.ok) {
      setError(result.error)
    }

    if (response.ok) {
      setError("Updete data")
      setTimeout(() => {
        setError("")
        navigate("/all")
      }, 0)
    }
  }


  return (
    <div>
      {error && <div className=' alert alert-danger '>{error}</div>}
      {data && <form onSubmit={e => handleUpdate(e, data._id)}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" defaultValue={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" className="form-control" aria-describedby="emailHelp" defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">age</label>
          <input type="number" className="form-control" defaultValue={age} onChange={(e) => setAge(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary" >Update</button>
      </form>}
    </div>
  )
}

export default Update
