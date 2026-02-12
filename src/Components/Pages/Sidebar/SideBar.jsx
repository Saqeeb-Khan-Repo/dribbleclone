import { useState } from "react";
import SidebarItem from "./SideBarItem";
import { NAV_CONFIG, NavLinks } from "../../Custom/DropDown";
import "./SideBar.css";
import { Link } from "react-router-dom";

const SideBar = ({ isOpen, onClose }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
      <button className="sidebar-close" onClick={onClose}>
        x
      </button>
      <div className="container">
        {NavLinks.map((nav) => (
          <div className="nav" key={nav}>
            <div>
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

      <div className="sidebar_container">
        {NAV_CONFIG.map((nav, index) => (
          <SidebarItem
            key={nav.label}
            label={nav.label}
            items={nav.items}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </aside>
  );
};

export default SideBar;
