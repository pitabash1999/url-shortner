import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { api } from "../../Baseurl/Baseurl";
import { useContextApi } from "../../store/ContextProvider";
import Urlpage from "../Urlpage/Urlpage";

const Login = () => {
  const { setToken, token } = useContextApi();
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setIsPasswordVisible(!isPasswordVisible);
  };

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/auth/public/login", formData);
      if (JSON.stringify(response.data.jwt) === undefined) {
        navigate("/signup");
      } else {
        setToken(JSON.stringify(response.data.jwt));
        localStorage.setItem("JWT_TOKEN", JSON.stringify(response.data.jwt));

        if (response.status === 200) {
          toast.success("welcome");
          navigate("/urlpage");
        }
      }
    } catch (error) {
      if (error.status === 403) toast.error("Invalid credentials");
    }
  };

  if (token) return <Urlpage />;
  if (!token)
    return (
      <div className="min-h-screen bg-blue-500 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center">
            Login
          </h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                UserName
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                required
              />
            </div>
            <div className="mb-4 relative">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 pr-10"
                required
              />
              <button
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 top-7 right-0 px-3 py-2 flex items-center text-gray-700 dark:text-gray-300"
                type="button"
              >
                {isPasswordVisible ? <MdVisibilityOff /> : <MdVisibility />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 dark:bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition duration-300"
              onClick={handleSubmit}
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    );
};

export default Login;
