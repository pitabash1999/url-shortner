import { Link } from "react-router-dom";
import { useContextApi } from "../../store/ContextProvider";
import Urlpage from "../Urlpage/Urlpage";

const LandingPage = () => {
  const { token } = useContextApi();

  if (token) return <Urlpage />;
  if (!token)
    return (
      <div>
        <div className="min-h-screen bg-blue-500 dark:bg-gray-900 flex flex-col items-center justify-center text-white dark:text-gray-100">
          {/* Main Content */}
          <div className="text-center max-w-2xl mx-auto px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Shorten Your Links, Amplify Your Reach
            </h1>
            <p className="text-sm sm:text-base md:text-lg mb-8">
              Shortner is the ultimate URL shortener tool that helps you create
              concise, shareable links in seconds. Perfect for social media,
              marketing campaigns, and more!
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/signup">
                <button className="bg-white text-blue-600 dark:bg-gray-800 dark:text-white px-6 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300 text-sm sm:text-base">
                  Signup
                </button>
              </Link>
            </div>
          </div>
          {/* Footer */}
          <footer className="absolute bottom-0 w-full text-center p-4 text-xs sm:text-sm bg-blue-500 dark:bg-gray-900">
            &copy; {new Date().getFullYear()} Shortner.Pitabash Behera. All
            rights reserved.
          </footer>
        </div>
      </div>
    );
};

export default LandingPage;
