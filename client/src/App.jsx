import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Login from "./pages/auth/Login";
import About from "./pages/about/About";
import Account from "./pages/account/Account";
import Register from "./pages/auth/Register";
import Verify from "./pages/auth/Verify";
import { UserData } from "./context/UserContext";
import Loading from "./components/loading/Loading";
import Courses from "./pages/courses/Courses";
import CourseDescription from "./pages/coursedescription/CourseDescription";
import PaymentSuccess from "./pages/paymentsuccess/PaymentSuccess";
import Dashboard from "./pages/dashboard/Dashboard";
import CourseStudy from "./pages/coursestudy/CourseStudy";
import Lecture from "./pages/lecture/Lecture";
import AdminDashboard from "./admin/Dashboard/AdminDashboard";
import AdminCourses from "./admin/Courses/AdminCourses";
import AdminUsers from "./admin/Users/AdminUsers";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

function App() {
  const { isAuth, user, loading } = UserData();
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          <Header isAuth={isAuth} user={user} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route
              path="/register"
              element={isAuth ? <Home /> : <Register />}
            />
            <Route path="/login" element={isAuth ? <Home /> : <Login />} />
            <Route path="/verify" element={isAuth ? <Home /> : <Verify />} />
            <Route path="/forgot" element={isAuth ? <Home /> : <ForgotPassword />} />
              <Route path="/reset-password/:token" element={isAuth ? <Home /> : <ResetPassword />} />
            <Route
              path="/account"
              element={isAuth ? <Account user={user} /> : <Login />}
            />

            <Route
              path="/course/:id"
              element={isAuth ? <CourseDescription user={user} /> : <Login />}
            />
            <Route
              path="/payment-success/:id"
              element={isAuth ? <PaymentSuccess user={user} /> : <Login />}
            ></Route>
            <Route
              path="/:id/dashboard"
              element={isAuth ? <Dashboard user={user} /> : <Login />}
            />
            <Route
              path="/course/study/:id"
              element={isAuth ? <CourseStudy user={user} /> : <Login />}
            />
            <Route
              path="/lectures/:id"
              element={isAuth ? <Lecture user={user} /> : <Login />}
            />
            <Route
              path="/admin/dashboard"
              element={
                isAuth && (user.role === "admin" || user.role === "superadmin") ? (
                  <AdminDashboard user={user} />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/admin/courses"
              element={
                isAuth && (user.role === "admin" || user.role === "superadmin") ? (
                  <AdminCourses user={user} />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/admin/users"
              element={
                isAuth && (user.role === "admin" || user.role === "superadmin") ? (
                  <AdminUsers user={user} />
                ) : (
                  <Login />
                )
              }
            />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
