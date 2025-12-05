// src/pages/SkillScreen.jsx

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaPython,
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaDocker,
  FaGit,
  FaGithub,
  FaJenkins,
  FaAws,
  FaBug,
  FaShieldAlt,
  FaSearch,
  FaDatabase,
  FaCode,
} from "react-icons/fa";
import {
  SiJavascript,
  SiKubernetes,
  SiMysql,
  SiPostgresql,
  SiGo,
  SiGnubash,
  SiVuedotjs,
  SiFlask,
  SiTerraform,
  SiCircleci,
  SiMongodb,
} from "react-icons/si";
import { MdSecurity, MdStorage } from "react-icons/md";

// --- Reusable CSS Mixins ---
// Ensure this mixin is either imported or defined globally if used elsewhere,
// or keep a local copy if only for this file.
const gradientHighlight = (theme) => `
  background: linear-gradient(120deg, ${theme.primary} 0%, ${theme.accentLight} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text; 
  color: transparent; 
`;

// --- Styled Components (UPDATED for better sleekness and glow control) ---

const PageContainer = styled(motion.div)` 
  min-height: 100vh;
  /* Unified background with MainScreen for consistency */
  background: radial-gradient(
    circle at 50% -10%,
    ${(props) => props.theme.gradientEnd} 0%,
    ${(props) => props.theme.background} 100%
  );
  color: ${(props) => props.theme.titleText}; 
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
  transition: background 0.5s ease, color 0.5s ease; /* Smoother theme transition */
  overflow: hidden; 
`;

const Content = styled.div`
  flex: 1;
  width: 100%;
  max-width: 1200px; /* Standardized max-width for consistency across pages */
  margin: 0 auto;
  padding: 4rem 1.5rem; /* Ample padding */
  box-sizing: border-box; /* Include padding in width calculation */

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const Header = styled(motion.h1)`
  font-family: 'Outfit', sans-serif; 
  font-size: 3.8rem; 
  text-align: center;
  /* Apply gradient for title */
  ${(props) => gradientHighlight(props.theme)};
  margin-bottom: 4rem;
  font-weight: 800; 
  letter-spacing: -0.06em; 
  /* Use theme-defined glow for header */
  text-shadow: 0 4px 20px ${(props) => props.theme.primaryGlow}; 


  @media (max-width: 1024px) {
    font-size: 3rem;
  }
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 3rem;
  }
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const CategorySection = styled(motion.section)`
  margin-bottom: 5rem; 

  @media (max-width: 768px) {
    margin-bottom: 3.5rem;
  }
`;

const CategoryTitle = styled.h2`
  font-family: 'Outfit', sans-serif; 
  font-size: 2.2rem; 
  color: ${(props) => props.theme.titleText}; 
  text-align: center;
  margin-bottom: 2.5rem; 
  position: relative;
  font-weight: 700; 
  letter-spacing: -0.02em;

  &::after {
    content: '';
    width: 6rem; 
    height: 4px; 
    background: linear-gradient(90deg, transparent, ${(props) => props.theme.primary}, ${(props) => props.theme.accentLight}, transparent); 
    display: block;
    margin: 1rem auto 0; 
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 2rem;
    &::after {
      width: 5rem;
      height: 3px;
    }
  }
  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem; 

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    padding: 0 1rem; 
  }
`;

const SkillCard = styled(motion.div)`
  background: ${(props) => props.theme.cardBackground};
  backdrop-filter: blur(10px);
  border: 1px solid ${(props) => props.theme.cardBorder};
  border-radius: ${(props) => props.theme.borderRadiusLg}; /* Standardized border-radius from theme */
  padding: 2rem; 
  text-align: center;
  /* Use theme-defined card shadow */
  box-shadow: ${(props) => props.theme.cardShadow}; 
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); 


  &:hover {
    background: ${(props) => props.theme.cardHoverBackground}; 
    border-color: ${(props) => props.theme.primary}A0; 
    transform: translateY(-8px) scale(1.01); 
    /* Use theme-defined card hover shadow AND a primary glow */
    box-shadow: 
      ${(props) => props.theme.cardHoverShadow},
      0 0 30px ${(props) => props.theme.primaryGlow}; 
  }

  &:focus { /* Added focus style for accessibility */
    outline: 2px solid ${(props) => props.theme.primary}80;
    outline-offset: 4px;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

const SkillIcon = styled(motion.div)` 
  font-size: 3.5rem; 
  margin-bottom: 1rem;
  color: ${(props) => props.theme.primary};
  /* Use theme-defined primaryGlow for icon initial state */
  filter: drop-shadow(0 0 8px ${(props) => props.theme.primaryGlow}); 
  transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1); 

  ${SkillCard}:hover & { 
    transform: translateY(-6px) rotate(2deg) scale(1.08); 
    color: ${(props) => props.theme.accentLight}; 
    /* Use theme-defined accentLightGlow for icon hover state */
    filter: drop-shadow(0 0 15px ${(props) => props.theme.accentLightGlow}); 
  }

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;


const SkillName = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1.2rem; 
  color: ${(props) => props.theme.titleText};
  margin-bottom: 0.8rem; 
  font-weight: 600; 

  ${SkillCard}:hover & {
    color: ${(props) => props.theme.primary}; 
    transform: translateY(-4px); 
    transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px; 
  background: ${(props) => props.theme.cardBackgroundAlt}; 
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, ${(props) => props.theme.primary}, ${(props) => props.theme.accentLight});
  border-radius: 4px;
`;

// --- Animation Variants ---

const pageEntranceVariants = { 
  hidden: { opacity: 0, scale: 0.98, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1.0, 
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.15, 
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -30,
    transition: { duration: 0.8, ease: "easeIn" }
  }
};


const headerVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const categoryVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const skillCardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

// --- Data (UNCHANGED) ---

const skillCategories = [
  {
    category: "Programming Languages",
    skills: [
      { name: "Python", icon: <FaPython />, proficiency: 85 },
      { name: "Bash/Shell", icon: <SiGnubash />, proficiency: 80 },
      { name: "SQL", icon: <FaDatabase />, proficiency: 75 },
      { name: "JavaScript", icon: <SiJavascript />, proficiency: 40 },
      { name: "Go", icon: <SiGo />, proficiency: 25 },
    ],
  },
  {
    category: "Web Technologies",
    skills: [
      { name: "React", icon: <FaReact />, proficiency: 60 },
      { name: "Vue.js", icon: <SiVuedotjs />, proficiency: 65 },
      { name: "Node.js", icon: <FaNodeJs />, proficiency: 65 },
      { name: "Flask", icon: <SiFlask />, proficiency: 70 },
      { name: "HTML5", icon: <FaHtml5 />, proficiency: 75 },
      { name: "CSS3", icon: <FaCss3Alt />, proficiency: 70 },
    ],
  },
  {
    category: "DevOps & Cloud",
    skills: [
      { name: "Docker", icon: <FaDocker />, proficiency: 95 },
      { name: "Kubernetes", icon: <SiKubernetes />, proficiency: 90 },
      { name: "Terraform", icon: <SiTerraform />, proficiency: 85 },
      { name: "Git", icon: <FaGit />, proficiency: 95 },
      { name: "GitHub Actions", icon: <FaGithub />, proficiency: 90 },
      { name: "AWS", icon: <FaAws />, proficiency: 85 },
      { name: "Jenkins", icon: <FaJenkins />, proficiency: 70 },
      { name: "CircleCI", icon: <SiCircleci />, proficiency: 75 },
      { name: "Elasticsearch", icon: <MdStorage />, proficiency: 85 },
    ],
  },
  {
    category: "Databases",
    skills: [
      { name: "MongoDB Atlas", icon: <SiMongodb />, proficiency: 80 },
      { name: "PostgreSQL", icon: <SiPostgresql />, proficiency: 75 },
      { name: "MySQL", icon: <SiMysql />, proficiency: 75 },
    ],
  },
  {
    category: "Security",
    skills: [
      { name: "Wazuh (SIEM)", icon: <MdSecurity />, proficiency: 85 },
      { name: "OWASP ZAP", icon: <FaShieldAlt />, proficiency: 80 },
      { name: "Burp Suite", icon: <FaBug />, proficiency: 75 },
      { name: "Metasploit", icon: <FaCode />, proficiency: 70 },
      { name: "sqlmap", icon: <FaDatabase />, proficiency: 80 },
      { name: "Pen Testing", icon: <FaShieldAlt />, proficiency: 85 },
      { name: "Snyk", icon: <FaShieldAlt />, proficiency: 75 },
      { name: "Semgrep", icon: <FaCode />, proficiency: 70 },
      { name: "Faraday", icon: <FaSearch />, proficiency: 65 },
    ],
  },
];

// --- Component ---

const SkillScreen = ({ theme }) => { 
  // Defensive check for theme, though it should ideally be provided by ThemeProvider
  if (!theme) {
    console.warn("Theme not provided to SkillScreen. Using default dark theme.");
    // This default theme should ideally align with your default darkTheme in App.js
    theme = {
      primary: "#00bcd4",
      primaryR: 0, primaryG: 188, primaryB: 212,
      accentLight: "#00e572",
      accentLightR: 0, accentLightG: 229, accentLightB: 114,
      background: "#0a0a0a",
      gradientEnd: "#1a1a1a",
      text: "#ffffff",
      titleText: "#f0f0f0",
      softText: "#b0b0b0",
      buttonText: "#0a0a0a",
      cardBackground: "#1e1e1e",
      cardBackgroundAlt: "#282828",
      glassBackground: "rgba(30, 30, 30, 0.2)",
      glassBorder: "rgba(255, 255, 255, 0.08)",
      cardBorder: "rgba(255, 255, 255, 0.05)",
      nameGradient: true,
      cardShadow: "0 8px 30px rgba(0, 0, 0, 0.3)", // Example for dark theme
      cardHoverShadow: "0 15px 40px rgba(0, 0, 0, 0.5)", // Example for dark theme
      primaryGlow: "rgba(0, 188, 212, 0.6)", // Example for dark theme
      accentLightGlow: "rgba(0, 229, 114, 0.6)", // Example for dark theme
      borderRadiusLg: '16px', // Example for dark theme
      cardHoverBackground: "#2a2a2a", // Example for dark theme
    };
  }

  return (
    <PageContainer
      theme={theme}
      variants={pageEntranceVariants} 
      initial="hidden"
      animate="visible"
      exit="exit" 
    >
      <Content>
        <Header
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          theme={theme}
        >
          Skills & Technologies
        </Header>

        {/* Use whileInView for staggered animations as sections scroll into view */}
        <motion.div
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }} 
          initial="hidden"
          whileInView="visible" 
          viewport={{ once: true, amount: 0.2 }} 
        >
          {skillCategories.map((cat, i) => (
            <CategorySection key={i} variants={categoryVariants}>
              <CategoryTitle theme={theme}>{cat.category}</CategoryTitle>
              <SkillsGrid>
                {cat.skills.map((skill, idx) => (
                  <SkillCard
                    key={idx}
                    variants={skillCardVariants}
                    whileTap={{ scale: 0.98 }}
                    theme={theme}
                  >
                    <SkillIcon theme={theme}>{skill.icon}</SkillIcon> 
                    <SkillName theme={theme}>{skill.name}</SkillName>
                    <ProgressBar theme={theme}>
                      <ProgressFill
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.proficiency}%` }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        theme={theme}
                      />
                    </ProgressBar>
                  </SkillCard>
                ))}
              </SkillsGrid>
            </CategorySection>
          ))}
        </motion.div>
      </Content>
    </PageContainer>
  );
};

export default SkillScreen;