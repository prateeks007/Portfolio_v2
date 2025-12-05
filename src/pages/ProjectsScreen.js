import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { motion, useAnimation } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaDocker } from "react-icons/fa";
import { SiGo, SiMongodb, SiPython, SiVuedotjs, SiFlask, SiGooglecloud } from "react-icons/si";

const subtleShiftBackground = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

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
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;

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
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const ProjectCard = styled(motion.div)`
  background: ${(props) => props.theme.cardBackground};
  border-radius: 20px;
  padding: 35px;
  box-shadow: 0 15px 45px ${(props) => props.theme.cardShadow};
  border: 1px solid ${(props) => props.theme.cardBorder};
  transition: all 0.3s ease-out;

  &:hover {
    transform: translateY(-10px);
    background: ${(props) => props.theme.cardHoverBackground};
    box-shadow: 0 20px 60px ${(props) => props.theme.cardShadow}A0;
    border-color: ${(props) => props.theme.primary}50;
  }
`;

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const ProjectTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: ${(props) => props.theme.primary};
  margin-bottom: 8px;
  font-family: "Roboto", sans-serif;
`;

const ProjectYear = styled.span`
  font-size: 16px;
  color: ${(props) => props.theme.dateText};
  font-weight: 500;
`;

const ProjectDescription = styled.p`
  font-size: 17px;
  color: ${(props) => props.theme.responsibilityText};
  line-height: 1.7;
  margin-bottom: 20px;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 25px;
`;

const TechIcon = styled.div`
  font-size: 28px;
  color: ${(props) => props.theme.primary};
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.2);
    color: ${(props) => props.theme.accentLight};
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 15px;
`;

const ProjectLink = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: ${(props) => props.theme.primary};
  color: #ffffff;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => props.theme.accentLight};
    transform: translateY(-2px);
  }

  svg {
    font-size: 16px;
  }
`;

const headerVariants = {
  hidden: { opacity: 0, y: -80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 70, damping: 10, delay: 0.3 },
  },
};

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 16,
    },
  },
};

const ProjectsScreen = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const projects = [
    {
      title: "PulseWatch",
      year: "2025",
      description: "Cloud-Native Uptime Monitoring Platform built with Go and MongoDB Atlas. Features scalable multi-site health tracking, configurable cron-based checks, RESTful APIs, and real-time dashboard capabilities with Docker deployment support.",
      tech: [<SiGo />, <SiMongodb />, <FaDocker />],
      github: "https://github.com/prateeks007/PulseWatch",
      demo: null,
    },
    {
      title: "QueryForge",
      year: "2025",
      description: "Local Hybrid RAG Platform with FastAPI backend and Open WebUI frontend. Integrates Ollama LLMs (Gemma, Mistral) with DuckDuckGo live search and ChromaDB for vector storage. Fully containerized with Docker Compose for one-command deployment.",
      tech: [<SiPython />, <FaDocker />, <SiMongodb />],
      github: "https://github.com/prateeks007/QueryForge",
      demo: null,
    },
    {
      title: "CreatiVision",
      year: "2024",
      description: "AI Marketing Asset Generator built for Google Cloud GenAI Hackathon. Full-stack application using Flask backend and Vue.js frontend, integrating Google Gemini, Imagen, and Hugging Face APIs for automated banner/video generation from product images.",
      tech: [<SiPython />, <SiVuedotjs />, <SiFlask />, <SiGooglecloud />],
      github: "https://github.com/prateeks007/CreatiVision",
      demo: null,
    },
  ];

  return (
    <PageContainer>
      <AnimatedBackgroundOverlay />
      <ContentContainer>
        <Header
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          Featured Projects
        </Header>

        <ProjectsGrid
          variants={gridVariants}
          initial="hidden"
          animate={controls}
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} variants={cardVariants}>
              <ProjectHeader>
                <div>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectYear>{project.year}</ProjectYear>
                </div>
              </ProjectHeader>

              <ProjectDescription>{project.description}</ProjectDescription>

              <TechStack>
                {project.tech.map((icon, i) => (
                  <TechIcon key={i}>{icon}</TechIcon>
                ))}
              </TechStack>

              <ProjectLinks>
                {project.github && (
                  <ProjectLink
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGithub /> View Code
                  </ProjectLink>
                )}
                {project.demo && (
                  <ProjectLink
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </ProjectLink>
                )}
              </ProjectLinks>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </ContentContainer>
    </PageContainer>
  );
};

export default ProjectsScreen;
