// SkillScreen.jsx
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
  // FaLinux, // REMOVED as per request
  // FaWindows, // REMOVED as per request
} from "react-icons/fa";
import {
  SiJavascript,
  SiRuby,
  SiKubernetes,
  SiMysql,
  SiPostgresql,
  // SiTypescript, // REMOVED as per request
  // SiGraphql, // REMOVED as per request
  // SiMongodb, // REMOVED as per request
  // SiRedis, // REMOVED as per request
  // SiGooglecloud, // REMOVED as per request
} from "react-icons/si";
import { MdSecurity, MdStorage } from "react-icons/md"; // MdCloud also removed

// --- Styled Components (UNCHANGED from the "much better" version) ---
// These styles provide the modern, sleek look.

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0d0d0d, #151515); /* Slightly darker, more subtle gradient */
  color: #e0e0e0; /* Softer white */
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center content horizontally */
  padding: 2rem 0; /* Add some top/bottom padding */
`;

const Content = styled.div`
  flex: 1;
  width: 100%; /* Use full width and max-width */
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 1.5rem; /* Increase horizontal padding slightly */
`;

const Header = styled(motion.h1)`
  font-size: 3rem; /* Larger header */
  text-align: center;
  color: #f7a43e; /* Brighter, more vibrant orange/gold */
  margin-bottom: 4rem; /* More space below header */
  font-weight: 700; /* Bolder */
  letter-spacing: -0.05em; /* Tighter letter spacing for a modern look */
  text-shadow: 0 0 15px rgba(247, 164, 62, 0.4); /* Subtle glow */

  @media (max-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 3rem;
  }
`;

const CategorySection = styled(motion.section)`
  margin-bottom: 4rem; /* More spacing between categories */
`;

const CategoryTitle = styled.h2`
  font-size: 1.8rem; /* Slightly larger category titles */
  color: #f7a43e; /* Match header accent color */
  text-align: center;
  margin-bottom: 2rem; /* More space below title */
  position: relative;
  font-weight: 600;

  &::after {
    content: '';
    width: 5rem; /* Wider underline */
    height: 3px; /* Thicker underline */
    background: linear-gradient(90deg, transparent, #f7a43e, transparent); /* Gradient underline */
    display: block;
    margin: 0.75rem auto 0;
    border-radius: 2px; /* Rounded ends */
  }

  @media (max-width: 768px) {
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.8rem; /* Slightly larger gap */

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const SkillCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.08); /* Slightly more opaque for better contrast */
  backdrop-filter: blur(10px); /* Increased blur */
  border: 1px solid rgba(255, 255, 255, 0.15); /* Slightly more prominent border */
  border-radius: 18px; /* Slightly more rounded corners */
  padding: 1.8rem; /* Increased padding */
  text-align: center;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4); /* Deeper, softer shadow */
  transition: transform 0.2s ease-out, background 0.2s ease-out, border-color 0.2s ease-out; /* Smooth transition for hover */

  &:hover {
    background: rgba(255, 255, 255, 0.12); /* Brighter on hover */
    border-color: rgba(247, 164, 62, 0.5); /* Accent border on hover */
  }

  svg {
    font-size: 2.5rem; /* Larger icons */
    margin-bottom: 0.8rem;
    color: #f7a43e; /* Icon color matches accent */
    filter: drop-shadow(0 0 5px rgba(247, 164, 62, 0.3)); /* Subtle icon glow */
  }
`;

const SkillName = styled.p`
  font-size: 1.1rem; /* Slightly larger skill name */
  color: #f8f8f8;
  margin-bottom: 0.75rem;
  font-weight: 500;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px; /* Thicker progress bar */
  background: #282828; /* Darker background for contrast */
  border-radius: 4px; /* More rounded */
  overflow: hidden;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #f7a43e, #ff6b6b); /* More vibrant gradient */
  border-radius: 4px;
`;

// --- Animation Variants (UNCHANGED from the "much better" version) ---

const headerVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Stagger categories slightly
      delayChildren: 0.5, // Delay before categories start animating
    },
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
      when: "beforeChildren", // Animate category title before cards
      staggerChildren: 0.08, // Stagger skill cards within each category
      delayChildren: 0.2, // Delay for skill cards within category
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
      stiffness: 100, // Softer spring
      damping: 12,
    },
  },
};

// --- Data (REVERTED to your ORIGINAL set) ---

const skillCategories = [
  {
    category: "Programming Languages",
    skills: [
      { name: "Python", icon: <FaPython />, proficiency: 80 },
      { name: "JavaScript", icon: <SiJavascript />, proficiency: 50 },
      { name: "Ruby", icon: <SiRuby />, proficiency: 20 },
    ],
  },
  {
    category: "Web Technologies",
    skills: [
      { name: "React", icon: <FaReact />, proficiency: 45 },
      { name: "Node.js", icon: <FaNodeJs />, proficiency: 55 },
      { name: "HTML5", icon: <FaHtml5 />, proficiency: 60 },
      { name: "CSS3", icon: <FaCss3Alt />, proficiency: 55 },
    ],
  },
  {
    category: "DevOps & Cloud",
    skills: [
      { name: "Docker", icon: <FaDocker />, proficiency: 90 },
      { name: "Kubernetes", icon: <SiKubernetes />, proficiency: 90 },
      { name: "Jenkins", icon: <FaJenkins />, proficiency: 70 },
      { name: "Git", icon: <FaGit />, proficiency: 95 },
      { name: "GitHub Actions", icon: <FaGithub />, proficiency: 90 },
      { name: "AWS", icon: <FaAws />, proficiency: 75 },
      { name: "Elasticsearch", icon: <MdStorage />, proficiency: 85 },
    ],
  },
  {
    category: "Databases",
    skills: [
      { name: "MySQL", icon: <SiMysql />, proficiency: 75 },
      { name: "PostgreSQL", icon: <SiPostgresql />, proficiency: 70 },
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

const SkillScreen = () => {
  return (
    <PageContainer>
      <Content>
        <Header
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          Skills & Technologies
        </Header>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {skillCategories.map((cat, i) => (
            <CategorySection key={i} variants={categoryVariants}>
              <CategoryTitle>{cat.category}</CategoryTitle>
              <SkillsGrid>
                {cat.skills.map((skill, idx) => (
                  <SkillCard
                    key={idx}
                    variants={skillCardVariants}
                    whileHover={{ scale: 1.03, boxShadow: "0 12px 40px rgba(0,0,0,0.5)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {skill.icon}
                    <SkillName>{skill.name}</SkillName>
                    <ProgressBar>
                      <ProgressFill
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.proficiency}%` }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
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