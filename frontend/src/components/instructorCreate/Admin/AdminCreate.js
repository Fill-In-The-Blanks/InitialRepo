import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { addAdmin } from '../../../actions/instructor';
import PropTypes from 'prop-types';
import { setAlert } from '../../../actions/alert';
import emailjs from 'emailjs-com';
import { connect } from 'react-redux';
import '../Home/Home.css';

const AdminCreate = ({ addAdmin, admin: { admins }, auth: { admin } }) => {
  const [ID, setUserID] = useState('');
  const [email, setemail] = useState('');
  const [department, setDepartment] = useState('admin');
  const [userName, setusername] = useState('');
  const [password, setpassword] = useState('');
  const initialLogin = true;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const adminform = useRef();

  const createAdmin = () => {
    const formValue = {
      ID,
      email,
      userName,
      department,
      password,
      initialLogin,
    };
    addAdmin(formValue);
    emailjs
      .sendForm(
        'service_2yi5441',
        'template_3uq9jb9',
        adminform.current,
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

  const onSubmitAdmin = () => {
    createAdmin();
  };

  return (
    <div>
      <div className='create'>
        <form ref={adminform}>
          <label>UserID</label>
          <input
            name='ID'
            {...register('ID', { required: 'This is required' })}
            onChange={(e) => setUserID(e.target.value)}
          ></input>
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
          <label>Department</label>
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
          <button type='submit' onClick={handleSubmit(onSubmitAdmin)}>
            Create User
          </button>
        </form>
      </div>
    </div>
  );
};

AdminCreate.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  admin: state.admin,
});

export default connect(mapStateToProps, {
  addAdmin,
  setAlert,
})(AdminCreate);
