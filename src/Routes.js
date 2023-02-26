import React from 'react';
import { Route, Switch } from 'react-router-dom';




function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={HomeComponent} />
        </Switch>
    );
}

export default Routes;