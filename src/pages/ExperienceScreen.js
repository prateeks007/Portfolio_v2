// src/pages/ExperienceScreen.js

import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { motion, useAnimation } from "framer-motion";
import Timeline from "../components/Timeline"; // Ensure your Timeline component also uses theme props

// --- Keyframe Animations for Background ---
// More organic background movement: using cubic-bezier for smoother flow
const subtleShiftBackground = keyframes`
  0% { background-position: 0% 50%; }
  25% { background-position: 50% 75%; }
  50% { background-position: 100% 50%; }
  75% { background-position: 50% 25%; }
  100% { background-position: 0% 50%; }
`;

// --- Styled Components ---

const PageContainer = styled.div`
  min-height: 100vh;
  position: relative;
  /* Use theme props for background, no fixed colors */
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.gradientStart} 0%,
    ${(props) => props.theme.gradientEnd} 100%
  );
  color: ${(props) => props.theme.titleText}; /* Main text color from theme */
  font-family: 'Inter', sans-serif;
  overflow: hidden; /* Important to prevent scrollbars from background animation */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 0;

  @media (max-width: 768px) {
    padding: 20px 0;
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
  background-size: 200% 200%; /* Allows for larger, more subtle movement */
  animation: ${subtleShiftBackground} 40s ease-in-out infinite alternate; /* Slower, smoother, alternating */
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
  text-shadow: 0 0 30px ${(props) => props.theme.primary}B0; /* Slightly stronger glow */

  @media (max-width: 768px) {
    font-size: 42px;
    margin-bottom: 50px;
  }
  @media (max-width: 480px) {
    font-size: 36px;
    margin-bottom: 40px;
  }
`;

const ExperienceContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 35px;
`;

const ExperienceCard = styled(motion.div)`
  background: ${(props) => props.theme.cardBackground};
  border-radius: 20px;
  padding: 35px;
  box-shadow: 0 15px 45px ${(props) => props.theme.cardShadow};
  border: 1px solid ${(props) => props.theme.cardBorder};
  perspective: 1000px; /* Enable 3D transforms for subtle rotation */

  transition: transform 0.3s ease-out, box-shadow 0.3s ease-out, background 0.3s ease-out, border-color 0.3s ease-out;

  &:hover {
    transform: translateY(-10px) rotateX(3deg) scale(1.01); /* Added subtle rotateX and scale */
    background: ${(props) => props.theme.cardHoverBackground};
    box-shadow: 0 20px 60px ${(props) => props.theme.cardShadow}A0;
    border-color: ${(props) => props.theme.primary}50;
  }

  @media (max-width: 600px) {
    padding: 25px;
  }
`;

const ExperienceHeader = styled.div`
  margin-bottom: 25px;
`;

const ExperienceTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 10px;
  color: ${(props) => props.theme.primary};
  font-family: "Roboto", sans-serif;
  letter-spacing: -0.025em;
  text-shadow: 0 0 8px ${(props) => props.theme.primary}40; /* Slightly more pronounced title glow */

  @media (max-width: 600px) {
    font-size: 22px;
  }
`;

const ExperienceCompany = styled.h3`
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 8px;
  color: ${(props) => props.theme.companyText};
  font-family: "Inter", sans-serif;
`;

const ExperienceDate = styled.p`
  font-size: 18px;
  color: ${(props) => props.theme.dateText};
  margin-bottom: 18px;
  font-family: "Inter", sans-serif;
  font-weight: 400;
`;

const ResponsibilitiesList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ResponsibilityItem = styled(motion.li)`
  font-size: 18px;
  margin-bottom: 14px; /* Slightly more vertical space for readability */
  color: ${(props) => props.theme.responsibilityText};
  font-family: "Inter", sans-serif;
  font-weight: 300;
  position: relative;
  padding-left: 30px;
  line-height: 1.7; /* Increased line height for better readability */

  &:before {
    content: "•";
    color: ${(props) => props.theme.bulletColor};
    position: absolute;
    left: 0;
    font-size: 1.3em;
    line-height: 1.4;
    transform: translateY(-2px);
    filter: drop-shadow(0 0 5px ${(props) => props.theme.bulletColor}70); /* Stronger bullet glow */
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionDivider = styled.div`
  height: 3px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    ${(props) => props.theme.dividerColor} 20%,
    ${(props) => props.theme.dividerGradientEnd} 80%,
    transparent 100%
  );
  margin: 80px 0; /* More margin around the divider */
  border-radius: 2px;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 40px;
  color: ${(props) => props.theme.primary};
  margin-bottom: 50px;
  text-align: center;
  font-family: "Roboto", sans-serif;
  font-weight: 800;
  letter-spacing: -0.04em;
  text-shadow: 0 0 25px ${(props) => props.theme.primary}70; /* Stronger glow */

  @media (max-width: 768px) {
    font-size: 34px;
    margin-bottom: 40px;
  }
  @media (max-width: 480px) {
    font-size: 28px;
    margin-bottom: 30px;
  }
`;

// --- Animation Variants ---

const headerVariants = {
  hidden: { opacity: 0, y: -80, rotateX: 15 }, // Slightly more dramatic entry
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: "spring", stiffness: 70, damping: 10, delay: 0.3 }, // Slightly more delay
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Increased stagger for a slower, more deliberate reveal
      delayChildren: 0.7, // More delay before cards start appearing
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 80, scale: 0.9, rotateX: -5 }, // Larger displacement, subtle initial rotation
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 80, // Adjusted stiffness
      damping: 16, // Adjusted damping for a smoother "settle"
      mass: 1.2, // Heavier feel
    },
  },
};

const responsibilityItemVariants = {
  hidden: { opacity: 0, x: -30, scaleX: 0.8 }, // Slides in further, squishes slightly
  visible: {
    opacity: 1,
    x: 0,
    scaleX: 1,
    transition: {
      type: "spring",
      stiffness: 120, // Snappier bullet entry
      damping: 15,
      duration: 0.5,
    },
  },
};

const sectionTitleVariants = {
  hidden: { opacity: 0, y: 60, rotateX: -10 }, // More dramatic entry for section titles
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: "spring", stiffness: 70, damping: 10, delay: 0.4 },
  },
};

// --- Component ---

const ExperienceScreen = ({ theme }) => { // Added theme prop here
  const controls = useAnimation();
  const timelineTitleControls = useAnimation();

  // Use Intersection Observer for section titles to animate them as they come into view
  // rather than animating on initial page load if they're far down.
  // This is a common pattern for "even better" user experience.
  const timelineRef = React.useRef(null);

  useEffect(() => {
    // Animate the main header and cards immediately on mount
    controls.start("visible");

    // Fix for ESLint warning: Capture current ref value for cleanup
    const currentTimelineRef = timelineRef.current;

    // Observe timeline title for animation when it enters viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timelineTitleControls.start("visible");
        }
      },
      {
        root: null, // viewport
        rootMargin: "0px",
        threshold: 0.5, // Trigger when 50% of the element is visible
      }
    );

    if (currentTimelineRef) { // Use the captured value
      observer.observe(currentTimelineRef);
    }

    // Cleanup observer on component unmount
    return () => {
      if (currentTimelineRef) { // Use the captured value in cleanup
        observer.unobserve(currentTimelineRef);
      }
    };
  }, [controls, timelineTitleControls]); // Dependencies are correct

  const experiences = [
    {
      title: "DevOps Engineer",
      company: "EOX Vantage",
      date: "APR 2025 – Present",
      responsibilities: [
        "Architected & deployed AWS production infrastructure using Terraform (VPC, ECS Fargate, RDS, Redis, S3, CloudFront, ALB/NLB, IAM)",
        "Reduced S3 storage by ~80 TB, saving ~$1500/month in AWS costs through lifecycle optimization",
        "Implemented reusable GitHub deployment template, reducing setup time by 60% across environments",
        "Centralized security headers at Ingress controller, improving audit compliance by 100%",
        "Diagnosed and resolved complex AWS networking issues, reducing production downtime",
      ],
    },
    {
      title: "Junior DevOps Engineer",
      company: "EOX Vantage",
      date: "AUG 2023 – MAR 2025",
      responsibilities: [
        "Managed Amazon EKS clusters supporting 20+ microservices, improving deployment reliability by ~40%",
        "Implemented centralized logging with Elasticsearch + Fleet agents, improving troubleshooting speed by ~3×",
        "Deployed and managed Wazuh SIEM for real-time threat detection and security monitoring",
        "Led transition to GitHub Actions with integrated security automation (Snyk, Semgrep)",
        "Conducted DAST using OWASP ZAP, Burp Suite, sqlmap, and Metasploit",
        "Automated vulnerability scanning, reducing manual security testing time by ~70%",
      ],
    },
    {
      title: "Software Developer Intern / DevOps Intern",
      company: "EOX Vantage",
      date: "JAN 2023 – AUG 2023",
      responsibilities: [
        "Performed regular pentesting (ZAP/Burp) identifying multiple security issues early in development",
        "Implemented CI using CircleCI for production workloads",
        "Improved deployment reliability for internal applications",
      ],
    },
    {
      title: "Virtual Internship",
      company: "Future Ready Talent",
      date: "SEP 2021 – JUN 2022",
      responsibilities: [
        "Learned about and worked with Microsoft Azure Technologies",
      ],
    },
    {
      title: "Summer Research Intern",
      company: "ISFCR, PES University",
      date: "JUN 2021 - SEP 2021",
      responsibilities: [
        "Worked on securing containers with least privileged capabilities",
        "Presented comparison between Seccomp and AppArmor performances",
      ],
    },
  ];

  const timelineEvents = [
    {
      year: "2025",
      title: "DevOps Engineer",
      organization: "EOX Vantage",
      description: "AWS infrastructure, Terraform, cost optimization",
    },
    {
      year: "2023",
      title: "Junior DevOps Engineer",
      organization: "EOX Vantage",
      description: "Kubernetes, EKS, security automation, CI/CD",
    },
    {
      year: "2023",
      title: "Graduated",
      organization: "PES University",
      description: "B.Tech in Computer Science",
    },
    {
      year: "2022",
      title: "Software Developer Intern",
      organization: "EOX Vantage",
      description: "Worked with JavaScript, Ruby, and Ruby on Rails",
    },
    {
      year: "2021",
      title: "Summer Research Intern",
      organization: "ISFCR, PES University",
      description: "Worked on container security",
    },
  ];

  return (
    <PageContainer theme={theme}> {/* Pass theme to PageContainer */}
      <AnimatedBackgroundOverlay theme={theme} /> {/* Pass theme to AnimatedBackgroundOverlay */}

      <ContentContainer>
        <Header
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          theme={theme} 
        >
          My Professional Journey
        </Header>

        <ExperienceContainer
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} variants={cardVariants} theme={theme}> {/* Pass theme to ExperienceCard */}
              <ExperienceHeader>
                <ExperienceTitle theme={theme}>{exp.title}</ExperienceTitle> {/* Pass theme */}
                <ExperienceCompany theme={theme}>{exp.company}</ExperienceCompany> {/* Pass theme */}
                <ExperienceDate theme={theme}>{exp.date}</ExperienceDate> {/* Pass theme */}
              </ExperienceHeader>
              <ResponsibilitiesList>
                {exp.responsibilities.map((resp, respIndex) => (
                  <ResponsibilityItem
                    key={respIndex}
                    variants={responsibilityItemVariants}
                    theme={theme} 
                  >
                    {resp}
                  </ResponsibilityItem>
                ))}
              </ResponsibilitiesList>
            </ExperienceCard>
          ))}
        </ExperienceContainer>

        <SectionDivider theme={theme} /> {/* Pass theme */}

        {/* Use ref for Intersection Observer */}
        <SectionTitle
          ref={timelineRef}
          variants={sectionTitleVariants}
          initial="hidden"
          animate={timelineTitleControls}
          theme={theme}
        >
          Career Timeline
        </SectionTitle>
        {/* Make sure your Timeline component also consumes the theme props */}
        <Timeline events={timelineEvents} theme={theme} /> {/* Pass theme to Timeline */}
      </ContentContainer>
    </PageContainer>
  );
};

export default ExperienceScreen;