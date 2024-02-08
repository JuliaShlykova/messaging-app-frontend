import React from 'react';
import { Link } from 'react-router-dom';

const TooManyRequests = () => {
  return (
    <div style={{display: 'flex', height: '100vh', flexDirection: 'column'}}>
    <p>Too many requests. Please, try again later.</p>
    <Link to="/" style={{textDecoration: 'underline'}}>Return to main page</Link>
    </div>
  )
};

export default TooManyRequests;