import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Shorturl = () => {
  const { url } = useParams();

  useEffect(() => {
    if (url) {
      window.location.href = import.meta.env.VITE_API_URL + `/${url}`;
    }
  }, [url]);

  return null;
};

export default Shorturl;
