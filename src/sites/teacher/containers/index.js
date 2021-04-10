import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Loadable from "react-loadable";
import RouterWithPaths from "@components/RouterWithPaths";
import Menu from "@teacher/sidebar/Menu";
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
        loader: () => import("@manager/containers/course/Course"),
        loading: Load,
      }),
    },
    {
      path: ["/teacher/subject"],
      component: Loadable({
        loader: () => import("@manager/containers/subject/Subject"),
        loading: Load,
      }),
    },
    {
      path: ["/teacher/class"],
      component: Loadable({
        loader: () => import("@manager/containers/class/Class"),
        loading: Load,
      }),
    },
    {
      path: ["/teacher/schedule"],
      component: Loadable({
        loader: () => import("@manager/containers/schedule/Schedule"),
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
