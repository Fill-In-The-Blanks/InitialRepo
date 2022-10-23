import React, { useState, useRef, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  getAdmins,
  updateAdminByID,
  getAdmin,
} from "../../../actions/instructor";

import { setAlert } from "../../../actions/alert";
import emailjs from "emailjs-com";
import { connect } from "react-redux";
import "../Home/Home.css";

const AdminUpdate = ({
  updateAdminByID,
  getAdmins,
  getAdmin,
  admin: { admins, singleadmin },
}) => {
  useEffect(() => {
    getAdmins();
  }, []);

  const [ID, setUserID] = useState("");
  const [email, setemail] = useState("");
  const [department, setDepartment] = useState("admin");
  const [userName, setusername] = useState("");
  const [password, setpassword] = useState("");
  const initialLogin = false;

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const updateAdminform = useRef();

  const showUserData = (value) => {
    setUserID(value);
    getAdmin(value);
  };

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
    navigate("/UserManagement");
    emailjs
      .sendForm(
        "service_x1e9iqd", //service
        "template_7p1ojth", //template
        updateAdminform.current,
        "37ZncN1mGyvZ9H5qmP" //public key emailjs
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
      <div className="create">
        <form ref={updateAdminform} id="AdminsUpdate">
          <label>Select UserID</label>
          <select
            name="ID"
            id="ID"
            style={{ width: "100%" }}
            onChange={(e) => showUserData(e.target.value)}
          >
            {admins.map((admin) => (
              <option value={admin.ID} key={admin.ID}>
                {admin.ID}
              </option>
            ))}
          </select>
          <p>{errors.ID?.message}</p>
          <br />
          <label>Email</label>
          {singleadmin.map((admin) => (
            <input
              name="email"
              type="email"
              placeholder={admin.email}
              {...register("email", { required: "This is required" })}
              onChange={(e) => setemail(e.target.value)}
            ></input>
          ))}
          <p>{errors.email?.message}</p>
          <br />
          <label>Username</label>
          {singleadmin.map((admin) => (
            <input
              name="userName"
              placeholder={admin.userName}
              {...register("userName", { required: "This is required" })}
              onChange={(e) => setusername(e.target.value)}
            ></input>
          ))}
          <p>{errors.userName?.message}</p>
          <br />
          <label>Departments</label>
          {singleadmin.map((admin) => (
            <select
              name="department"
              id="department"
              style={{ width: "100%" }}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="">{admin.department}</option>
              <option value="CSSE">
                Computer Science & Software Engineering (CSSE)
              </option>
              <option value="IT">Information Technology (IT)</option>
              <option value="CSNE">Computer Systems Engineering (CSE)</option>
            </select>
          ))}
          <p>{errors.department?.message}</p>
          <br />
          <label>Password</label>
          <input
            name="password"
            type="password"
            {...register("password", {
              required: "This is required",
              minLength: { value: 8, message: "Need atleast 8 characters" },
              maxLength: { value: 20, message: "Max characters are 20" },
            })}
            onChange={(e) => setpassword(e.target.value)}
          ></input>
          <p>{errors.password?.message}</p>
          <br />
          <button type="submit" onClick={handleSubmit(updateAdmin)}>
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  admin: state.admin,
});

export default connect(mapStateToProps, {
  updateAdminByID,
  getAdmins,
  getAdmin,
  setAlert,
})(AdminUpdate);
