import { Route, Switch } from "react-router-dom";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Profile from "../layouts/Profile";
import Profiles from "../layouts/Profiles";
import Dashboard from "../layouts/dashboard/Dashboard";
import Alert from "../layouts/Alert";
import PrivateRoute from "../routing/PrivateRoute";
import CreateProfile from "../profile-forms/CreateProfile";
import EditProfile from "../profile-forms/EditProfile";
import AddExperience from "../profile-forms/AddExperience";
import AddEducation from "../profile-forms/AddEducation";
import Posts from "../layouts/posts/Posts";
import Post from "../layouts/Post/Post";
import NofFound from "../layouts/NofFound";

const Routes = () => {
  return (
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
        <Route component={NofFound} />
      </Switch>
    </div>
  );
};

export default Routes;
