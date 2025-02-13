import { useContextApi } from "../../store/ContextProvider";

import Loading from "../Loading";
import toast from "react-hot-toast";
import moment from "moment";
import { api } from "../../Baseurl/Baseurl";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineContentCopy } from "react-icons/md";
import Login from "../LoginPage/LogIn";

const Urlpage = () => {
  const { token, urls, load, setUrl, url, generateUrl, result, setUrls } =
    useContextApi();

  const handleUrlChange = (e) => {
    setUrl(e.target.value.trim());
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("URL copied to clipboard!");
  };

  //redirecting urls

  //delete url
  const handleDelete = async (id) => {
    try {
      setUrls((prevUrls) => prevUrls.filter((url) => url.id !== id));

      const resp = await api.delete(`/api/url/deleteUrl/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(resp);
    } catch (e) {
      console.log(e);
    }
  };

  const subDomain = import.meta.env.VITE_REACT_SUBDOMAIN.replace(
    /^(?:https?:\/\/)?/i,
    ""
  );

  if (!token) return <Login />;
  if (load) return <Loading />;

  if (token)
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center p-4 pt-20">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">
          URL Shortener
        </h1>
        <div className="w-full max-w-screen-md mb-8">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={url}
              onChange={handleUrlChange}
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
        </div>

        <div className="w-full max-w-screen-md mb-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Existing URLs
          </h2>
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
                          href={`${import.meta.env.VITE_REACT_SUBDOMAIN}/${
                            item.shortUrl
                          }`}
                          className="text-blue-600 dark:text-blue-400 hover:underline font-bold"
                        >
                          {`${subDomain}/${item.shortUrl}`}
                        </a>
                      </p>
                    </div>

                    <div className="flex gap-2 relative top-14">
                      <button
                        onClick={() =>
                          copyToClipboard(
                            `${import.meta.env.VITE_REACT_SUBDOMAIN}/${
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
    );
};

export default Urlpage;
