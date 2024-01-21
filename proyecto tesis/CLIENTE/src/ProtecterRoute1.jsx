import React, { useEffect, useState } from "react";
import { useAuth } from "./context/Autchcontext";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';

function ProtecterRoute1() {
  const { isAuthenticated, setIsAuthenticated, setUserData, setLoading } = useAuth();
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const checkTokens = async () => {
      const cookies = Cookies.get();

      if (cookies && cookies.token) {
        try {
          setLoading(true);

          const res = await axios.get('/verifyuser');
          if (!res.data) {
            setIsAuthenticated(false);
          } else {
            setIsAuthenticated(true);
            setUserData(res.data);
          }
        } catch (error) {
          console.error("Error during token verification:", error);
          setIsAuthenticated(false);
          setUserData(null);
        } finally {
          setLoading(false);
          setInitialLoading(false);
        }
      } else {
        setIsAuthenticated(false);
        setUserData(null);
        setLoading(false);
        setInitialLoading(false);
      }
    };

    checkTokens();
  }, [setIsAuthenticated, setUserData, setLoading]);

  if (initialLoading) return <h>Loading...</h>;

  if (!initialLoading && !isAuthenticated) {
    return <Navigate to="/UsuarioLogin" replace />;
  }

  return <Outlet />;
}

export default ProtecterRoute1;
