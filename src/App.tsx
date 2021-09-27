import "./App.scss";
import React, { Suspense } from "react";
import Users from "./components/users/Users";
import Modal from "./ui-components/modal/Modal";
import { CircularProgress } from "@mui/material";
import Sidebar from "./components/sidebar/Sidebar";
import { Route, Redirect, Switch } from "react-router";
import NotFound from "./components/not-found/NotFound";
import Statistics from "./components/statistics/Statistics";
import * as mainUtil from './utils/main-util';

const EventsLazyComponent = React.lazy(() => import('./components/events/Events'));

const App = () => {
  return (
    <>
      <div className="container">
        <div className="container__sidebar">
          <Sidebar></Sidebar>
        </div>
        <div className="container__content">
          <Switch>
            <Route path="/" exact>
              <Redirect to="/overview"></Redirect>
            </Route>

            <Route path="/overview" exact>
              <Statistics></Statistics>
            </Route>

            <Route path="/users" exact>
              <Users></Users>
            </Route>

            <Route path="/events" exact>
              <Suspense fallback={
                <Modal show={true} color={mainUtil.BLUE_COLOR}>
                  <CircularProgress color="inherit" />
                </Modal>}>
                <EventsLazyComponent />
              </Suspense>
            </Route>

            <Route path="*">
              <NotFound></NotFound>
            </Route>
          </Switch>
        </div>
      </div>
    </>
  );
};

export default App;
