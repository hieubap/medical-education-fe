import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Loadable from "react-loadable";
import RouterWithPaths from "@components/RouterWithPaths";
import Menu from "@student/sidebar/Menu";
import { useSelector } from "react-redux";
import Loading from "@components/loading";
import Login from "@manager/containers/account";
import Head from "@components/head";
import constants from "@src/resourses/const";

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
      path: ["/student/subject"],
      component: Loadable({
        loader: () => import("@manager/containers/subject/Subject"),
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
