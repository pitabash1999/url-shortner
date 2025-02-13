import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Shorturl = () => {
  const { url } = useParams();

  useEffect(() => {
    if (url) {
      window.location.href = import.meta.env.VITE_API_URL + `/${url}`;
    }
  }, [url]);

  return (
    <p className="m-0 p-0 flex justify-center items-center min-h-screen text-3xl dark:bg-slate-800 dark:text-white">
      Rediercting...
    </p>
  );
};

export default Shorturl;
