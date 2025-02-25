import React, {useContext} from 'react';
import {AuthContext} from "../context/authentication_context";

const withAuth = (WrappedComponent) => {
    return function WithAuth(props) {
        const [auth, setAuth] = useContext(AuthContext); // Use context to get auth and setAuth
        return <WrappedComponent {...props} auth={auth} setAuth={setAuth} />;
    };
};

export default withAuth;
