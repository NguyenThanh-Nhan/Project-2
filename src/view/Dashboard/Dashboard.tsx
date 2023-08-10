import React from 'react'
import { Link } from 'react-router-dom'

function Dashboard() {
  return (
    <Link to={"/login"}>
    <button className='btn-info'>Log Out </button>
    </Link>
  )
}

export default Dashboard