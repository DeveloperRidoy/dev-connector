import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addEducation } from "../../store/actions/profile";
import PropTypes from "prop-types";
import { useState } from "react";

const AddEducation = ({ addEducation, removeEducation, history}) => {

  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldOfStudy: "",
    from: "",
    to: "",
    description: "",
    current: false
  });
  const { school, degree, fieldOfStudy, current, from, to, description } = formData;
  const inputChangeHandler = (e) =>
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const formSubmit = (e) => {
    e.preventDefault();
    addEducation(formData);
    setFormData({
      school: "",
      degree: "",
      fieldOfStudy: "",
      from: "",
      to: "",
      description: "",
      current: false
    });
  };

  return (
    <div>
      <h1 className="large text-primary">Add Your Education</h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc
        that you have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={formSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            required
            value={school}
            onChange={inputChangeHandler}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            required
            value={degree}
            onChange={inputChangeHandler}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Field Of Study"
            name="fieldOfStudy"
            value={fieldOfStudy}
            onChange={inputChangeHandler}
            required
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
              value={current}
              onChange={() =>
                setFormData((prevState) => ({
                  ...prevState,
                  current: !prevState.current,
                }))
              }
            />{" "}
            Current School or Bootcamp
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={inputChangeHandler}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            value={description}
            onChange={inputChangeHandler}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <button className="btn btn-light" onClick={history.goBack}>Go Back</button>
      </form>
    </div>
  );
};
AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(AddEducation);
