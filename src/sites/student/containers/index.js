import Head from "@components/head";
import Loading from "@components/loading";
import RouterWithPaths from "@components/RouterWithPaths";
import Login from "@manager/containers/account";
import constants from "@src/resourses/const";
import Menu from "@student/sidebar/Menu";
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
      path: ["/student/dashboard"],
      component: Loadable({
        loader: () => import("@manager/containers/dashboard/ChartRender"),
        loading: Load,
      }),
      content:"Thống kê"
    },
    {
      path: ["/student/courses"],
      component: Loadable({
        loader: () => import("@manager/containers/course/Course"),
        loading: Load,
      }),
    },
    {
      path: ["/student/class"],
      component: Loadable({
        loader: () => import("@manager/containers/class/Class"),
        loading: Load,
      }),
    },
    {
      path: ["/student/register-course"],
      component: Loadable({
        loader: () =>
          import("@manager/containers/register-course/RegistryCourse"),
        loading: Load,
      }),
    },
    {
      path: ["/student/register-class"],
      component: Loadable({
        loader: () =>
          import("@manager/containers/register-class/RegisterClass"),
        loading: Load,
      }),
    },
    {
      path: ["/student/schedule"],
      component: Loadable({
        loader: () => import("@manager/containers/schedule/Schedule"),
        loading: Load,
      }),
    },
    {
      path: ["/student/result"],
      component: Loadable({
        loader: () => import("@manager/containers/result/StudyProcess"),
        loading: Load,
      }),
    },
    {
      path: ["/student/notification"],
      component: Loadable({
        loader: () => import("@manager/containers/notification/Notification"),
        loading: Load,
      }),
    },
    {
      path: ["/student/feedback"],
      component: Loadable({
        loader: () => import("@manager/containers/feedback/FeedBack"),
        loading: Load,
      }),
    },
    {
      path: ["/student/profile"],
      component: Loadable({
        loader: () => import("@manager/containers/profile"),
        loading: Load,
      }),
    },
    {
      path: ["/student/edit-profile"],
      component: Loadable({
        loader: () => import("@manager/containers/profile/edit"),
        loading: Load,
      }),
    },
    {
      path: ["/student/change-password"],
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
            <Head title="Học viên" role={constants.role.student}></Head>
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
