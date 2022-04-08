import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Instructor Allocation System</h1>
          <p className="lead">
            
          </p>
          <div className="buttons">
            {/* <a href="register.html" className="btn btn-primary">Sign Up</a> */}
            <Link to="/login" className="btn btn-light">Login</Link>
            <Link to="/addEmployee" className="btn btn-light">Test</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Landing;