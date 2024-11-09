import React, { useState } from "react";
import SearchIcon from "./3SearchIcon";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
    // You can add additional logic here if needed
  };

  return (
    <>
      <header className="header">
        <a href="/" className="logo">
          <img src="./images/logo1.png" alt="LOGO" className="logoimg" />
        </a>
        <span className="logo-name">COLLEGE EXPLORER</span>
        <nav className="navbar">
          <div
            className={`container1 ${menuOpen ? "change" : ""}`}
            onClick={toggleMenu}
            id="menu-icon"
          >
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
        </nav>
      </header>
      <div className={`navbar1 ${menuOpen ? "show" : ""}`}>
        <ul className="menu">
          <li>
            <a
              href="#"
              className={activeLink === "Home" ? "active" : ""}
              onClick={() => handleLinkClick("Home")}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#review"
              className={activeLink === "About" ? "active" : ""}
              onClick={() => handleLinkClick("About")}
            >
              Review
            </a>
          </li>
          <li>
            <a
              href="#map"
              className={activeLink === "Contact" ? "active" : ""}
              onClick={() => handleLinkClick("Contact")}
            >
              Map
            </a>
          </li>
          <li>
            <a
              href="#feedback"
              className={activeLink === "feedback" ? "active" : ""}
              onClick={() => handleLinkClick("feedback")}
            >
              FeedBack
            </a>
          </li>
          <li>
            <a
              href="#"
              className={activeLink === "Login" ? "active" : ""}
              onClick={() => handleLinkClick("Login")}
            >
              Log in
            </a>
          </li>
        </ul>
      </div>
      <SearchIcon />
    </>
  );
};

export default Header;
