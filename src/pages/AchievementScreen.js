// src/pages/AchievementScreen.js (UPDATED)
import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { motion, useAnimation } from "framer-motion";
// No need for useInView here anymore, it's in AchievementCardItem
import AchievementCardItem from "../components/AchievementCardItem"; // Import the new component

// --- Keyframe Animations for Background (from ExperienceScreen) ---
const subtleShiftBackground = keyframes`
  0% { background-position: 0% 50%; }
  25% { background-position: 50% 75%; }
  50% { background-position: 100% 50%; }
  75% { background-position: 50% 25%; }
  100% { background-position: 0% 50%; }
`;

// --- Styled Components (Only global ones and AchievementContainer remain) ---

const PageContainer = styled.div`
  min-height: 100vh;
  position: relative;
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.gradientStart} 0%,
    ${(props) => props.theme.gradientEnd} 100%
  );
  color: ${(props) => props.theme.titleText};
  font-family: 'Inter', sans-serif;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 80px 0;

  @media (max-width: 768px) {
    padding: 40px 0;
  }
`;

const AnimatedBackgroundOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    ${(props) => props.theme.animatedOverlay1},
    ${(props) => props.theme.animatedOverlay2}
  );
  background-size: 200% 200%;
  animation: ${subtleShiftBackground} 40s ease-in-out infinite alternate;
  opacity: 0.15;
  z-index: 0;
  pointer-events: none;
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 1;
  padding: 60px 20px;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 40px 15px;
  }
`;

const Header = styled(motion.h1)`
  font-size: 52px;
  font-weight: 800;
  color: ${(props) => props.theme.headerText};
  margin-bottom: 70px;
  text-align: center;
  font-family: "Roboto", sans-serif;
  letter-spacing: -0.04em;
  text-shadow: 0 0 30px ${(props) => props.theme.primary}B0;

  @media (max-width: 768px) {
    font-size: 42px;
    margin-bottom: 50px;
  }
  @media (max-width: 480px) {
    font-size: 36px;
    margin-bottom: 40px;
  }
`;

const AchievementContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 35px;
`;

// --- Animation Variants (Only for Header, Card variants moved to AchievementCardItem) ---

const headerVariants = {
  hidden: { opacity: 0, y: -80, rotateX: 15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: "spring", stiffness: 70, damping: 10, delay: 0.3 },
  },
};

// --- Component ---

const AchievementScreen = () => {
  const headerControls = useAnimation();

  useEffect(() => {
    headerControls.start("visible");
  }, [headerControls]);

  const achievements = [
    // Your achievement data (unchanged)
    {
      title: "Outstanding Team",
      organization: "EOX Vantage",
      date: "Mar 2025",
      description:
        "Won the Outstanding Team Award at EOX Vantage for our contributions to the organization.",
      badges: ["Leadership", "Teamwork", "Project Success"]
    },
    {
      title: "Outstanding Performer",
      organization: "EOX Vantage",
      date: "OCT 2024",
      description:
        "Won the Outstanding Performer Award at EOX Vantage for my contributions to the team.",
      badges: ["Individual Contribution", "Excellence", "Innovation"]
    },
    {
      title: "Outstanding Team",
      organization: "EOX Vantage",
      date: "May 2024",
      description:
        "Won the Outstanding Team Award at EOX Vantage for our contributions to the organization.",
      badges: ["Collaboration", "Teamwork", "Impact"]
    },
    {
      title: "Winner of NetApp Hackathon",
      organization: "PES University",
      date: "OCT 2022",
      description: "Winner of NetApp Hackathon from PES University.",
      badges: ["Hackathon", "Networking", "Solution Design"]
    },
    {
      title: "Meta Global Hackathon Top 400",
      organization: "Meta",
      date: "SEP 2022",
      description:
        "One of the top 400 winners in Meta Global Hackathon out of 3000+ participants.",
      badges: ["Global Competition", "Coding", "Problem Solving"]
    },
    {
      title: "Zoho Creator Challenge Qualifier",
      organization: "Hackerearth",
      date: "AUG 2022",
      description:
        "Qualified for the prototyping round of Zoho Creator Build an App Challenge on Hackerearth.",
      badges: ["Prototyping", "Low-Code", "API Integration"]
    },
    {
      title: "Google Code Jam Qualifier",
      organization: "Google",
      date: "APR 2022",
      description: "Cleared the qualification round of Google Code Jam.",
      badges: ["Competitive Programming", "Algorithms", "Data Structures"]
    },
    {
      title: "Codechef Global Rank 157",
      organization: "Codechef",
      date: "FEB 2022",
      description:
        "Global Rank: 157 in February Long 2022 - II, Division 3 on Codechef.",
      badges: ["Competitive Programming", "Speed", "Accuracy"]
    },
    {
      title: "Hacktoberfest 2020",
      organization: "Digital Ocean",
      date: "OCT 2020",
      description: "Successfully completed Hacktoberfest 2020.",
      badges: ["Open Source", "Contribution", "Git/GitHub"]
    },
    {
      title: "PES University Ideathon Winner",
      organization: "PES University",
      date: "AUG 2019",
      description:
        "Led a team of 6 members and stood first among 30+ teams in an ideathon held by my university, for creating a simple prototype for a portable bottle capable of producing drinkable water on the go.",
      badges: ["Ideation", "Team Lead", "Innovation", "Prototyping"]
    },
    {
      title: "TechnoSpark First Place",
      organization: "SDIT",
      date: "JUL 2018",
      description:
        "TechnoSpark, SDIT, stood first among 200+ teams by leading a team of 4 members and developing a model to replace inefficient road transportation vehicles by a proposed electric vehicle thus reducing the loss per annum to a nation's economy.",
      badges: ["Problem Solving", "Engineering", "Presentation"]
    },
  ];

  return (
    <PageContainer>
      <AnimatedBackgroundOverlay />

      <ContentContainer>
        <Header
          variants={headerVariants}
          initial="hidden"
          animate={headerControls}
        >
          My Achievements
        </Header>

        <AchievementContainer>
          {achievements.map((achievement, index) => (
            // Render the new component for each achievement
            <AchievementCardItem key={index} achievement={achievement} />
          ))}
        </AchievementContainer>
      </ContentContainer>
    </PageContainer>
  );
};

export default AchievementScreen;