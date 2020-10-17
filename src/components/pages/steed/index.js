import React from 'react';

import Layout from '../../layout/app';

import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";

import { SteedList, AddSteed, UpdateSteed } from './components';

export default function Steed() {
  const { path } = useRouteMatch();
  return (
    <Layout>
      <Switch>
        <Route exact path={path}>
          <SteedList/>
        </Route>

        <Route path={`${path}/ajouter`}>
          <AddSteed />
        </Route>

        <Route path={`${path}/:id/modifier`}>
          <UpdateSteed />
        </Route>

        <Redirect to={path}/>
      </Switch>
    </Layout>
  );
}
