import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaDocker,
  FaGit,
  FaGithub,
} from "react-icons/fa";
import {
  SiKubernetes,
  SiJenkins,
  SiMysql,
  SiPostgresql,
  SiPython,
  SiJavascript,
  SiRuby,
} from "react-icons/si";

const PageContainer = styled.div`
  min-height: 100vh;
  position: relative;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("/images/solid-color-image.jpeg");
  background-size: cover;
  background-position: center;
  z-index: 0;
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 1;
  padding: 16px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #fb9038;
  margin-bottom: 24px;
  text-align: center;
  font-family: "Roboto", sans-serif;
  font-weight: 100;
`;

const CategoryContainer = styled(motion.div)`
  margin-bottom: 24px;
`;

const CategoryTitle = styled.h2`
  font-size: 22px;
  font-weight: bold;
  color: #e0e0e0;
  margin-bottom: 16px;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const SkillItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
`;

const SkillName = styled.span`
  margin-top: 8px;
  font-size: 12px;
  color: #ffffff;
  text-align: center;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
`;

const SkillScreen = () => {
  const skillCategories = [
    {
      category: "Programming Languages",
      skills: [
        { name: "Python", icon: <SiPython size={40} color="#3776AB" /> },
        {
          name: "JavaScript",
          icon: <SiJavascript size={40} color="#F7DF1E" />,
        },
        { name: "Ruby", icon: <SiRuby size={40} color="#CC342D" /> },
      ],
    },
    {
      category: "Web Technologies",
      skills: [
        { name: "React", icon: <FaReact size={40} color="#61DAFB" /> },
        { name: "Node.js", icon: <FaNodeJs size={40} color="#339933" /> },
        { name: "HTML5", icon: <FaHtml5 size={40} color="#E34F26" /> },
        { name: "CSS3", icon: <FaCss3Alt size={40} color="#1572B6" /> },
      ],
    },
    {
      category: "DevOps & Cloud",
      skills: [
        { name: "Docker", icon: <FaDocker size={40} color="#2496ED" /> },
        {
          name: "Kubernetes",
          icon: <SiKubernetes size={40} color="#326CE5" />,
        },
        { name: "Jenkins", icon: <SiJenkins size={40} color="#D24939" /> },
        { name: "Git", icon: <FaGit size={40} color="#F05032" /> },
        {
          name: "GitHub Actions",
          icon: <FaGithub size={40} color="#2088FF" />,
        },
      ],
    },
    {
      category: "Databases",
      skills: [
        { name: "MySQL", icon: <SiMysql size={40} color="#4479A1" /> },
        {
          name: "PostgreSQL",
          icon: <SiPostgresql size={40} color="#336791" />,
        },
      ],
    },
  ];

  return (
    <PageContainer>
      <BackgroundImage />
      <ContentContainer>
        <Header>Skills & Technologies</Header>

        {skillCategories.map((category, categoryIndex) => (
          <CategoryContainer
            key={categoryIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.2 }}
          >
            <CategoryTitle>{category.category}</CategoryTitle>
            <SkillsGrid>
              {category.skills.map((skill, skillIndex) => (
                <SkillItem
                  key={skillIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {skill.icon}
                  <SkillName>{skill.name}</SkillName>
                </SkillItem>
              ))}
            </SkillsGrid>
          </CategoryContainer>
        ))}
      </ContentContainer>
    </PageContainer>
  );
};

export default SkillScreen;
