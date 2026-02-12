// Header.jsx
import { IoReorderThreeOutline, IoSearchOutline } from "react-icons/io5";
import Icon from "../../Custom/Icon";
import "./Header.css";
import { useAuth } from "../../Auth/AuthContext";
import { Link } from "react-router-dom";
import { NavLinks } from "../../Custom/DropDown";
import { useNavigate } from "react-router-dom";

const Header = ({ onHamburgerClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout(); // clear auth, tokens, etc.
    navigate("/login", { replace: true });
  };
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
          {NavLinks.map((nav) => (
            <div className="nav-item-with-menu" key={nav}>
              <div className="nav-dropdown">
                <Link
                  to={`/${nav.toLowerCase().replace(/\s+/g, "")}`}
                  className="nav-link"
                >
                  {nav}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Authentication (right side) */}
        <div className="auth-section">
          {user ? (
            <>
              <span>Hi, {user.username}</span>
              <button onClick={handleLogout} className="logout">
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
