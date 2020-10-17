import React from 'react';

import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";

import Layout from '../../layout/app';

import { DressmakerList, AddDressmaker, UpdateDressmaker } from './components';

export default function Dressmaker() {
  const { path } = useRouteMatch();
  return (
    <Layout>
      <Switch>
        <Route exact path={path}>
          <DressmakerList/>
        </Route>

        <Route path={`${path}/ajouter`}>
          <AddDressmaker />
        </Route>

        <Route path={`${path}/:id/modifier`}>
          <UpdateDressmaker />
        </Route>

        <Redirect to={path}/>
      </Switch>
    </Layout>
  );
}
