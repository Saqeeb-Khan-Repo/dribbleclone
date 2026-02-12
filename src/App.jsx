// App.jsx
import { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const App = () => {
  //lazy loading for performane
  const Login = lazy(() => import("./Components/Auth/Login"));
  const Layout = lazy(() => import("./Layout"));
  const Talent = lazy(() => import("./Components/Pages/Talent/Talent"));
  const Slider = lazy(() => import("./Components/Pages/Slider/Slider"));
  const Register = lazy(() => import("./Components/Auth/Register"));

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <Suspense>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <Layout
                onHamburgerClick={toggleSidebar}
                isSidebarOpen={isSidebarOpen}
                onCloseSidebar={closeSidebar}
              />
            }
          >
            <Route index element={<Talent />} /> {/* / shows Home */}
            <Route path="slider" element={<Slider />} />
          </Route>
        </Routes>
      </HashRouter>
    </Suspense>
  );
};

export default App;
