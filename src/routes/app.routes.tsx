import React from 'react';
import { Switch, Route } from 'react-router-dom'


import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard';
import List from '../pages/Lists';

const AppRoute: React.FC = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/list/:type" exact component={List} />
            </Switch>
        </Layout>
    );
}

export default AppRoute;
