import { Link, Redirect } from "react-router-dom";
import { useState } from 'react';
import PropTypes from 'prop-types'
 
// redux
import { login } from "../../store/actions/auth";
import { connect } from "react-redux";

const Login = ({login, isAuthenticated}) => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const inputChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const loginUser = (e) => {
    e.preventDefault();
    login(email, password);
  };

  // REDIRECT to dashboard if logged in
  if (isAuthenticated) {return <Redirect to="/dashboard"/>}
  
    return (
      <div>
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Sign into Your Account
        </p>
        <form className="form" onSubmit={loginUser}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={inputChangeHandler}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={inputChangeHandler}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    ); 
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})
 
export default connect(mapStateToProps, {login})(Login);  