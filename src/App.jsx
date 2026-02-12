import { useState, lazy, Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Home from "./Components/routes/Home";
import ProtectedRoute from "./Components/Auth/ProtectedRoute";

const Slider = lazy(() => import("./Components/Pages/Slider/Slider"));
const GetHired = lazy(() => import("./Components/routes/GetHired"));
const HireTalent = lazy(() => import("./Components/routes/HireTalent"));
const Explore = lazy(() => import("./Components/routes/Explore"));
const Community = lazy(() => import("./Components/routes/Community"));

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
              <Suspense
                fallback={<div className="loading">Loading Talent...</div>}
              >
                <Home />
              </Suspense>
            }
          />
          <Route
            path="slider"
            element={
              <Suspense
                fallback={<div className="loading">Loading Slider...</div>}
              >
                <Slider />
              </Suspense>
            }
          />
          <Route
            path="gethired"
            element={
              <ProtectedRoute>
                <Suspense
                  fallback={<div className="loading">Loading Get Hired...</div>}
                >
                  <GetHired />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="hiretalent"
            element={
              <ProtectedRoute>
                <Suspense
                  fallback={
                    <div className="loading">Loading Hire Talent...</div>
                  }
                >
                  <HireTalent />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="explore"
            element={
              <ProtectedRoute>
                <Suspense
                  fallback={<div className="loading">Loading Explore...</div>}
                >
                  <Explore />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="community"
            element={
              <ProtectedRoute>
                <Suspense
                  fallback={<div className="loading">Loading Community...</div>}
                >
                  <Community />
                </Suspense>
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
