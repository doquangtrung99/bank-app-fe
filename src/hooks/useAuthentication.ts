import { useEffect, useState } from "react";
import { AuthService } from "../services";
import useGlobal from "./useGlobal";
import { setHeader } from "../configs/axiosAuth";
const useAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { setUser } = useGlobal();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      AuthService.validateToken(token)
        .then((decoded) => {
          if (decoded && decoded.data.email) {
            setUser(decoded.data);
            setIsAuthenticated(true);
            setHeader(decoded.data.userId, token);
          }
        }).catch(() => {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    isAuthenticated,
  };
};

export default useAuthentication;
