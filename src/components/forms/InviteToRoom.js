import React, { useState } from 'react'
import Avatar from '../Avatar';

const InviiteToRoom = ({toggleShowInvite}) => {
  const [errors, setErrors] = useState([]);
  const [users, setUsers] = useState((() => {
    let arr = [...Array(20).keys()];
    let resArr = []
    for (let el of arr) {
      resArr.push({
        _id: el,
        nickname: 'useruseruser'+el
      })
    }
    return resArr;
  })())


  const submitForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    if (!formData.has('participants')) {
      setErrors([{msg: 'invite at least one person'}]);
      return;
    }
    for (const [name,value] of formData) {
      console.log(name, ":", value)
    }
    // invite(formData);
    toggleShowInvite();
  }

  return (
    <div className='form-container' onMouseDown={e=>{toggleShowInvite()}}>
      <div className="form-block" onMouseDown={e=>{e.stopPropagation();}}>
      <form onSubmit={submitForm}>
        <h1>Invite users:</h1>
        <ul className='list-to-invite'>
          {users.map((user,i) =>
            <li key={i}>
              <label htmlFor={user.nickname}>
              <input type="checkbox" id={user.nickname} value={user._id} name="participants" />
              <div className="avatar-container">
                    {user.profileImgUrl
                    ?<img src={user.profileImgUrl} alt='' />
                    :<Avatar name={user.nickname} />}
                  </div>
                  <p>{user.nickname}</p>
              </label>
            </li>
          )}
        </ul>
        {errors.length
            ?<div className="errors">
              {errors.map((err, i) => {
                return (
                  <p key={i}>{err.msg}</p>
                )
              })}
            </div>
            :null
          }
        <button type="submit">Submit</button>
      </form>
      </div>
    </div>
  )
}

export default InviiteToRoom