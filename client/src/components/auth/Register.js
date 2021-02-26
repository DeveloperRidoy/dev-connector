import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from 'prop-types'
import { register } from '../../store/actions/auth';

// redux
import { connect } from 'react-redux';
import { setAlert } from '../../store/actions/alert'; 

const Register = ({setAlert, register, isAuthenticated}) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '', 
        password: '',
        password2: ''
    })
    
    const { name, email, password, password2 } = formData;
    
    const inputChangeHandler = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const registerUser = async (e) => {
        e.preventDefault();
      if (password !== password2) {
        setAlert('passwords do not match', 'danger', 5000);
        console.log('passwords do not match');
      } else {
        register({name, email, password});
      }
      
    }
    // REDIRECT to dashboard if already logged in 
    if(isAuthenticated){ return <Redirect to="/dashboard"/>}
  
    return (
      <div>
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Create Your Account
        </p>
        <form className="form" onSubmit={registerUser}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={inputChangeHandler}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              autoComplete="email"
              onChange={inputChangeHandler}
            />
            <small className="form-text">
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </small>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value={password}
              autoComplete="new-password"
              onChange={inputChangeHandler}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              minLength="6"
              value={password2}
              autoComplete="new-password"      
              onChange={inputChangeHandler}
            />
          </div>
          <input
            type="submit"
            className="btn btn-primary"
            value="Register"
          />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    );
}
   
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Register);