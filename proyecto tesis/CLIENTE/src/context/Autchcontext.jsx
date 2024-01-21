import React, { createContext, useState, useContext, useEffect } from "react";
import { registerrequestusuario, registerRequestamd, loginRequestadm, loginRequestuser, verityTokenRequet, verityTokenRequet1 } from "../api/authadm.js";
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const signupuser = async (user) => {
        try {
            const res = await registerrequestusuario(user);
            setUserData(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.error("Error during user registration:", error);
            throw error;
        }
    };

    const signupadm = async (user) => {
        try {
            const response = await registerRequestamd(user);
            setUserData(response.data);
            setIsAuthenticated(true);
            return response;
        } catch (error) {
            console.error("Error during admin registration:", error);
            throw error;
        }
    };
    
    const signinadm = async (user) => {
        console.log("Request Data:", user);
        try {
            const res = await loginRequestadm(user);
            console.log(res);
            setIsAuthenticated(true);
            setUserData(res.data);
        } catch (error) {
            console.error("Error during admin login:", error);
            console.log("Full error object:", error);
        }
    };

    const signinuser = async (user) => {
        console.log("Request Data:", user);
      
        try {
          const res = await loginRequestuser(user);
      
          if (res.data && res.data.message) {
            console.log("Success message:", res.data.message);
            setIsAuthenticated(true);
            setUserData(res.data);
      
            // Devuelve los datos del usuario
            return res.data;
          } else {
            console.error("Unexpected response structure:", res);
            throw new Error("Unexpected response structure");
          }
        } catch (error) {
          console.error("Error during user login:", error);
          console.log("Full error object:", error);
          setErrorMessage("Error in login. Please try again.");
          throw error; // Re-lanza el error para que pueda ser manejado en el componente de llamada
        }
      };
    
    
 
    return (
        <AuthContext.Provider value={{
            userData,
            isAuthenticated,
            signupuser,
            signupadm,
            signinadm,
            signinuser,
            loading,
            setLoading,
            setIsAuthenticated,
            setUserData,
          
            
        }}>
            {children}
        </AuthContext.Provider>
    );
};
