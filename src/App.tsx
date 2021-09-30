import "./App.scss";
import { useTranslation } from "react-i18next";
import Modal from "./ui-components/modal/Modal";
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from "./components/sidebar/Sidebar";
import { useMediaPredicate } from "react-media-hook";
import NotFound from "./components/not-found/NotFound";
import { CircularProgress, Tooltip } from "@mui/material";
import React, { Suspense, useEffect, useState } from "react";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import sidebarStyles from './components/sidebar/Sidebar.module.scss';
import { Route, Redirect, Switch, useLocation } from "react-router";
import * as mainUtil from './utils/main-util';

const UsersLazyComponent = React.lazy(() => import('./components/users/Users'));
const EventsLazyComponent = React.lazy(() => import('./components/events/Events'));
const OverviewLazyComponent = React.lazy(() => import('./components/overview/Overview'));

const App = () => {
  const location = useLocation();
  const { t } = useTranslation('index');
  const [sidebarOpened, setSidebaredOpen] = useState(false);
  const biggerThan1440 = useMediaPredicate("(min-width: 1440px)");

  const onToggleSidebar = () => {
    setSidebaredOpen(!sidebarOpened);
  }

  useEffect(() => {
    setSidebaredOpen(false || !biggerThan1440);
  }, [location.pathname, biggerThan1440]);

  return (
    <>
      {sidebarOpened && <div id="container__sidebar--overlay" onClick={onToggleSidebar}></div>}

      <div className="container">
        <div id="container__sidebar--small">
          <span onClick={onToggleSidebar}>
            {!sidebarOpened && <Tooltip title={t<string>('main.openMenu')}>
              <MenuIcon />
            </Tooltip>}

            {sidebarOpened && <Tooltip title={t<string>('main.closeMenu')}>
              <HighlightOffIcon />
            </Tooltip>}
          </span>
        </div>

        <div id="container__sidebar" className={sidebarOpened ? sidebarStyles.mobileSidebar : ''}>
          <Sidebar></Sidebar>
        </div>
        <div id="container__content">
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
