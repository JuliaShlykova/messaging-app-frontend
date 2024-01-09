import React from 'react'
import { Link } from 'react-router-dom'

const ServerError = () => {
  return (
    <div style={{display: 'flex', height: '100vh', flexDirection: 'column'}}>
    <p>Server Error. Please, try again later.</p>
    <Link to="/login/" style={{textDecoration: 'underline'}}> Login page</Link>
    </div>
  )
}

export default ServerError