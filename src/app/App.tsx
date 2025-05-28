import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "@/app/Layout";
import { Home, NoMatch } from "@/pages";
import ChatBotPage from "@/pages/Chatbot/Page";
import LinksPage from "@/pages/Links/Page";
import SignupPage from "@/pages/Auth/Signup/Page";
import LoginPage from "@/pages/Auth/Login/Page";
import ForgotPasswordPage from "@/pages/Auth/ForgetPassword/Page";
import { PrivateRoute } from "@/utils/privateRoute";
import { AuthRoute } from "@/utils/authRoute";

const App: FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route 
            path="chatbot" 
            element={
              // <PrivateRoute>
                <ChatBotPage />
              // </PrivateRoute>
            } 
          />
          <Route 
            path="links" 
            element={
              <PrivateRoute>
                <LinksPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="signup" 
            element={
              <AuthRoute>
                <SignupPage />
              </AuthRoute>
            } 
          />
          <Route 
            path="login" 
            element={
              <AuthRoute>
                <LoginPage />
              </AuthRoute>
            } 
          />
          <Route 
            path="forget-password" 
            element={
              <AuthRoute>
                <ForgotPasswordPage />
              </AuthRoute>
            } 
          />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;