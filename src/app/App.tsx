import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "@/app/Layout";
import { Home, NoMatch } from "@/pages";
import ChatBotPage from "@/pages/Chatbot/Page";
import LinksPage from "@/pages/Links/Page";
import SignupPage from "@/pages/Auth/Signup/Page";
import LoginPage from "@/pages/Auth/Login/Page";
import ForgotPasswordPage from "@/pages/Auth/ForgetPassword/Page";

const App: FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="chatbot" element={<ChatBotPage />} />
          <Route path="links" element={<LinksPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="forget-password" element={<ForgotPasswordPage />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
