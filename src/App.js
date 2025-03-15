import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainScreen from "./pages/MainScreen";
import SkillScreen from "./pages/SkillScreen";
import AchievementScreen from "./pages/AchievementScreen";
import ExperienceScreen from "./pages/ExperienceScreen";
import ContactScreen from "./pages/ContactScreen";
import Popup from "./components/Popup";
import { GlobalFonts } from "./utils/fontLoader";
import "./App.css";

function App() {
  // State to control the visibility of the popup
  const [isPopupVisible, setIsPopupVisible] = useState(true);

  return (
    <div className="app-container">
      <GlobalFonts />
      <Router>
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/skills" element={<SkillScreen />} />
          <Route path="/achievements" element={<AchievementScreen />} />
          <Route path="/experience" element={<ExperienceScreen />} />
          <Route path="/contact" element={<ContactScreen />} />
        </Routes>
      </Router>

      {/* Conditionally render the popup */}
      {isPopupVisible && <Popup onClose={() => setIsPopupVisible(false)} />}
    </div>
  );
}

export default App;
