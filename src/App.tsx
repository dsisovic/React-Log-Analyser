import "./App.scss";
import React, { Suspense } from "react";
import Modal from "./ui-components/modal/Modal";
import { CircularProgress } from "@mui/material";
import Sidebar from "./components/sidebar/Sidebar";
import { Route, Redirect, Switch } from "react-router";
import NotFound from "./components/not-found/NotFound";
import * as mainUtil from './utils/main-util';

const UsersLazyComponent = React.lazy(() => import('./components/users/Users'));
const EventsLazyComponent = React.lazy(() => import('./components/events/Events'));
const OverviewLazyComponent = React.lazy(() => import('./components/overview/Overview'));

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
              <Suspense fallback={
                <Modal show={true} color={mainUtil.BLUE_COLOR}>
                  <CircularProgress color="inherit" />
                </Modal>}>
                <OverviewLazyComponent />
              </Suspense>
            </Route>

            <Route path="/users" exact>
              <Suspense fallback={
                <Modal show={true} color={mainUtil.BLUE_COLOR}>
                  <CircularProgress color="inherit" />
                </Modal>}>
                <UsersLazyComponent />
              </Suspense>
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
