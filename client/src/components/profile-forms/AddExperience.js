
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addExperience } from '../../store/actions/profile';
import PropTypes from 'prop-types';
import { useState } from "react";
 
const AddExperience = ({ addExperience }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    current: false,  
    from: '',
    to: '',
    description: ''
  })
  const {title, company, location, current, from, to, description} = formData
  const inputChangeHandler = e => setFormData(prevState => ({ ...prevState, [e.target.name]: e.target.value }));


  const formSubmit = e => {
    e.preventDefault();
    addExperience(formData);
    setFormData({
      title: "",
      company: "",
      location: "",
      current: false,
      from: "",
      to: "",
      description: "",
    });
  }
 
  return (
    <div>
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={formSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            required
            value={title}
            onChange={inputChangeHandler} 
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            required
            value={company}
            onChange={inputChangeHandler}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={inputChangeHandler}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={inputChangeHandler}
            required
          />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              checked={current}
              onChange={() =>
                setFormData((prevState) => ({
                  ...prevState,
                  current: !prevState.current,
                }))
              }
            />{" "}
            Current Job
          </p>
        </div>
        {!current && (
          <div className="form-group">
            <h4>To Date</h4>
            <input
              type="date"
              name="to"
              value={to}
              onChange={inputChangeHandler}
              disabled={current}
            />
          </div>
        )}
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description}
            onChange={inputChangeHandler}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </div>
  );
} 
AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};



export default connect(null, {addExperience })(AddExperience);
