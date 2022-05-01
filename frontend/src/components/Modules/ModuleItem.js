import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { deleteModule } from '../../actions/modules_auth';


const ModuleItem = ({module,deleteModule}) => {
    const modules= module.map(mod =>(
        <tr key={mod._id}>
            <td>{mod.moduleName}</td>
            <td>{mod.ModuleID}</td>
            <td>{mod.specialization}</td>
            <td>{mod.year}</td>
            <td>{mod.semester}</td>
            <td> <button className='btn btn-danger' onClick={()=> deleteModule(mod._id)}>Delete </button></td>
            <td ><Link to ={`/EditModules/${mod.ModuleID}`}><button className='btn btn-danger'>Edit</button></Link></td>
        </tr>
    ))
  return (
    <Fragment>
        <h2>Module Management</h2>
        <table className='table'>

                <thead>
                  <tr>      

                <th>Module Name</th>
                <th className='hide-sm'>Module code</th>
                <th className='hide-sm'>specialization</th>
                <th className='hide-sm'>Year</th>
                <th className='hide-sm'>semester</th>
                <th>   </th>
                <th></th>
                
                
                
                </tr>

                </thead>
                <tbody>{modules}</tbody>

        </table>

    </Fragment>
  )
}

ModuleItem.propTypes = {
    module :PropTypes.array.isRequired,
    deleteModule:PropTypes.func.isRequired
}

export default connect(null,{deleteModule})(ModuleItem);