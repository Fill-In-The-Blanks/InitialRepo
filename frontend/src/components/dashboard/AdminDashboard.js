import React from 'react';

import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
  <section className='dashboard'>
  <div>Admin Dashboard Components
    <div className='buttons'>
     <Link to='/addmodules' className='btn btn-light'>
              Add Module
    </Link>
    </div>
    </div>
  </section>
  
  );
};

export default AdminDashboard;
