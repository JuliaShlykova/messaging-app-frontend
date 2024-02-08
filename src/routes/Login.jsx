import React, { useReducer, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { login } from '../api/auth';

const Login = () => {
  const [typePassword, toggleType] = useReducer(type=>type==='password'?'text':'password', 'password');
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const submitForm = async(e) => {
    e.preventDefault();
    setErrors([]);
    try {
      const form = e.target;
      const formData = new FormData(form);
      await login(formData);
      navigate('/');
    } catch(err) {
      if (err.message === 'Network Error') {
        return navigate('/server-error');
      }
      if (err.response?.data?.errors){
        setErrors(err.response.data.errors);
      }
      console.log(err);
    }
  };

  const examplelogin = async(e) => {
    e.preventDefault();
    try {
      await login({
        email: 'john_smith@test.com',
        password: 'password'
      });
      navigate('/');
    } catch(err) {
      if (err.message === 'Network Error') {
        return navigate('/server-error');
      }
      console.log(err);
    }
  };

  return (
    <div className='login-route-container'>
      <div className='logo'>messageMe</div>
      <div className="login-form">
        <h1>Login</h1>
        <form onSubmit={submitForm}>
          <label htmlFor="email">Email (required): </label>
          <input type="email" id="email" placeholder='john@smith.com' name="email" maxLength={254} required/>
          <label htmlFor="password">Password (required): </label>
          <div className="password-container">
            <input type={typePassword} id="password" name ="password" required/>
              {(typePassword==='password')
              ?<AiFillEye onClick={() => {toggleType()}}/>
              :<AiFillEyeInvisible onClick={() => {toggleType()}}/>}
          </div>
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
          <button type='submit'>Log In</button>
        </form>
        <p>Don't have an account? <Link to='/signup'> Sign up</Link> </p>
        <div className="horizontal-line"></div>
        <button id='btn-example-account' onClick={examplelogin}>
            Log in with Example account
          </button>
      </div>
    </div>
  )
};

export default Login;