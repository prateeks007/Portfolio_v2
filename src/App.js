import React, { useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components"; // Import createGlobalStyle
import { motion, AnimatePresence } from "framer-motion";
import MainScreen from "./pages/MainScreen";
import SkillScreen from "./pages/SkillScreen";
import AchievementScreen from "./pages/AchievementScreen";
import ExperienceScreen from "./pages/ExperienceScreen";
import ContactScreen from "./pages/ContactScreen";
import Layout from "./components/Layout";
import Popup from "./components/Popup";
import ThemeToggle from "./components/ThemeToggle";
import ScrollProgress from "./components/ScrollProgress";
import ScrollToTop from "./components/ScrollToTop";
import { GlobalFonts } from "./utils/fontLoader";
import "./App.css";

// Define theme colors with more granularity for modern styling
const lightTheme = {
  // Core colors from your original theme
  primary: "#fb9038", // Your original primary accent
  primaryHover: "#e67f27", // Your original primary hover accent

  // Backgrounds
  pageBackground: "#f0f2f5", // Light gray background
  gradientStart: "#e8ecf1", // Slightly darker for subtle gradient
  gradientEnd: "#f0f2f5",   // Matches page background for seamless fade
  animatedOverlay1: "rgba(251, 144, 56, 0.05)", // Subtle primary for animated overlay
  animatedOverlay2: "rgba(230, 127, 39, 0.05)", // Subtle primaryHover for animated overlay

  // Card
  cardBackground: "#ffffff", // Clean white solid card background
  cardBorder: "rgba(0, 0, 0, 0.1)", // Soft dark border for cards
  cardShadow: "rgba(0, 0, 0, 0.15)", // Light, soft shadow for cards
  cardHoverBackground: "#f8f8f8", // Slightly darker on card hover

  // Text & Accents
  headerText: "#fb9038", // Headers use primary accent
  titleText: "#2d3436", // General dark text color for main content
  companyText: "#555555", // Company names slightly softer than main text
  dateText: "#777777",    // Dates softer
  responsibilityText: "#777777", // Responsibility items match dateText
  bulletColor: "#fb9038", // Bullets match primary accent

  // Dividers
  dividerColor: "rgba(251, 144, 56, 0.3)", // Semi-transparent primary for dividers
  dividerGradientEnd: "rgba(230, 127, 39, 0.3)", // Semi-transparent primaryHover for divider gradient
};

const darkTheme = {
  // Core colors from your original theme
  primary: "#fb9038", // Your original primary accent
  primaryHover: "#e67f27", // Your original primary hover accent

  // Backgrounds
  pageBackground: "#000000", // Black background
  gradientStart: "#111111", // Slightly lighter for subtle gradient
  gradientEnd: "#000000",   // Matches page background for seamless fade
  animatedOverlay1: "rgba(251, 144, 56, 0.08)", // Subtle primary for animated overlay
  animatedOverlay2: "rgba(230, 127, 39, 0.08)", // Subtle primaryHover for animated overlay

  // Card
  cardBackground: "#1a1a1a", // Dark solid card background
  cardBorder: "rgba(255, 255, 255, 0.1)", // Subtle light border for cards
  cardShadow: "rgba(0, 0, 0, 0.5)", // Deep shadow for cards
  cardHoverBackground: "#282828", // Slightly lighter on card hover

  // Text & Accents
  headerText: "#fb9038", // Headers use primary accent
  titleText: "#ffffff", // General white text color for main content
  companyText: "#e0e0e0", // Company names slightly softer than main text
  dateText: "#c0c0c0",    // Dates softer
  responsibilityText: "#c0c0c0", // Responsibility items match dateText
  bulletColor: "#fb9038", // Bullets match primary accent

  // Dividers
  dividerColor: "rgba(251, 144, 56, 0.4)", // Semi-transparent primary for dividers
  dividerGradientEnd: "rgba(230, 127, 39, 0.4)", // Semi-transparent primaryHover for divider gradient
};

// --- NEW: Global Styles for html and body to prevent white flash ---
const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    /* THIS IS THE KEY FIX: Set background to match your theme's base background */
    background-color: ${props => props.theme.pageBackground};
    color: ${props => props.theme.titleText}; /* Ensures default text color is also themed */
    scroll-behavior: smooth; /* Optional: smooth scrolling experience */
    -webkit-font-smoothing: antialiased; /* Better font rendering on Webkit */
    -moz-osx-font-smoothing: grayscale; /* Better font rendering on Firefox */

    /* Prevents iOS "rubber band" effect from showing white */
    overscroll-behavior-y: contain;
  }

  /* Optional: Custom Scrollbar Styles (for Webkit browsers like Chrome/Safari) */
  ::-webkit-scrollbar {
    width: 10px; /* Width of the vertical scrollbar */
    height: 10px; /* Height of the horizontal scrollbar */
  }
  ::-webkit-scrollbar-track {
    background: ${props => props.theme.pageBackground}; /* Scrollbar track matches page background */
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.primary}80; /* Use your primary color, slightly transparent */
    border-radius: 5px;
    border: 1px solid ${props => props.theme.cardBorder}; /* Match card borders */
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.primary}; /* Fully opaque primary on hover */
  }
`;

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

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <Layout>
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
              >
                <MainScreen />
              </motion.div>
            </Layout>
          }
        />
        <Route
          path="/skills"
          element={
            <Layout>
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
              >
                <SkillScreen />
              </motion.div>
            </Layout>
          }
        />
        <Route
          path="/experience"
          element={
            <Layout>
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
              >
                <ExperienceScreen />
              </motion.div>
            </Layout>
          }
        />
        <Route
          path="/achievements"
          element={
            <Layout>
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
              >
                <AchievementScreen />
              </motion.div>
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
              >
                <ContactScreen />
              </motion.div>
            </Layout>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true); // Initial state is dark mode
  const [isPopupVisible, setIsPopupVisible] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Router>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        {/* Render GlobalStyle here to apply styles to html and body */}
        <GlobalStyle />
        <motion.div
          className="app-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <GlobalFonts />
          <ScrollToTop />
          <ThemeToggle isDark={isDarkMode} toggleTheme={toggleTheme} />
          <ScrollProgress />
          <AnimatedRoutes />
          {isPopupVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Popup onClose={() => setIsPopupVisible(false)} />
            </motion.div>
          )}
        </motion.div>
      </ThemeProvider>
    </Router>
  );
}

export default App;