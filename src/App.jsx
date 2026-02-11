// App.jsx
import { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout"; // New layout
import Home from "./Components/Pages/Home/Home";
import Slider from "./Components/Pages/Slider/Slider";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";

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
          <Route index element={<Home />} /> {/* / shows Home */}
          <Route path="slider" element={<Slider />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
