import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile, removeExperience, removeEducation } from "../../../store/actions/profile";
import { deleteAccount, loadUser } from '../../../store/actions/auth';
import PropTypes from 'prop-types';
import Spinner from "../Spinner";
import {v4 as uuid } from 'uuid';      
import setAuthToken from "../../../utils/setAuthToken";
import DashboardActions from "./DashboardActions";
import store from "../../../store/store";

const Dashboard = ({ getCurrentProfile, removeExperience, removeEducation, deleteAccount, auth: { user }, profile: { profile, loading } }) => { 
  
  // set axios x-auth-token from localStorage
  if (localStorage.token) { setAuthToken(localStorage.token) };

  // get current user and profile
  useEffect(() => {
      store.dispatch(loadUser);
      getCurrentProfile();   
  }, [])

  return loading ? (
    <Spinner />
  ) : user === null ? (
    <div>please login to see this page</div>
  ) : profile === null ? (
    <div>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user.name}
      </p>
      <h4>You have not yet set up a profile, please add some information</h4>
      <Link to="/create-profile" className="btn btn-primary my-1 ">
        Create Profile
      </Link>
      <div className="my-2">
        <button className="btn btn-danger" onClick={deleteAccount}>
          <i className="fas fa-user-minus"></i>
          Delete My Account
        </button>
      </div>
    </div>
  ) : (
    <div>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user.name}
      </p>
      <DashboardActions />
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {profile.experience.map((exp) => (
            <tr key={exp._id}>
              <td>{exp.company}</td>
              <td className="hide-sm">{exp.title}</td>
              <td className="hide-sm">
                {exp.from} to {exp.to === null ? "current" : exp.to}
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => removeExperience(exp._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {profile.education.map((edu) => (
            <tr key={uuid()}>
              <td>{edu.school}</td>
              <td className="hide-sm">{edu.degree}</td>
              <td className="hide-sm">
                {edu.from} to {edu.current ? "current" : edu.to}
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => removeEducation(edu._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="my-2">
        <button className="btn btn-danger" onClick={deleteAccount}>
          <i className="fas fa-user-minus"></i>
          Delete My Account
        </button>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  removeExperience: PropTypes.func.isRequired,
  removeEducation: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, {getCurrentProfile, removeExperience, removeEducation, deleteAccount})(Dashboard)         