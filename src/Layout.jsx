// src/Layout.jsx
import { Outlet } from "react-router-dom";
import Header from "./Components/Pages/Header/Header";
import SideBar from "./Components/Pages/Sidebar/SideBar";
import Footer from "./Components/Pages/Footer/Footer";
import { AuthProvider } from "./Components/Auth/AuthContext";
import Slider from "./Components/Pages/Slider/Slider";

const Layout = ({ onHamburgerClick, isSidebarOpen, onCloseSidebar }) => (
  <AuthProvider>
    <Header onHamburgerClick={onHamburgerClick} />
    <div className="app-body">
      <SideBar isOpen={isSidebarOpen} onClose={onCloseSidebar} />
      <main className="main-content">
        <Outlet /> {/* Renders the matched route component */}
      </main>
    </div>
    <Slider />
    <Footer />
  </AuthProvider>
);

export default Layout;
