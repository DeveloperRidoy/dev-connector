import './App.css';
import Landing from './components/layouts/Landing';
import Navbar from './components/layouts/Navbar';
import { BrowserRouter as Router, Route, Switch }  from 'react-router-dom'

import Routes from './components/routing/Routes';

// redux store
import { Provider } from 'react-redux';
import store from './store/store';
import { loadUser } from "./store/actions/auth";
import setAuthToken from "./utils/setAuthToken";
import removeAuthToken from "./utils/removeAuthToken";


// set x-auth-token in axios from localStorage
if (localStorage.token) setAuthToken(localStorage.token);
 
const App = () => {
    
  if (localStorage.token) {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser);
  } else {
    removeAuthToken()
  }
  
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route component={Routes}/>
        </Switch>
      </Router>
    </Provider>
  );
}



export default App;
                   