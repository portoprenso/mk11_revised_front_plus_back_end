import React from 'react';
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { check } from '../helpers/functions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return{
        user: state.authReducer.user
    }
}

function PrivateRoute({ component: Component, user, ...rest }) {
    // const { currentUser } = useAuth()
    console.log(user)
    return (
        <Route
            {...rest}
            render={props => {
                return user ? <Component {...props} /> : <Redirect to="/login" />
            }}
        ></Route>
    );
}

export default connect(mapStateToProps)(PrivateRoute)