const SidebarItem = ({ label, items, isOpen, onToggle }) => {
  return (
    <div className="sidebar-item-with-menu">
      <button className="sidebar-link-with-menu" onClick={onToggle}>
        <span>{label}</span>
        <span className="sidebar-caret">{isOpen ? "▴" : "▾"}</span>
      </button>

      <div className={`sidebar-dropdown ${isOpen ? "open" : ""}`}>
        {items.map((item, index) => (
          <a href="/" key={index} onClick={(e) => e.preventDefault()}>
            {item}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SidebarItem;
