import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import Layout from "./components/Layout.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import DiscoverPage from "./pages/DiscoverPage.jsx";
import CreateProjectPage from "./pages/CreateProjectPage.jsx";
import DevelopersPage from "./pages/DevelopersPage.jsx";
import MyProjectsPage from "./pages/MyProjectsPage.jsx";
import ProjectDetailPage from "./pages/ProjectDetailPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

function Protected({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="grid min-h-screen place-items-center text-slate-400">Loading DevConnect...</div>;
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return <Routes>
    <Route path="/login" element={<AuthPage mode="login"/>}/>
    <Route path="/register" element={<AuthPage mode="register"/>}/>
    <Route element={<Protected><Layout/></Protected>}>
      <Route index element={<DiscoverPage/>}/>
      <Route path="/projects/new" element={<CreateProjectPage/>}/>
      <Route path="/projects/:id" element={<ProjectDetailPage/>}/>
      <Route path="/developers" element={<DevelopersPage/>}/>
      <Route path="/my-projects" element={<MyProjectsPage/>}/>
      <Route path="/profile" element={<ProfilePage/>}/>
    </Route>
    <Route path="*" element={<Navigate to="/" replace/>}/>
  </Routes>;
}
