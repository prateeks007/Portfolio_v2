// src/App.js

import React, { useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import MainScreen from "./pages/MainScreen";
import SkillScreen from "./pages/SkillScreen";
import AchievementScreen from "./pages/AchievementScreen";
import ExperienceScreen from "./pages/ExperienceScreen";
import ContactScreen from "./pages/ContactScreen";
import ComingSoonPage from "./pages/ComingSoonPage"; // <-- Ensure this import is here and correct
import Layout from "./components/Layout";
import ThemeToggle from "./components/ThemeToggle";
import ScrollProgress from "./components/ScrollProgress";
import ScrollToTop from "./components/ScrollToTop";
import { GlobalFonts } from "./utils/fontLoader";
import "./App.css";

// --- THEME DEFINITIONS (Keeping your latest provided definitions) ---
const lightTheme = {
  // Core colors
  primary: "#00bcd4", // Cyan
  primaryR: 0, primaryG: 188, primaryB: 212,
  accentLight: "#00e572", // Green
  accentLightR: 0, accentLightG: 229, accentLightB: 114,

  // Backgrounds
  pageBackground: "#f0f2f5", // Soft off-white
  gradientStart: "#e8ecf1", // Subtle gradient start
  gradientEnd: "#f0f2f5",
  animatedOverlay1: "rgba(0, 188, 212, 0.02)",
  animatedOverlay2: "rgba(0, 229, 114, 0.02)",

  // Card
  cardBackground: "#ffffff",
  cardBorder: "rgba(0, 0, 0, 0.03)",
  cardShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
  cardHoverBackground: "#f9f9f9",

  // Text & Accents
  headerText: "#00bcd4",
  titleText: "#222222",
  companyText: "#495057",
  dateText: "#6C757D",
  responsibilityText: "#6C757D",
  bulletColor: "#00bcd4",
  buttonText: "#ffffff",

  // Dividers & Glass
  dividerColor: "rgba(0, 188, 212, 0.1)",
  dividerGradientEnd: "rgba(0, 229, 114, 0.1)",
  glassBackground: "rgba(255, 255, 255, 0.4)",
  glassBorder: "rgba(0, 0, 0, 0.05)",
  glassShadow: "0 5px 10px rgba(0, 0, 0, 0.08)",

  // Name gradient flag: Set to false for crisp text in light mode
  nameGradient: false,

  // Shadows & Glows
  primaryGlow: "rgba(0, 188, 212, 0.05)",
  accentLightGlow: "rgba(0, 229, 114, 0.05)",
  cardHoverShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",

  // Border Radii for consistency
  borderRadiusSm: '8px',
  borderRadiusMd: '12px',
  borderRadiusLg: '16px',
};

const darkTheme = {
  // Core colors
  primary: "#00bcd4",
  primaryR: 0, primaryG: 188, primaryB: 212,
  accentLight: "#00e572",
  accentLightR: 0, accentLightG: 229, accentLightB: 114,
  background: "#0a0a0a",
  gradientStart: "#1a1a1a",
  gradientEnd: "#0a0a0a",
  animatedOverlay1: "rgba(0, 188, 212, 0.08)",
  animatedOverlay2: "rgba(0, 229, 114, 0.08)",

  // Card
  cardBackground: "#1e1e1e",
  cardBorder: "rgba(255, 255, 255, 0.05)",
  cardShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
  cardHoverBackground: "#2a2a2a",

  // Text & Accents
  headerText: "#00bcd4",
  titleText: "#f0f0f0",
  companyText: "#e0e0e0",
  dateText: "#b0b0b0",
  responsibilityText: "#b0b0b0",
  bulletColor: "#00bcd4",
  buttonText: "#ffffff",

  // Dividers & Glass
  dividerColor: "rgba(0, 188, 212, 0.3)",
  dividerGradientEnd: "rgba(0, 229, 114, 0.3)",
  glassBackground: "rgba(30, 30, 30, 0.6)",
  glassBorder: "rgba(255, 255, 255, 0.1)",
  glassShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",

  // Name gradient flag
  nameGradient: true,

  // Shadows & Glows
  primaryGlow: "rgba(0, 188, 212, 0.6)",
  accentLightGlow: "rgba(0, 229, 114, 0.6)",
  cardHoverShadow: "0 15px 40px rgba(0, 0, 0, 0.5)",

  // Border Radii for consistency
  borderRadiusSm: '8px',
  borderRadiusMd: '12px',
  borderRadiusLg: '16px',
};


// --- Global Styles ---
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', sans-serif;
    line-height: 1.6;
    background-color: ${(props) => props.theme.pageBackground};
    color: ${(props) => props.theme.titleText};
    overflow-x: hidden;
    transition: background-color 0.5s ease, color 0.5s ease;
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overscroll-behavior-y: contain;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    font-family: 'Inter', sans-serif;
  }

  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  ::-webkit-scrollbar-track {
    background: ${(props) => props.theme.pageBackground};
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.primary}80;
    border-radius: 5px;
    border: 1px solid ${(props) => props.theme.cardBorder};
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme.primary};
  }
`;

// --- Page Transition Variants (kept as is) ---
const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

// --- MODIFIED: AnimatedRoutes now receives theme and toggleTheme ---
function AnimatedRoutes({ theme, toggleTheme }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <Layout theme={theme} toggleTheme={toggleTheme}>
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
              >
                <MainScreen theme={theme} toggleTheme={toggleTheme} />
              </motion.div>
            </Layout>
          }
        />
        <Route
          path="/skills"
          element={
            <Layout theme={theme} toggleTheme={toggleTheme}>
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
              >
                <SkillScreen theme={theme} toggleTheme={toggleTheme} />
              </motion.div>
            </Layout>
          }
        />
        <Route
          path="/experience"
          element={
            <Layout theme={theme} toggleTheme={toggleTheme}>
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
              >
                <ExperienceScreen theme={theme} toggleTheme={toggleTheme} />
              </motion.div>
            </Layout>
          }
        />
        <Route
          path="/achievements"
          element={
            <Layout theme={theme} toggleTheme={toggleTheme}>
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
              >
                <AchievementScreen theme={theme} toggleTheme={toggleTheme} />
              </motion.div>
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout theme={theme} toggleTheme={toggleTheme}>
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
              >
                <ContactScreen theme={theme} toggleTheme={toggleTheme} />
              </motion.div>
            </Layout>
          }
        />
        {/* CORRECTED POSITION: The ComingSoonPage route should be directly here */}
        <Route path="/blog-coming-soon" element={<ComingSoonPage theme={theme} />} />
      </Routes>
    </AnimatePresence>
  );
}

// --- Main App Component ---
function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  return (
    <Router>
      <ThemeProvider theme={currentTheme}>
        <GlobalStyle />
        <motion.div
          className="app-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <GlobalFonts />
          <ScrollToTop theme={currentTheme} />
          <ThemeToggle isDark={isDarkMode} toggleTheme={toggleTheme} />
          <ScrollProgress theme={currentTheme} />
          <AnimatedRoutes theme={currentTheme} toggleTheme={toggleTheme} />
        </motion.div>
      </ThemeProvider>
    </Router>
  );
}

export default App;