import { Route, Routes } from "react-router-dom";
import Shorturl from "./components/ShorturlPage/Shorturl";
import Navbar from "./components/Navbar/Navbar";
import LandingPage from "./components/LandingPage/LandingPage";
import Login from "./components/LoginPage/LogIn";
import Signup from "./components/SignupPage/SignUp";
import Urlpage from "./components/Urlpage/Urlpage";
import { Toaster } from "react-hot-toast";

const RoutesHub = () => {
  const hideNav = location.pathname.startsWith("/s");
  return (
    <>
      <Toaster />
      {!hideNav && <Navbar />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/urlpage" element={<Urlpage />} />
        <Route path="/s/:url" element={<Shorturl />} />
      </Routes>
    </>
  );
};

export default RoutesHub;
