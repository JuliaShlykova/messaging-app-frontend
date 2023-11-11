import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Users = () => {
  const [users, setUsers] = useState([
    {
      _id: '1',
      nickname: 'John Wick'
    },
    {
      _id: '2',
      nickname: 'Hugh Lori'
    }
  ])

  return (
    <>
      {users.map((user, i) => {
        return(
          <NavLink key={i} to={'/users/'+user.nickname}>{user.nickname}</NavLink>
        )
      })}
    </>
  )
}

export default Users