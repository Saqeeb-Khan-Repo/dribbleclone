// App.jsx
import { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "./Layout";

const App = () => {
  //lazy loading for performane
  const Login = lazy(() => import("./Components/Auth/Login"));
  const Talent = lazy(() => import("./Components/Pages/Talent/Talent"));
  const Slider = lazy(() => import("./Components/Pages/Slider/Slider"));
  const Register = lazy(() => import("./Components/Auth/Register"));

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  // Memoize Layout props to prevent re-renders
  const layoutProps = {
    onHamburgerClick: toggleSidebar,
    isSidebarOpen,
    onCloseSidebar: closeSidebar,
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<Layout {...layoutProps} />}>
            <Route index element={<Talent />} /> {/* / shows Home */}
            <Route path="slider" element={<Slider />} />
          </Route>
        </Routes>
      </HashRouter>
    </Suspense>
  );
};;

export default App;
