import React from 'react';

import { Link } from 'react-router-dom'; 



const AdminDashboard = () => {
  return (
  <section className='dashboard'>
  <div>Admin Dashboard Components</div>
  <div>
    
      
   
    <Link 
    className='btn moduleManagement' 
    to='/addModules'> </Link>
    
    
    </div>
  </section>
  
  );
};

export default AdminDashboard;
