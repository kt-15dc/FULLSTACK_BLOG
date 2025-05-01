import React from "react";
import LandingPage from "./pages/LandingPage";
import PostDetail from "./pages/PostDetail";
import NotFound from "./pages/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import { Toaster } from "sonner";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster richColors position="bottom-right" />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/post/:postId" element={<PostDetail />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        {/* You can add more routes here as needed */}
      </Routes>
      {/* You can add a footer or other components here if needed */}
    </BrowserRouter>
  );
};

export default App;
