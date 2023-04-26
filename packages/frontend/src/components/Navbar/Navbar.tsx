// 3rd Party & React Imports
import { NavLink } from "react-router-dom";

// Types
import { View } from "../../index";

// Styles
import "./Navbar.css";

interface Props {
  icon: string;
  views: View[];
}

const Navbar = (props: Props) => {
  const leftItems = props.views.filter((view: View) => view.align === "left");
  const rightItems = props.views.filter((view: View) => view.align === "right");

  return (
    <nav id="navbar">
      <img id="site-icon" alt="site-icon" src={props.icon} />
      <div>
        {leftItems.map((view: View) => (
          <NavLink
            key={view.title}
            to={view.url}
            className={({ isActive }) => (isActive ? "active" : "")}>
            <h1>{view.title}</h1>
          </NavLink>
        ))}
      </div>
      <div>
        {rightItems.map((view: View) => (
          <NavLink
            key={view.title}
            to={view.url}
            className={({ isActive }) => (isActive ? "active" : "")}>
            <h1>{view.title}</h1>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
