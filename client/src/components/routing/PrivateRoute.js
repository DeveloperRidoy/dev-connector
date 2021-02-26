
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({component: Component, isAuthenticated, loading, ...rest}) => { 
    return (
        <Route {...rest} render={props => (
            !loading && (!isAuthenticated || isAuthenticated === null)
                ? <Redirect to="/login"/>
                : <Component {...props}/>
        )}/>
    )
}
                      
PrivateRoute.propTypess = {
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
})

export default connect(mapStateToProps)(PrivateRoute)    