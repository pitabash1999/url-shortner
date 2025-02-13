import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Shorturl = () => {
  const { url } = useParams();

  useEffect(() => {
    if (url) {
      const apiUrl = import.meta.env.VITE_API_URL;
      const redirectUrl = `${apiUrl}/${url}`;

      console.log("Redirecting to:", redirectUrl);

      // Redirect to the backend URL
      window.location.href = redirectUrl;
    }
  }, [url]);

  return null;
};

export default Shorturl;
