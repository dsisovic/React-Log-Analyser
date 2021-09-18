import "./App.scss";
import Sidebar from "./components/sidebar/Sidebar";
import Statistics from "./components/statistics/Statistics";

const App = () => {
  return (
    <>
      <div className="container">
        <div className="container__sidebar">
          <Sidebar></Sidebar>
        </div>
        <div className="container__content">
          <Statistics></Statistics>
        </div>
      </div>
    </>
  );
};

export default App;
