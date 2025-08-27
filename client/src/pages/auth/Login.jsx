import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import { UserData } from "../../context/UserContext";
import { CourseData } from "../../context/CourseContext";

const Login = () => {
  //Sayan
  const navigate = useNavigate();
  const { btnLoading, loginUser } = UserData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { fetchMyCourse } = CourseData();

  const submitHandler = async (e) => {
    e.preventDefault();
    await loginUser(email, password, navigate, fetchMyCourse)
  };
  return (
    <>
      <div className="container d-flex justify-content-center">
        <div className="col-lg-4 mt-5 border p-5 rounded">
          <form onSubmit={submitHandler}>
            <h1 className="auth-title">Login</h1>
            <div className="mb-3 mt-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                aria-describedby="emailHelp"
                required
              />
            </div>
            <div className="mb-4 mt-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <button disabled={btnLoading} type="submit" style={{ width: "100%" }}>
              {btnLoading ? "Please Wait..." : "Login"}
            </button>
            <p className="mt-3 d-flex gap-2">
              Do not have an account? <Link to="/register">Register</Link>
            </p>
            <p className="text-center">
              <Link to="/forgot">Forgot Password?</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
