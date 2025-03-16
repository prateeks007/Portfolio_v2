import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${(props) => props.theme.cardBackground};
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${(props) => props.theme.border};
  padding: 1rem 2rem;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: ${(props) => props.theme.primary};
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 1px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  font-size: 1rem;
  position: relative;
  padding: 0.5rem 0;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: ${(props) => props.theme.primary};
    transition: width 0.3s ease;
  }

  &:hover {
    color: ${(props) => props.theme.primary};
  }

  &:hover:after {
    width: 100%;
  }

  &.active {
    color: ${(props) => props.theme.primary};

    &:after {
      width: 100%;
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${(props) => props.theme.text};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  background: ${(props) => props.theme.secondaryBackground}f5;
  backdrop-filter: blur(10px);
  padding: 1rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileNavLink = styled(Link)`
  display: block;
  color: ${(props) => props.theme.text};
  text-decoration: none;
  padding: 1rem;
  text-align: center;
  font-size: 1.2rem;

  &:hover {
    background: ${(props) => props.theme.border};
  }

  &.active {
    color: ${(props) => props.theme.primary};
  }
`;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerVariants = {
    top: {
      backgroundColor: "rgba(26, 42, 58, 0.85)",
      height: "80px",
    },
    scrolled: {
      backgroundColor: "rgba(26, 42, 58, 0.95)",
      height: "70px",
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      display: "none",
    },
    open: {
      opacity: 1,
      y: 0,
      display: "block",
    },
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <HeaderContainer
        variants={headerVariants}
        animate={isScrolled ? "scrolled" : "top"}
        transition={{ duration: 0.3 }}
      >
        <HeaderContent>
          <Logo to="/">PS</Logo>
          <Nav>
            <NavLink
              to="/skills"
              className={isActive("/skills") ? "active" : ""}
            >
              Skills
            </NavLink>
            <NavLink
              to="/experience"
              className={isActive("/experience") ? "active" : ""}
            >
              Experience
            </NavLink>
            <NavLink
              to="/achievements"
              className={isActive("/achievements") ? "active" : ""}
            >
              Achievements
            </NavLink>
            <NavLink
              to="/contact"
              className={isActive("/contact") ? "active" : ""}
            >
              Contact
            </NavLink>
          </Nav>
          <MobileMenuButton
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </MobileMenuButton>
        </HeaderContent>
      </HeaderContainer>

      <MobileMenu
        initial="closed"
        animate={isMobileMenuOpen ? "open" : "closed"}
        variants={mobileMenuVariants}
        transition={{ duration: 0.3 }}
      >
        <MobileNavLink
          to="/skills"
          className={isActive("/skills") ? "active" : ""}
        >
          Skills
        </MobileNavLink>
        <MobileNavLink
          to="/experience"
          className={isActive("/experience") ? "active" : ""}
        >
          Experience
        </MobileNavLink>
        <MobileNavLink
          to="/achievements"
          className={isActive("/achievements") ? "active" : ""}
        >
          Achievements
        </MobileNavLink>
        <MobileNavLink
          to="/contact"
          className={isActive("/contact") ? "active" : ""}
        >
          Contact
        </MobileNavLink>
      </MobileMenu>
    </>
  );
};

export default Header;
