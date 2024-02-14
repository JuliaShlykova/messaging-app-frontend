import React, { useEffect, useReducer, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { signup } from '../api/auth';
import Loading from '../components/Loading';

const Signup = () => {
  const [nickname,  setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [typePassword, toggleType] = useReducer(type=>type==='password'?'text':'password', 'password');
  const [errors, setErrors] = useState([]);
  const [loading, toggleLoading] = useReducer(c=>!c, false);

  const navigate = useNavigate();

  useEffect(() => {
    if (password!==passwordConfirm) {
      setErrors([{msg: 'passwords must match'}]);
    } else {
      setErrors([]);
    }
  }, [password, passwordConfirm]);

  const submitForm = async(e) => {
    e.preventDefault();
    if (password === passwordConfirm) {
      toggleLoading();
      setErrors([]);
      try {
        await signup({
          nickname,
          email,
          password,
          confirm_password: passwordConfirm
        });
        navigate('/');
      } catch(err) {
        if (err.message === 'Network Error') {
          return navigate('/server-error');
        }
        if (err.response?.data?.errors){
          setErrors(err.response.data.errors);
        }
        console.log(err);
      } finally {
        toggleLoading();
      }
    }
  };

  return (
    <>
    <div className="login-route-container">
      <div className='logo'>messageMe</div>
      <div className="login-form">
        <h1>Sign-up</h1>
        <form onSubmit={submitForm}>
          <label htmlFor="email">Email (required): </label>
          <input type="email" id="email" value={email} placeholder='john@smith.com' onChange={(e) => {setEmail(e.target.value)}} maxLength={254} required/>
          <label htmlFor="nickname">Nickname (required): </label>
          <input type="text" id="nickname" value={nickname} placeholder='john_smith' onChange={(e) => {setNickname(e.target.value)}} maxLength={40} required/>
          <label htmlFor="password">Password (required): </label>
          <div className="password-container">
              <input type={typePassword} id="password" value={password} onChange={(e) => {setPassword(e.target.value)}} minLength={8} required/>
                {(typePassword==='password')
                ?<AiFillEye onClick={() => {toggleType()}}/>
                :<AiFillEyeInvisible onClick={() => {toggleType()}}/>}
            </div>
          <label htmlFor="password-confirm">Confirm password (required): </label>
          <input type="password" id="password-confirm" value={passwordConfirm} onChange={(e) => {setPasswordConfirm(e.target.value)}} required/>
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
          <button type='submit'>Sign Up</button>
        </form>
        <p>Already have an account? <Link to='/login'> Log in</Link> </p>
        </div>
    </div>
    {loading
    ?<Loading />
    :null}
    </>
  )
};

export default Signup;