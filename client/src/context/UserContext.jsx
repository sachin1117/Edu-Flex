import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { server } from "../main";
import toast, { Toaster } from "react-hot-toast";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  async function loginUser(email, password, navigate, fetchMyCourse) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/login`, {
        email,
        password,
      });
      toast.success(data.message);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      setBtnLoading(false);
      setIsAuth(true);
      navigate("/");
      fetchMyCourse();
    } catch (error) {
      setBtnLoading(false);
      setIsAuth(false);
      toast.error(error.response.data.message);
    }
  }

  async function registerUser(name, email, password, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/register`, {
        name,
        email,
        password,
      });
      toast.success(data.message);
      localStorage.setItem("activationToken", data.activationToken);
      setBtnLoading(false);
      navigate("/verify");
    } catch (error) {
      setBtnLoading(false);
      toast.error(error.response.data.message);
    }
  }

  async function verifyOtp(otp, navigate) {
    setBtnLoading(true);
    const activationToken = localStorage.getItem("activationToken");
    
    if (!activationToken) {
      toast.error("No activation token found. Please register again.");
      setBtnLoading(false);
      navigate("/register");
      return;
    }

    if (!otp || otp.toString().length < 4) {
      toast.error("Please enter a valid OTP");
      setBtnLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(`${server}/api/user/verify`, {
        otp: Number(otp),
        activationToken,
      });
      toast.success(data.message);
      localStorage.removeItem("activationToken");
      setBtnLoading(false);
      navigate("/login");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Verification failed";
      toast.error(errorMessage);
      setBtnLoading(false);
      
      // If token is expired, redirect to register
      if (errorMessage.includes("Expired") || errorMessage.includes("Invalid")) {
        localStorage.removeItem("activationToken");
        setTimeout(() => {
          navigate("/register");
        }, 2000);
      }
    }
  }

  async function resendOtp(email) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/resend-otp`, {
        email,
      });
      toast.success(data.message);
      setBtnLoading(false);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to resend OTP";
      toast.error(errorMessage);
      setBtnLoading(false);
    }
  }

  async function fetchUser() {
    try {
      const { data } = await axios.get(`${server}/api/user/me`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setIsAuth(true);
      setUser(data.user);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuth,
        setIsAuth,
        loginUser,
        btnLoading,
        loading,
        registerUser,
        verifyOtp,
        resendOtp,
        fetchUser
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
