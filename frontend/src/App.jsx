import React, { useEffect } from "react";
import {
  Route,
  RouterProvider,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";

// redux
// layouts
import GenralLayout from "./layouts/GenralLayout";
import RootLayout from "./layouts/RootLayout";
// pages
import NotFound from "./pages/errors/NotFound";
// loaders
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "./app/stateSlice/authStateSlice";
import axios from "axios";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Logout from "./pages/auth/Logout";
import VerifyEmail from "./pages/auth/VerifyEmail";
import Protected from "./components/Protected";
import Chats, { chatsLoader } from "./pages/User/Chats";
import FindUser from "./pages/User/FindUser";
import Chat, { chatLoader } from "./pages/User/Chat";
import Profile from "./pages/User/Profile";
import CreateNewGroup from "./pages/User/CreateNewGroup";

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const initialSetUp = async () => {
    try {
      await axios.get("/sanctum/csrf-cookie");
      if (auth.isLogin) {
        // get the latest value of data
        const userData = await axios.get("/api/user");
        dispatch(setUser(userData.data));
      }
    } catch (err) {
      console.log("request Error", err);
      if (err.response?.status === 401) {
        dispatch(logout());
      }
    }
  };

  useEffect(() => {
    initialSetUp();
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route element={<Protected guest />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/password-reset/:token" element={<ResetPassword />} />
        </Route>

        {/* Layout : null , protected : auth */}
        <Route element={<Protected redirect="/login" auth />}>
          <Route path="/logout" element={<Logout />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/chat/:id" loader={chatLoader} element={<Chat />} />
        </Route>
        <Route element={<GenralLayout />}>
          <Route element={<Protected auth redirect="/login" />}>
            <Route path="/chats" loader={chatsLoader} element={<Chats />} />
            <Route path="/find-users" element={<FindUser />} />
            <Route path="/user-profile" element={<Profile />} />
            <Route path="/create-new-group" element={<CreateNewGroup />} />
          </Route>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
