import React from 'react';

import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";

import Layout from '../../layout/app';

import { ArticleList, AddArticle, UpdateArticle, ArticleDetail } from './components';

export default function Product() {
  const { path } = useRouteMatch();
  return (
    <Layout>
      <Switch>
        <Route exact path={path}>
          <ArticleList/>
        </Route>

        <Route path={`${path}/ajouter`}>
          <AddArticle />
        </Route>

        <Route path={`${path}/:id/modifier`}>
          <UpdateArticle />
        </Route>

        <Route path={`${path}/:id/detail`}>
          <ArticleDetail />
        </Route>

        <Redirect to={path}/>
      </Switch>
    </Layout>
  );
}
