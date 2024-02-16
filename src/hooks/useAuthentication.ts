import { useEffect, useState } from "react";
import { AuthService } from "../services";
import useGlobal from "./useGlobal";
import { setHeader } from "../configs/axiosAuth";

// @ts-ignore  
import { jwtDecode } from "jwt-decode";
const useAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { setUser } = useGlobal();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const currentTokenData: { userId: string, role: string, email: string } = jwtDecode(token);
      AuthService.validateToken(token, currentTokenData?.userId)
        .then((decoded) => {
          if (decoded && decoded.data.email) {
            setUser(decoded.data);
            setIsAuthenticated(true);
            setHeader(decoded.data.userId, token);
          }
        })
        .catch((error) => {
          console.log('ERROR', error)
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
