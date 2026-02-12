import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";
import Icon from "../../Custom/Icon";
import "./Sidebar.css";
import { useAuth } from "../../Auth/AuthContext";
import { Link } from "react-router-dom";
import { NavLinks } from "../../Custom/DropDown";
import { useState } from "react";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => setOpen(!open);

  return (
    <>
      <div
        className={`sidebar_overlay ${open ? "active" : ""}`}
        onClick={toggleSidebar}
      ></div>
      <aside className={`sidebar ${open ? "active" : ""}`}>
        <div className="sidebar_header">
          <IoCloseOutline className="close_icon" onClick={toggleSidebar} />
        </div>

        <div className="sidebar_search">
          <input type="search" placeholder="Search..." />
          <span>
            <IoSearchOutline />
          </span>
        </div>

        <div className="sidebar_nav">
          {NavLinks.map((nav) => (
            <Link
              key={nav}
              to={`/${nav.toLowerCase().replace(/\s+/g, "")}`}
              className="sidebar_link"
              onClick={() => setOpen(false)}
            >
              {nav}
            </Link>
          ))}
        </div>

        <div className="sidebar_auth">
          {user ? (
            <>
              <span>Hi, {user.username}</span>
              <button onClick={logout} className="logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="button_white">
                Register
              </Link>
              <Link to="/login" className="button">
                Login
              </Link>
            </>
          )}
        </div>

        <button className="sidebar_toggle" onClick={toggleSidebar}>
          ☰
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
