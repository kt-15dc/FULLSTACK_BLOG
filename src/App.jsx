import React from "react";
import LandingPage from "./pages/LandingPage";
import PostDetail from "./pages/PostDetail";
import NotFound from "./pages/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import { Toaster } from "sonner";
import AdminLogin from "./pages/Admin/AdminLoginPage";
import AdminArticleManagementPage from "./pages/Admin/ADashboardArticleMgmt";
import AdminEditArticlePage from "./pages/Admin/AdminEditArticlePage";
import AdminCategoryManagementPage from "./pages/Admin/ADashboardCategoryMgmt";

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
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/article-management" element={<AdminArticleManagementPage />} />
        <Route path="/admin/edit-article/:postId" element={<AdminEditArticlePage />} />
        <Route path="/admin/category-management" element={<AdminCategoryManagementPage />} />
        {/* You can add more routes here as needed */}
      </Routes>
      {/* You can add a footer or other components here if needed */}
    </BrowserRouter>
  );
};

export default App;
