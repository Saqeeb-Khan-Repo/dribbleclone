// Header.jsx
import { IoReorderThreeOutline, IoSearchOutline } from "react-icons/io5";
import Icon from "../../Custom/Icon";
import "./Header.css";
import { NAV_CONFIG } from "../../Custom/DropDown";
import { useAuth } from "../../Auth/AuthContext";
import { Link } from "react-router-dom";

const Header = ({ onHamburgerClick }) => {
  const { user, role, logout } = useAuth();

  return (
    <header className="header">
      <nav>
        {/* Hamburger (leftmost on mobile) */}
        <IoReorderThreeOutline
          className="hamburger"
          onClick={onHamburgerClick}
        />

        {/* Logo */}
        <a href="#" className="a_icon">
          <Icon className="icon" />
        </a>

        {/* Search */}
        <div className="search_container">
          <input type="search" placeholder="What are you looking for?" />
          <span>
            <IoSearchOutline />
          </span>
        </div>

        {/* Nav dropdowns */}
        <div className="container_a">
          {NAV_CONFIG.map((nav) => (
            <div className="nav-item-with-menu" key={nav.label}>
              <button className="nav-link-with-menu btn">
                <span>{nav.label}</span>
                <span className="nav-caret">▾</span>
              </button>
              <div className="nav-dropdown">
                {nav.items.map((item) => (
                  <Link
                    to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    key={item}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Authentication (right side) */}
        <div className="auth-section">
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
      </nav>
    </header>
  );
};

export default Header;
