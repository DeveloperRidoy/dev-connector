import './App.css';
import { useEffect } from 'react';
import Landing from './components/layouts/Landing';
import Navbar from './components/layouts/Navbar';
import Dashboard from './components/layouts/dashboard/Dashboard';
import { BrowserRouter as Router, Route, Switch }  from 'react-router-dom'
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Profile from './components/layouts/Profile';
import Profiles from './components/layouts/Profiles';
import { loadUser } from './store/actions/auth';
import setAuthToken from './utils/setAuthToken';
import Alert from "./components/layouts/Alert";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import removeAuthToken from "./utils/removeAuthToken";
// redux
import { Provider } from 'react-redux';
import store from './store/store';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Posts from './components/layouts/posts/Posts';
import Post from './components/layouts/Post/Post';
import NofFound from './components/layouts/NofFound';


// set x-auth-token in axios from localStorage
if (localStorage.token) setAuthToken(localStorage.token);
 
const App = () => {

  useEffect(() => store.dispatch(loadUser), []); 
 
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  } else {
    removeAuthToken()
  }

  
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <div className="container">
          <Alert />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profiles" component={Profiles} />
            <PrivateRoute exact path="/profile/:userID" component={Profile} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/create-profile" component={CreateProfile} />
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
            <PrivateRoute exact path="/add-experience" component={AddExperience} />
            <PrivateRoute exact path="/add-education" component={AddEducation} />
            <PrivateRoute exact path="/post/:postID" component={Post} />
            <PrivateRoute exact path="/posts" component={Posts} /> 
            <Route component={NofFound}/>
          </Switch> 
        </div>
      </Router>
    </Provider>
  );
}



export default App;
                   