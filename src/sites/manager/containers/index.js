import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Loadable from "react-loadable";
import RouterWithPaths from "@components/RouterWithPaths";
import Menu from "../sidebar/Menu";
import { useSelector } from "react-redux";
import Loading from "@components/loading";
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
    },
    {
      path: ["/manager/courses"],
      component: Loadable({
        loader: () => import("@manager/containers/course/Course"),
        loading: Load,
      }),
    },
    {
      path: ["/manager/subject"],
      component: Loadable({
        loader: () => import("@manager/containers/subject/Subject"),
        loading: Load,
      }),
    },
    {
      path: ["/manager/class"],
      component: Loadable({
        loader: () => import("@manager/containers/class/Class"),
        loading: Load,
      }),
    },
    {
      path: ["/manager/place"],
      component: Loadable({
        loader: () => import("@manager/containers/place/Place"),
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
      path: ["/manager/course-register"],
      component: Loadable({
        loader: () =>
          import("@manager/containers/course-register/RegistryCourse"),
        loading: Load,
      }),
    },
    {
      path: ["/manager/class-register"],
      component: Loadable({
        loader: () =>
          import("@manager/containers/class-register/RegisterClass"),
        loading: Load,
      }),
    },
    {
      path: ["/manager/schedule"],
      component: Loadable({
        loader: () => import("@manager/containers/schedule/Schedule"),
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
        loader: () => import("@manager/containers/users/User"),
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
  ];

  return (
    <>
    {console.log(userApp)}
      <Switch>
        <Router>
          <div>
            <Menu></Menu>
            <div className="container">
              {routes.map((route, key) => {
                if (route.component) {
                  console.log(route.path);
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
