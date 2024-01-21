import React, { useEffect } from "react";
import { useAuth } from "./context/Autchcontext";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';

function ProtecterRoute() {
  const { loading, isAuthenticated, setIsAuthenticated, setUserData, setLoading } = useAuth();

  useEffect(() => {
    const checkTokens = async () => {
      const cookies = Cookies.get();

      if (cookies.token1) {
        try {
          const res = await axios.get('/verifyadm');
          if (!res.data) {
            setIsAuthenticated(false);
          } else {
            setIsAuthenticated(true);
            setUserData(res.data);
          }
        } catch (error) {
          setIsAuthenticated(false);
          setUserData(null);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    checkTokens();
  }, [loading, setIsAuthenticated, setUserData, setLoading]);

  if (loading) return <h>Loading</h>;

  if (!loading && !isAuthenticated) {
    return <Navigate to="/LoginAdm" replace />;
  }

  return <Outlet />;
}

export default ProtecterRoute;



