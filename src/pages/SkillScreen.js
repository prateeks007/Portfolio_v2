import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
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
  SiRuby,
  SiKubernetes,
  SiMysql,
  SiPostgresql,
} from "react-icons/si";
import { MdSecurity, MdStorage } from "react-icons/md";

const PageContainer = styled.div`
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
  z-index: 0;
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 1;
  padding: 16px;
  max-width: 1000px;
  margin: 0 auto;
  flex: 1;
`;

const Header = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #fb9038;
  margin-bottom: 40px;
  text-align: center;
  font-family: "Roboto", sans-serif;
  font-weight: 100;
`;

const CategoryContainer = styled(motion.div)`
  margin-bottom: 40px;
`;

const CategoryTitle = styled.h2`
  font-size: 24px;
  color: #e0e0e0;
  margin-bottom: 20px;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  border-bottom: 1px solid rgba(251, 144, 56, 0.3);
  padding-bottom: 8px;
  text-align: center;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const SkillItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(40, 44, 52, 0.8);
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  svg {
    font-size: 40px;
    margin-bottom: 12px;
    color: ${(props) => props.iconColor || "#fb9038"};
  }
`;

const SkillName = styled.p`
  font-size: 16px;
  color: #e0e0e0;
  text-align: center;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  margin-bottom: 10px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background-color: #fb9038;
  border-radius: 3px;
`;

const SkillScreen = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const skillCategories = [
    {
      category: "Programming Languages",
      skills: [
        { name: "Python", icon: <FaPython color="#3776AB" />, proficiency: 80 },
        {
          name: "JavaScript",
          icon: <SiJavascript color="#F7DF1E" />,
          proficiency: 50,
        },
        { name: "Ruby", icon: <SiRuby color="#CC342D" />, proficiency: 20 },
      ],
    },
    {
      category: "Web Technologies",
      skills: [
        { name: "React", icon: <FaReact color="#61DAFB" />, proficiency: 45 },
        {
          name: "Node.js",
          icon: <FaNodeJs color="#339933" />,
          proficiency: 55,
        },
        { name: "HTML5", icon: <FaHtml5 color="#E34F26" />, proficiency: 60 },
        { name: "CSS3", icon: <FaCss3Alt color="#1572B6" />, proficiency: 55 },
      ],
    },
    {
      category: "DevOps & Cloud",
      skills: [
        { name: "Docker", icon: <FaDocker color="#2496ED" />, proficiency: 90 },
        {
          name: "Kubernetes",
          icon: <SiKubernetes color="#326CE5" />,
          proficiency: 90,
        },
        {
          name: "Jenkins",
          icon: <FaJenkins color="#D24939" />,
          proficiency: 70,
        },
        { name: "Git", icon: <FaGit color="#F05032" />, proficiency: 95 },
        {
          name: "GitHub Actions",
          icon: <FaGithub color="#ffffff" />,
          proficiency: 90,
        },
        {
          name: "AWS",
          icon: <FaAws color="#FF9900" />,
          proficiency: 75,
        },
        {
          name: "Elasticsearch",
          icon: <MdStorage color="#005571" />,
          proficiency: 85,
        },
      ],
    },
    {
      category: "Databases",
      skills: [
        { name: "MySQL", icon: <SiMysql color="#4479A1" />, proficiency: 75 },
        {
          name: "PostgreSQL",
          icon: <SiPostgresql color="#336791" />,
          proficiency: 70,
        },
      ],
    },
    {
      category: "Security",
      skills: [
        {
          name: "Wazuh (SIEM)",
          icon: <MdSecurity color="#1A73E8" />,
          proficiency: 85,
        },
        {
          name: "OWASP ZAP",
          icon: <FaShieldAlt color="#5B69BC" />,
          proficiency: 80,
        },
        {
          name: "Burp Suite",
          icon: <FaBug color="#FF6633" />,
          proficiency: 75,
        },
        {
          name: "Metasploit",
          icon: <FaCode color="#2A6478" />,
          proficiency: 70,
        },
        {
          name: "sqlmap",
          icon: <FaDatabase color="#4479A1" />,
          proficiency: 80,
        },
        {
          name: "Penetration Testing",
          icon: <FaShieldAlt color="#E34F26" />,
          proficiency: 85,
        },
        {
          name: "Snyk",
          icon: <FaShieldAlt color="#4C4A73" />,
          proficiency: 75,
        },
        {
          name: "Semgrep",
          icon: <FaCode color="#47A248" />,
          proficiency: 70,
        },
        {
          name: "Faraday",
          icon: <FaSearch color="#00A4EF" />,
          proficiency: 65,
        },
      ],
    },
  ];

  return (
    <PageContainer>
      <BackgroundImage />
      <ContentContainer>
        <Header>Skills & Technologies</Header>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {skillCategories.map((category, categoryIndex) => (
            <CategoryContainer key={categoryIndex} variants={itemVariants}>
              <CategoryTitle>{category.category}</CategoryTitle>
              <SkillsGrid>
                {category.skills.map((skill, skillIndex) => (
                  <SkillItem
                    key={skillIndex}
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.05,
                      transition: { type: "spring", stiffness: 300 },
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {skill.icon}
                    <SkillName>{skill.name}</SkillName>
                    <ProgressBar>
                      <ProgressFill
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.proficiency}%` }}
                        transition={{ delay: 0.5, duration: 1 }}
                      />
                    </ProgressBar>
                  </SkillItem>
                ))}
              </SkillsGrid>
            </CategoryContainer>
          ))}
        </motion.div>
      </ContentContainer>
    </PageContainer>
  );
};

export default SkillScreen;
