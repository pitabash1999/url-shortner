import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { api } from "../../Baseurl/Baseurl";
import { useContextApi } from "../../store/ContextProvider";
import Urlpage from "../Urlpage/Urlpage";

const Signup = () => {
  const navigate = useNavigate();
  const { token } = useContextApi();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setIsPasswordVisible(!isPasswordVisible);
  };

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/auth/public/register", formData);

      if (response.status === 201) {
        toast.success("Registered successfully");
        navigate("/login");
      }
      if (response.status === 500) {
        toast.error("User name already exist.Please give unique name...");
      }
    } catch (error) {
      toast.error("error");
    }
  };

  if (token) return <Urlpage />;
  if (!token)
    return (
      <div className="min-h-screen bg-blue-500 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center">
            Sign Up
          </h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                name="userName"
                onChange={handleChange}
                value={formData.userName}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                required
              />
            </div>
            <div className="mb-6 relative">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type={isPasswordVisible === true ? "text" : "password"}
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
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    );
};

export default Signup;
