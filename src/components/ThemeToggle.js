import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const ToggleButton = styled(motion.button)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${(props) => (props.isDark ? "#fb9038" : "#1a2a3a")};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.isDark ? "#1a2a3a" : "#fb9038")};
  font-size: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  &:hover {
    transform: scale(1.1);
  }
`;

const ThemeToggle = ({ isDark, toggleTheme }) => {
  return (
    <ToggleButton
      isDark={isDark}
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {isDark ? "☀️" : "🌙"}
    </ToggleButton>
  );
};

export default ThemeToggle;
