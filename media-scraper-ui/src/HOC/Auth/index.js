import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { userService } from './../../services/user.service';

export default function Auth({ path, component: Component }) {
    return (
        <Route path={path} render={props => {
            const isTokenExpired = userService.isTokenExpired();
            console.log('EXPORE: ',isTokenExpired);
            if (!isTokenExpired) {
                return <Component {...props} />
            }
            return <Redirect to="/sign-in" />
        }} />
    )
}
