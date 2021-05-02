import React from "react";
import Loadable from "react-loadable";
import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import constants from '@src/resourses/const';
import dataCache from '@components/data-cache-provider'

function Loading() {
  return <div className="loader" id="loader"></div>;
}

const routes = [
  {
    path: "/",
    component: Loadable({
      loader: () => import("@manager/containers/"),
      loading: Loading,
    }),
  },
  {
    path: "/manager",
    component: Loadable({
      loader: () => import("@manager/containers") ,
      loading: Loading,
    }),
  },
  {
    path: "/manager/:function",
    component: Loadable({
      loader: () => import("@manager/containers"),
      loading: Loading,
    }),
  },
  {
    path: "/teacher",
    component: Loadable({
      loader: () => import("@teacher/containers"),
      loading: Loading,
    }),
  },
  {
    path: "/teacher/:function",
    component: Loadable({
      loader: () => import("@teacher/containers"),
      loading: Loading,
    }),
  },
  {
    path: "/student",
    component: Loadable({
      loader: () => import("@student/containers"),
      loading: Loading,
    }),
  },
  {
    path: "/student/:function",
    component: Loadable({
      loader: () => import("@student/containers"),
      loading: Loading,
    }),
  },
  {
    path: "/login",
    component: Loadable({
      loader: () => import("@manager/containers/account"),
      loading: Loading,
    }),
  },
  {
    path: "/register",
    component: Loadable({
      loader: () => import("@manager/containers/account/register"),
      loading: Loading,
    }),
  },
];

function Main() {

  const dispatch = useDispatch();
  dispatch({
    type: constants.action.action_user_login,
    value: dataCache.read('','access'),
  });
  
  return (
    <BrowserRouter>
      <div>
        <BrowserRouter>
          <div className="app">
            <Switch>
              {routes.map((route, key) => {
                if (route.component) {
                  return (
                    <Route
                      exact
                      key={key}
                      path={route.path}
                      render={(props) => <route.component {...props} />}
                    />
                  );
                }
                return null;
              })}
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    </BrowserRouter>
  );
}

export default Main;
