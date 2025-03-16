import React, { useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
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

// Define theme colors
const lightTheme = {
  primary: "#fb9038",
  primaryHover: "#e67f27",
  background: "#f0f2f5",
  text: "#2d3436",
  secondaryBackground: "#e1e4e8",
  border: "rgba(251, 144, 56, 0.2)",
  cardBackground: "#f8fafc",
  cardText: "#2d3436",
  shadow: "rgba(0, 0, 0, 0.08)",
};

const darkTheme = {
  primary: "#fb9038",
  primaryHover: "#e67f27",
  background: "#000000",
  text: "#ffffff",
  secondaryBackground: "#111111",
  border: "rgba(251, 144, 56, 0.2)",
  cardBackground: "#1a1a1a",
  cardText: "#ffffff",
  shadow: "rgba(0, 0, 0, 0.3)",
};

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
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isPopupVisible, setIsPopupVisible] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Router>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
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
