import Loading from "@components/loading";
import RouterWithPaths from "@components/RouterWithPaths";
import constants from "@src/resourses/const";
import React from "react";
import Loadable from "react-loadable";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Switch
} from "react-router-dom";
import Head from "../../../components/head";
import Menu from "../sidebar/Menu";
import Login from "./account";

function Load() {
  return <Loading></Loading>;
}

function Index(props) {
  const userApp = useSelector((state) => state.userApp);
  const routes = [
    {
      path: ["/manager/dashboard"],
      component: Loadable({
        loader: () => import("@manager/containers/dashboard/ChartRender"),
        loading: Load,
      }),
      content:"Thống kê"
    },
    {
      path: ["/manager/courses"],
      component: Loadable({
        loader: () => import("@manager/containers/course"),
        loading: Load,
      }),
    },
    {
      path: ["/manager/subject"],
      component: Loadable({
        loader: () => import("@manager/containers/subject"),
        loading: Load,
      }),
    },
    {
      path: ["/manager/health-facility"],
      component: Loadable({
        loader: () => import("@manager/containers/healthFacility"),
        loading: Load,
      }),
    },
    {
      path: ["/manager/place"],
      component: Loadable({
        loader: () => import("@manager/containers/place"),
        loading: Load,
      }),
    },
    {
      path: ["/manager/student"],
      component: Loadable({
        loader: () => import("@manager/containers/student/Student"),
        loading: Load,
      }),
    },
    {
      path: ["/manager/schedule"],
      component: Loadable({
        loader: () => import("@manager/containers/schedule"),
        loading: Load,
      }),
    },
    {
      path: ["/manager/result"],
      component: Loadable({
        loader: () => import("@manager/containers/result/StudyProcess"),
        loading: Load,
      }),
    },
    {
      path: ["/manager/users"],
      component: Loadable({
        loader: () => import("@manager/containers/users"),
        loading: Load,
      }),
    },
    {
      path: ["/manager/notification"],
      component: Loadable({
        loader: () => import("@manager/containers/notification/Notification"),
        loading: Load,
      }),
    },
    {
      path: ["/manager/feedback"],
      component: Loadable({
        loader: () => import("@manager/containers/feedback/FeedBack"),
        loading: Load,
      }),
    },
    {
      path: ["/manager/profile"],
      component: Loadable({
        loader: () => import("@manager/containers/profile"),
        loading: Load,
      }),
    },
    {
      path: ["/manager/edit-profile"],
      component: Loadable({
        loader: () => import("@manager/containers/profile/edit"),
        loading: Load,
      }),
    },
    {
      path: ["/manager/change-password"],
      component: Loadable({
        loader: () => import("@manager/containers/account/change-password"),
        loading: Load,
      }),
    },

  ];

  return (
    <>
      <Switch>
        <Router>
          <div>
            <Menu></Menu>
            <div className="container">
            <Head title="Quản trị hệ thống" role={constants.role.admin}></Head>
              {routes.map((route, key) => {
                if (route.component) {
                  return (
                    <RouterWithPaths
                      exact
                      key={key}
                      path={route.path}
                      render={(props) => <route.component {...props} />}
                    />
                  );
                }
                return null;
              })}
            </div>
          </div>
        </Router>
      </Switch>
      {!userApp.isLogin && <Redirect to={"/login"} component={Login}></Redirect>}
    </>
  );
}

export default Index;
