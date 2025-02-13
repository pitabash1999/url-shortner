import { useContextApi } from "../../store/ContextProvider";
import React, { useEffect } from "react";
import { api } from "../../Baseurl/Baseurl";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineContentCopy } from "react-icons/md";
import moment from "moment";
import Loading from "../Loading";
import toast from "react-hot-toast";
import Login from "../LoginPage/LogIn";

const Urlpage = () => {
  const {
    token,
    load,
    setUrl,
    url,
    generateUrl,
    setLoad,
    setUrls,
    handleDelete,
    urls,
    keyHandle, // Add this from context
  } = useContextApi();

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("URL copied to clipboard!");
  };

  const subDomain = import.meta.env.VITE_REACT_SUBDOMAIN.replace(
    /^(?:https?:\/\/)?/i,
    ""
  );

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        setLoad(true);
        const response = await api.get("/api/url/myUrls", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUrls(
          response.data.map((item) => ({
            id: item.id,
            originalUrl: item.originalUrl,
            shortUrl: item.shortUrl,
            creationTime: item.creationTime,
          }))
        );
        setLoad(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (token) {
      fetchUrls();
    }
  }, [token]);

  const handleUrlChange = (e) => {
    setUrl(e.target.value.trim());
  };

  if (!token) return <Login />;
  if (load) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center p-4 pt-20 ">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">
        URL Shortener
      </h1>
      <div className="w-full max-w-screen-md mb-8">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={url}
            onChange={handleUrlChange}
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                keyHandle();
              }
            }}
            placeholder="Enter a URL"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            required
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-600 dark:bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition duration-300"
            onClick={generateUrl}
          >
            Shorten
          </button>
        </div>
        <div className="w-full max-w-screen-md mb-8 mt-5">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Existing URLs
          </h2>

          {urls.length === 0 && <h2>No URLs are there...</h2>}
          <div className="h-screen overflow-y-auto">
            <div className="overflow-hidden">
              <ul className="space-y-2 flex flex-col-reverse">
                {urls.map((item) => (
                  <li
                    key={item.id}
                    className="w-full max-w-screen-md mb-8 bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md flex justify-between items-center"
                  >
                    <div className="flex flex-col justify-end gap-2">
                      <p className="text-gray-800 dark:text-gray-100">
                        {item.id}
                      </p>
                      <p className="text-gray-800 dark:text-gray-100">
                        {moment(item.creationTime).format("YYYY-MM-DD")}
                      </p>
                      <p className="text-gray-800 dark:text-gray-100">
                        Original:{" "}
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={item.originalUrl}
                          className="text-slate-600 dark:text-slate-400 hover:underline text-sm"
                        >
                          {item.originalUrl}
                        </a>
                      </p>
                      <p className="text-gray-800 dark:text-gray-100">
                        Short:{" "}
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`${import.meta.env.VITE_REACT_SUBDOMAIN}/s/${
                            item.shortUrl
                          }`}
                          className="text-blue-600 dark:text-blue-400 hover:underline font-bold"
                        >
                          {`${subDomain}/s/${item.shortUrl}`}
                        </a>
                      </p>
                    </div>

                    <div className="flex gap-2 relative top-14">
                      <button
                        onClick={() =>
                          copyToClipboard(
                            `${import.meta.env.VITE_REACT_SUBDOMAIN}/s/${
                              item.shortUrl
                            }`
                          )
                        }
                        className="text-blue-600 dark:text-blue-400 text-2xl font-extrabold"
                      >
                        <MdOutlineContentCopy />
                      </button>
                      <button
                        className="text-red-600 dark:text-red-400 text-3xl font-extrabold"
                        onClick={() => handleDelete(item.id)}
                      >
                        <MdOutlineDelete />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Urlpage;
