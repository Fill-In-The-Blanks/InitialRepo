import React from 'react'

const navbar = () => {
  return (
    <nav class="navbar bg-dark">
      <h1>
        <a href="index.html"><i class="fas fa-code"></i> SLIIT IAS</a>
      </h1>
      <ul>
        {/* <li><a href="register.html">Register</a></li> */}
        <li><a href="login.html">Login</a></li>
      </ul>
    </nav>
  )
}

export default navbar;