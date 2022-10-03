import React, { useEffect } from "react";
import { getInstructors, deleteInstructor } from "../../../actions/instructor";

import { connect } from "react-redux";
import { setAlert } from "../../../actions/alert";
import "../Home/Home.css";

const InstructorView = ({
  getInstructors,
  deleteInstructor,
  instructor: { instructors },
}) => {
  useEffect(() => {
    getInstructors();
  }, []);

  const deleteFromInstructor = (id) => {
    deleteInstructor(id);
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th className="redcol" scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {instructors.map((inst) => (
            <tr key={inst.ID}>
              <td>{inst.ID}</td>
              <td>{inst.userName}</td>
              <td>{inst.email}</td>
              <td>
                <div style={{ paddingTop: "10px" }}></div>
                <div style={{ paddingTop: "10px" }}>
                  <button
                    className="btn"
                    style={{ backgroundColor: "#ff726f", fontWeight: "bold" }}
                    onClick={() => deleteFromInstructor(inst.ID)}
                  >
                    Delete
                  </button>
                </div>
              </td>
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
