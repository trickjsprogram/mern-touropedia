import { useState, useEffect } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/authSlice";
import AddEditTour from "./pages/AddEditTour";
import SingleTour from "./pages/SingleTour";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound";
import TagTours from "./pages/TagTours";
import { io } from "socket.io-client";
import Category from "./pages/Category";
import Profile from "./pages/Profile";
import Tours from "./pages/Tours";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";

function App() {
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    dispatch(setUser(user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const devEnv = process.env.NODE_ENV !== "production";

  useEffect(() => {
    setSocket(
      io(
        `${
          devEnv
            ? process.env.REACT_APP_DEV_API
            : process.env.REACT_APP_PROD_API
        }`
      )
    );
  }, [devEnv]);

  useEffect(() => {
    socket?.emit("newUser", user?.result?.name);
  }, [socket, user]);
  return (
    <BrowserRouter>
      <div className="App">
        <Header socket={socket} />
        <ToastContainer />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home socket={socket} />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/tours/search" element={<Home />} />
          <Route path="/tours/tag/:tag" element={<TagTours />} />
          <Route path="/tours/category/:category" element={<Category />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/addTour"
            element={
              <PrivateRoute>
                <AddEditTour />
              </PrivateRoute>
            }
          />
          <Route
            path="/editTour/:id"
            element={
              <PrivateRoute>
                <AddEditTour />
              </PrivateRoute>
            }
          />
          <Route path="/tour/:id" element={<SingleTour />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
