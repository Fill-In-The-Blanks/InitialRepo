import React, { Fragment, useState } from 'react';

import { connect } from 'react-redux';
import { Venue} from '../../actions/venues';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const AddVenue = ({ Venue }) => {
    const [formData, setFormData] = useState({
        vName:'',
        vID:'',
        type:'',
        size:'',
        floor:'',
        faculty:''
    });
  const { vName,vID,type,size,floor,faculty} = formData;
  const onchange = (e) =>
  setFormData({ ...formData, [e.target.name]: e.target.value });
    const onsubmit = async (e) => {
        e.preventDefault();
        
        Venue(formData);
      };

      return (
        <Fragment>
          <section className='container container-margin-top-override'>
            {/* <h1 className='large text-primary'>Module Management</h1> */}
            <p className='lead'>Add Venues</p>
            <form className='form' onSubmit={(e) => onsubmit(e)}>
              <div className='form-group'>
                Venue Name
                <small className='form-text'>
                  Will be rejected if venue already exists
                </small>
                <input
                  type='text'
                  placeholder='Name'
                  name='vName'
                  value={vName}
                  onChange={(e) => onchange(e)}
                />
              </div>
              <div className='form-group'>
                Venue ID
                <small className='form-text'>
                  Will be rejected if venue already exists
                </small>
                <input
                  type='text'
                  placeholder='venue ID'
                  name='vID'
                  value={vID}
                  onChange={(e) => onchange(e)}
                />
              </div>
              <div className='form-group'>
                type
              
                <select
                  name='type'
                  value={type}
                  onChange={(e) => onchange(e)}
                >
                  <option value='0'>* Select the type</option>
                  <option value='Lecture Hall'>Lecture Hall</option>
                  <option value='Auditorium'>Auditorium</option>
                  <option value='Lab'>Lab</option>
                 
                </select>
              </div>
              <div className='form-group'>
                size
                <input
                  type='text'
                  placeholder='Size'
                  name='size'
                  value={size}
                  onChange={(e) => onchange(e)}
                />
                
              </div>
              
              <div className='form-group'>
                Floor
                
                <input
                  type='text'
                  placeholder='floor'
                  name='floor'
                  value={floor}
                  onChange={(e) => onchange(e)}
                />
              </div>
              <div className='form-group'>
                Faculty
              
                <select
                  name='faculty'
                  value={faculty}
                  onChange={(e) => onchange(e)}
                >
                  <option value='0'>* Select the Faculty</option>
                  <option value='Faculty Of Computing'>Faculty Of Computing</option>
                  <option value='Faculty of Engineering'>Faculty of Engineering</option>
                  <option value='Faculty of Business'>Faculty of Business</option>
                  <option value='Faculty of Humanities and Sciences'>Faculty of Humanities and Sciences</option>
                 
                 
                </select>
              </div>
              <input type='submit' className='btn btn-primary' value='Confirm' />
              
                <input type='reset' className='btn btn-primary' value='Cancel' />
            
            </form>
          </section>
        </Fragment>
      );
    };
    AddVenue.propTypes = {
        Venue: PropTypes.func.isRequired,
      };
      
      export default connect(null, { Venue })(AddVenue);
      