import React, { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Mainscreen from "./pages/MainScreen";
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

function App() {
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : true;
  });

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <div className="app-container">
        <GlobalFonts />
        <Router>
          <ScrollProgress />
          <Layout>
            <Routes>
              <Route path="/" element={<Mainscreen />} />
              <Route path="/skills" element={<SkillScreen />} />
              <Route path="/achievements" element={<AchievementScreen />} />
              <Route path="/experience" element={<ExperienceScreen />} />
              <Route path="/contact" element={<ContactScreen />} />
            </Routes>
          </Layout>
          <ThemeToggle isDark={isDarkMode} toggleTheme={toggleTheme} />
          <ScrollToTop />
        </Router>

        {isPopupVisible && <Popup onClose={() => setIsPopupVisible(false)} />}
      </div>
    </ThemeProvider>
  );
}

export default App;
