import Head from "@components/head";
import Loading from "@components/loading";
import RouterWithPaths from "@components/RouterWithPaths";
import Login from "@manager/containers/account";
import constants from "@src/resourses/const";
import Menu from "@teacher/sidebar/Menu";
import React from "react";
import Loadable from "react-loadable";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,

  Switch
} from "react-router-dom";

function Load() {
  return <Loading></Loading>;
}

function Index(props) {
  const userApp = useSelector((state) => state.userApp);
  const routes = [
    {
      path: ["/teacher/dashboard"],
      component: Loadable({
        loader: () => import("@manager/containers/dashboard/ChartRender"),
        loading: Load,
      }),
      content:"Thống kê"
    },
    {
      path: ["/teacher/courses"],
      component: Loadable({
        loader: () => import("@manager/containers/course"),
        loading: Load,
      }),
    },
    {
      path: ["/teacher/subject"],
      component: Loadable({
        loader: () => import("@manager/containers/subject"),
        loading: Load,
      }),
    },
    {
      path: ["/teacher/class"],
      component: Loadable({
        loader: () => import("@teacher/containers/class"),
        loading: Load,
      }),
    },
    {
      path: ["/teacher/class/student"],
      component: Loadable({
        loader: () => import("@teacher/containers/class/student"),
        loading: Load,
      }),
    },
    {
      path: ["/teacher/schedule"],
      component: Loadable({
        loader: () => import("@teacher/containers/schedule"),
        loading: Load,
      }),
    },
    {
      path: ["/teacher/notification"],
      component: Loadable({
        loader: () => import("@manager/containers/notification/Notification"),
        loading: Load,
      }),
    },
    {
      path: ["/teacher/feedback"],
      component: Loadable({
        loader: () => import("@manager/containers/feedback/FeedBack"),
        loading: Load,
      }),
    },
    {
      path: ["/teacher/profile"],
      component: Loadable({
        loader: () => import("@manager/containers/profile"),
        loading: Load,
      }),
    },
    {
      path: ["/teacher/edit-profile"],
      component: Loadable({
        loader: () => import("@manager/containers/profile/edit"),
        loading: Load,
      }),
    },
    {
      path: ["/teacher/change-password"],
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
            <Head title="Giảng viên" role={constants.role.teacher}></Head>
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
