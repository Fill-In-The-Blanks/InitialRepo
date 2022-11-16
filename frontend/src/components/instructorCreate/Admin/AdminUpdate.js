import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getAdmins, updateAdminByID } from '../../../actions/instructor';
import PropTypes from 'prop-types';
import { setAlert } from '../../../actions/alert';
import emailjs from 'emailjs-com';
import { connect } from 'react-redux';
import '../Home/Home.css';

const AdminUpdate = ({
  updateAdminByID,
  getAdmins,
  admin: { admins },
  auth: { admin },
}) => {
  useEffect(() => {
    getAdmins();
  }, []);

  const [ID, setUserID] = useState('');
  const [email, setemail] = useState('');
  const [department, setDepartment] = useState('');
  const [userName, setusername] = useState('');
  const [password, setpassword] = useState('');
  const initialLogin = false;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const updateAdminform = useRef();

  const updateAdmin = () => {
    const UpdatedAdminformValue = {
      ID,
      email,
      userName,
      department,
      password,
      initialLogin,
    };
    console.log(UpdatedAdminformValue);
    updateAdminByID(UpdatedAdminformValue.ID, UpdatedAdminformValue);
    emailjs
      .sendForm(
        'service_2yi5441',
        'template_3uq9jb9',
        updateAdminform.current,
        '3yiSsWex126MEwSd2'
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div>
      <div className='create'>
        <form ref={updateAdminform} id='AdminsUpdate'>
          <label>Select UserID</label>
          <select
            name='ID'
            id='ID'
            style={{ width: '100%' }}
            onChange={(e) => setUserID(e.target.value)}
          >
            <option value=''></option>
            {admins.map((adminItem) => {
              if (admin?.department === 'admin') {
                return (
                  <option value={adminItem.ID} key={adminItem.ID}>
                    {adminItem.ID}
                  </option>
                );
              } else if (adminItem.department === admin?.department) {
                return (
                  <option value={adminItem.ID} key={adminItem.ID}>
                    {adminItem.ID}
                  </option>
                );
              }
            })}
          </select>
          <p>{errors.ID?.message}</p>
          <br />
          <label>Email</label>
          <input
            name='email'
            type='email'
            {...register('email', { required: 'This is required' })}
            onChange={(e) => setemail(e.target.value)}
          ></input>
          <p>{errors.email?.message}</p>
          <br />
          <label>Username</label>
          <input
            name='userName'
            {...register('userName', { required: 'This is required' })}
            onChange={(e) => setusername(e.target.value)}
          ></input>
          <p>{errors.userName?.message}</p>
          <br />
          <label>Departments</label>
          <select
            name='department'
            id='department'
            style={{ width: '100%' }}
            onChange={(e) => setDepartment(e.target.value)}
          >
            {/* If coordinator is an FOC admin then render admin option */}
            {admin?.department === 'admin' && (
              <option value='admin'>FOC Admin</option>
            )}
            {/* If coordinator is of CSSE or is a FOC admin then render CSSE option */}
            {(admin?.department === 'CSSE' ||
              admin?.department === 'admin') && (
              <option value='CSSE'>
                Computer Science & Software Engineering (CSSE)
              </option>
            )}
            {/* If coordinator is of IT or is a FOC admin then render IT option */}
            {(admin?.department === 'IT' || admin?.department === 'admin') && (
              <option value='IT'>Information Technology (IT)</option>
            )}
            {/* If coordinator is of CSE or is a FOC admin then render CSE option */}
            {(admin?.department === 'CSE' || admin?.department === 'admin') && (
              <option value='CSE'>Computer Systems Engineering (CSE)</option>
            )}
          </select>
          <p>{errors.department?.message}</p>
          <br />
          <label>Password</label>
          <input
            name='password'
            type='password'
            {...register('password', {
              required: 'This is required',
              minLength: { value: 8, message: 'Need atleast 8 characters' },
              maxLength: { value: 20, message: 'Max characters are 20' },
            })}
            onChange={(e) => setpassword(e.target.value)}
          ></input>
          <p>{errors.password?.message}</p>
          <br />
          <button type='submit' onClick={handleSubmit(updateAdmin)}>
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};

AdminUpdate.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  admin: state.admin,
});

export default connect(mapStateToProps, {
  updateAdminByID,
  getAdmins,
  setAlert,
})(AdminUpdate);
