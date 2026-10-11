import { Navigate, Route, Routes } from "react-router-dom";
import "@fontsource-variable/inter-tight/wght.css";
import "@fontsource-variable/jetbrains-mono/wght.css";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/utilities.css";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import ProjectPage from "./pages/ProjectPage";
import NotFound from "./pages/NotFound";

/** Router-agnostic: wrapped in BrowserRouter (main.tsx) or StaticRouter (entry-server.tsx). */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="projects/:slug" element={<ProjectPage />} />
        {/* Old multi-page URLs → home sections (also redirected by vercel.json) */}
        <Route path="skills" element={<Navigate to="/#skills" replace />} />
        <Route path="projects" element={<Navigate to="/#work" replace />} />
        <Route path="contact" element={<Navigate to="/#contact" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
