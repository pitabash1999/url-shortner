import { BrowserRouter } from "react-router-dom";
import { getApp } from "./utils/helper";

const App = () => {
  const CurrentApp = getApp();
  return (
    <BrowserRouter>
      <CurrentApp />
    </BrowserRouter>
  );
};

export default App;
