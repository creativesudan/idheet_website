import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const siteLoading = useSelector(state => state.app.siteLoading);
    console.log("auth", isAuthenticated);
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => {
            console.log("siteLoading", siteLoading);
            if (siteLoading && !isAuthenticated) {
                return <React.Fragment></React.Fragment>;
            } else if (!isAuthenticated) {
                return <Redirect to="/login" />;
            } else {
                return <Component {...props} />;
            }
        }} />
    );
};

export default PrivateRoute;