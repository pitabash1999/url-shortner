import { Route, Routes } from "react-router-dom";
import Shorturl from "./components/ShorturlPage/Shorturl";
import Navbar from "./components/Navbar/Navbar";
import LandingPage from "./components/LandingPage/LandingPage";
import Login from "./components/LoginPage/LogIn";
import Signup from "./components/SignupPage/SignUp";
import Urlpage from "./components/Urlpage/Urlpage";
import { Toaster } from "react-hot-toast";

const RoutesHub = () => {
  return (
    <>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/urlpage" element={<Urlpage />} />
      </Routes>
    </>
  );
};

export default RoutesHub;

export const SubDomainRoute = () => {
  return (
    <Routes>
      <Route path="/:url" element={<Shorturl />} />
    </Routes>
  );
};
