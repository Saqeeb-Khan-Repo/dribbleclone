// App.jsx
import { useState, lazy, Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout"; // New layout
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";

const Talent = lazy(() => import("./Components/Pages/Talent/Talent"));
const Slider = lazy(() => import("./Components/Pages/Slider/Slider"));

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
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
          <Route
            index
            element={
              <Suspense fallback={<div className="loading">Loading Talent...</div>}>
                <Talent />
              </Suspense>
            }
          />
          <Route
            path="slider"
            element={
              <Suspense fallback={<div className="loading">Loading Slider...</div>}>
                <Slider />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
