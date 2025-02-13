import { BrowserRouter } from "react-router-dom";
import { getApp } from "./utils/helper";

const App = () => {
  const CurrentApp = getApp();
  return <CurrentApp />;
};

export default App;
