import React, { useEffect } from 'react';
import { getInstructors, deleteInstructor } from '../../../actions/instructor';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import { setAlert } from '../../../actions/alert';
import '../Home/Home.css';

const InstructorView = ({
  getInstructors,
  deleteInstructor,
  instructor: { instructors },
  auth: { admin },
}) => {
  useEffect(() => {
    getInstructors();
  }, []);

  const deleteFromInstructor = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteInstructor(id);
        Swal.fire(
          'Deleted!',
          'Instructor account has been deleted.',
          'success'
        );
      }
    });
  };

  return (
    <div>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>Department</th>
            <th scope='col'>Username</th>
            <th scope='col'>Email</th>
            <th className='redcol' scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {instructors.map((instructorItem) => (
            <tr key={instructorItem.ID}>
              <td>{instructorItem.ID}</td>
              <td>{instructorItem.department}</td>
              <td>{instructorItem.userName}</td>
              <td>{instructorItem.email}</td>
              {(admin?.department === 'admin' ||
                admin?.department === instructorItem.department) && (
                <td>
                  <div style={{ paddingTop: '10px' }}></div>
                  <div style={{ paddingTop: '10px' }}>
                    <button
                      className='btn btn-danger'
                      onClick={() => deleteFromInstructor(instructorItem.ID)}
                    >
                      <i className='fas fa-trash'></i>
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => ({
  instructor: state.instructor,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getInstructors,
  setAlert,
  deleteInstructor,
})(InstructorView);
