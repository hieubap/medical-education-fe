import React from 'react';
import { Switch, Route } from 'react-router-dom';
const index = ({ path, ...rest }) => (
    <Switch>
        {typeof path === 'string' ? <Route path={path} {...rest} /> :
            path.map((item, index) => (
                <Route path={item} {...rest} key={index} />
            ))}
    </Switch>
)
export default index;

