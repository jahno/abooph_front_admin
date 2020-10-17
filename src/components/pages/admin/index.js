import React from 'react';

import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";

import Layout from '../../layout/app';

import { AdminList, AddAdmin, UpdateAdmin } from './components';

export default function Admin() {
  const { path } = useRouteMatch();
  return (
    <Layout>
      <Switch>
        <Route exact path={path}>
          <AdminList/>
        </Route>

        <Route path={`${path}/ajouter`}>
          <AddAdmin />
        </Route>

        <Route path={`${path}/:id/modifier`}>
          <UpdateAdmin />
        </Route>

        <Redirect to={path}/>
      </Switch>
    </Layout>
  );
}
