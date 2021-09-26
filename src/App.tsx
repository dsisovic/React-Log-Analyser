import "./App.scss";
import Users from "./components/users/Users";
import Events from "./components/events/Events";
import Sidebar from "./components/sidebar/Sidebar";
import { Route, Redirect, Switch } from "react-router";
import Statistics from "./components/statistics/Statistics";

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

            <Route path="*">
            <Events></Events>
            </Route>
          </Switch>
        </div>
      </div>
    </>
  );
};

export default App;
