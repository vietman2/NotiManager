import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { FaHome, FaHistory, FaFolderOpen, FaUser } from "react-icons/fa";
import { FiTarget } from "react-icons/fi";
import { MdMessage, MdLogout } from "react-icons/md";

import "./NotiSidebar.css";
import logo from "../../assets/NotiLogo.png";
import { authSelector, logout } from "../../store/slices/auth";
import { AppDispatch } from "../../store";

export default function NotiSidebar() {
  const location = useLocation();

  const userState = useSelector(authSelector);
  const [username, setUsername] = useState("");

  const homeClass = location.pathname === "/home" ? "active" : "item";
  const projectsClass = location.pathname === "/projects" ? "active" : "item";
  const targetsClass = location.pathname === "/targets" ? "active" : "item";
  const messagesClass = location.pathname === "/messages" ? "active" : "item";
  const historyClass = location.pathname === "/history" ? "active" : "item";

  const dispatch = useDispatch<AppDispatch>();

  const userIcon = <FaUser size="48"></FaUser>;
  const homeIcon = <FaHome size="48"></FaHome>;
  const projectIcon = <FaFolderOpen size="48"></FaFolderOpen>;
  const targetIcon = <FiTarget size="48"></FiTarget>;
  const messageIcon = <MdMessage size="48"></MdMessage>;
  const historyIcon = <FaHistory size="48"></FaHistory>;
  const logoutIcon = <MdLogout size="48"></MdLogout>;

  const logoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (userState.user) {
      setUsername(
        userState.user.username.charAt(0).toUpperCase() +
          userState.user.username.slice(1)
      );
    }
  }, [userState.user]);

  return (
    <div className="background" style={{ height: "100%" }}>
      <Sidebar className="sidebar" data-testid="sidebar" width="288px">
        <div className="titleBox">
          <img className="Icon" src={logo} alt="" />
        </div>
        <Menu>
          <MenuItem
            className="userInfo"
            icon={userIcon}
            routerLink={<Link to="/email" />}
            >
            {username}
          </MenuItem>
        </Menu>
        <Menu className="menu">
          <MenuItem
            routerLink={<Link to="/home" />}
            className={homeClass}
            data-testid="homeButton"
            icon={homeIcon}
          >
            {" "}
            Home{" "}
          </MenuItem>
          <MenuItem
            routerLink={<Link to="/projects" />}
            className={projectsClass}
            data-testid="projectsButton"
            icon={projectIcon}
          >
            {" "}
            Projects{" "}
          </MenuItem>
          <MenuItem
            routerLink={<Link to="/targets" />}
            className={targetsClass}
            data-testid="targetsButton"
            icon={targetIcon}
          >
            {" "}
            Targets{" "}
          </MenuItem>
          <MenuItem
            routerLink={<Link to="/messages" />}
            className={messagesClass}
            data-testid="messagesButton"
            icon={messageIcon}
          >
            {" "}
            Messages{" "}
          </MenuItem>
          <MenuItem
            routerLink={<Link to="/history" />}
            className={historyClass}
            data-testid="historyButton"
            icon={historyIcon}
          >
            {" "}
            History{" "}
          </MenuItem>
        </Menu>
        <Menu className="logout">
          <MenuItem
            className="item"
            icon={logoutIcon}
            data-testid={"logout-button"}
            onClick={logoutHandler}
          >
            {" "}
            Log Out{" "}
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
