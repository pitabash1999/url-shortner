import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../Baseurl/Baseurl";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ContextApi = createContext();

const ContextProvider = ({ children }) => {
  const [urls, setUrls] = useState([]);
  const [load, setLoad] = useState(false);
  const [url, setUrl] = useState("");

  const navigate = useNavigate();

  //Theme controller
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (theme === "dark") {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const getToken = localStorage.getItem("JWT_TOKEN")
    ? JSON.parse(localStorage.getItem("JWT_TOKEN"))
    : null;

  const [token, setToken] = useState(getToken);

  const handleLogout = () => {
    localStorage.setItem("JWT_TOKEN", null);
    setToken(null);
  };

  //delete url
  const handleDelete = async (id) => {
    try {
      setUrls((prevUrls) => prevUrls.filter((url) => url.id !== id));

      const resp = await api.delete(`/api/url/deleteUrl/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (e) {
      console.log(e);
    }
  };

  //generate urls (keydwon)
  const keyHandle = async () => {
    if (token && url) {
      try {
        const response = await api.post(
          "/api/url/shortUrl",
          { originalUrl: url },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUrls([
          ...urls,
          {
            id: response.data.id,
            originalUrl: response.data.originalUrl,
            shortUrl: response.data.shortUrl,
            creationTime: response.data.creationTime,
          },
        ]);
        setUrl("");
        toast.success("URL shortened successfully!");
      } catch (error) {
        toast.error("Failed to shorten URL");
      } finally {
        setLoad(false);
      }
    }
  };

  //generate urls
  async function generateUrl(e) {
    if (token && url) {
      try {
        e.preventDefault();

        const response = await api.post(
          "/api/url/shortUrl",
          { originalUrl: url },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUrls([
          ...urls,
          {
            id: response.data.id,
            originalUrl: response.data.originalUrl,
            shortUrl: response.data.shortUrl,
            creationTime: response.data.creationTime,
          },
        ]);
        setUrl("");
        toast.success("URL shortened successfully!");
      } catch (error) {
        console.log(error);
        toast.error("Failed to shorten URL");
      } finally {
        setLoad(false);
      }
    }
  }

  return (
    <ContextApi.Provider
      value={{
        token,
        setToken,
        handleLogout,
        load,
        urls,
        generateUrl,
        url,
        setUrl,
        setUrls,
        theme,
        toggleTheme,
        setLoad,
        handleDelete,

        keyHandle,
      }}
    >
      {children}
    </ContextApi.Provider>
  );
};

export default ContextProvider;

export const useContextApi = () => {
  return useContext(ContextApi);
};
