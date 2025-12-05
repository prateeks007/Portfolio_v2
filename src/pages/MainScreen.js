// src/pages/MainScreen.js

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

import {
  FaEnvelope,
  FaBriefcase, // For Experience
  FaCode, // For Skills
  FaTrophy, // For Achievements
  FaBlog, // For Blog
  FaDownload, // NEW: For Resume Download Icon
} from "react-icons/fa";

// --- Reusable CSS Mixins ---
const gradientHighlight = (theme) => css`
  background: linear-gradient(120deg, ${theme.primary} 0%, ${theme.accentLight} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
`;

// --- Global Font Imports Suggestion (Add this to your public/index.html or App.css) ---
/*
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
*/

// --- Main Container: The Full Page Canvas ---
const MainContainer = styled(motion.div)`
  min-height: 100vh;
  background: radial-gradient(
    circle at 50% -10%,
    ${(props) => props.theme.gradientEnd} 0%,
    ${(props) => props.theme.background} 100%
  );
  color: ${(props) => props.theme.text};
  position: relative;
  overflow: hidden; /* Contains all animated elements */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  padding: 100px 20px 60px 20px;
  box-sizing: border-box;
  transition: background 0.3s ease, color 0.3s ease; /* Smooth transition for theme change */


  @media (max-width: 768px) {
    padding: 80px 15px 40px 15px;
  }
`;

// --- Animated Background Blobs: Highly Optimized for Performance ---
const AnimatedBlob = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  opacity: ${(props) => props.$opacity || 0.008}; /* Extremely low opacity */
  filter: blur(350px); /* Max blur for super cloud-like effect */
  pointer-events: none;
  z-index: 0;
  background: ${(props) => props.$color || props.theme.primary};
`;

// --- Hero Section: The Core Introduction ---
const HeroSection = styled(motion.section)`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 1000px;
  width: 100%;
  gap: 60px; /* Generous spacing for readability */
  padding: 40px 0;

  @media (max-width: 768px) {
    gap: 50px;
    padding: 20px 0;
  }
`;

const ProfileImage = styled(motion.img)`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  background: ${(props) => props.theme.cardBackground};
  /* Use theme-defined shadow for cleaner light mode */
  box-shadow:
    inset 0 0 15px ${(props) => props.theme.cardShadow.replace('0 5px 20px', '0 0')}, /* Inner shadow from cardShadow base */
    0 0 0 4px ${(props) => props.theme.cardBorder}; /* Subtle ring using cardBorder */
  margin-bottom: 40px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    transform: scale(1.03);
    box-shadow:
      inset 0 0 20px ${(props) => props.theme.cardHoverShadow.replace('0 10px 30px', '0 0')},
      0 0 0 5px ${(props) => props.theme.primary}50, /* Slightly more pronounced ring */
      0 0 0 8px ${(props) => props.theme.primaryGlow}; /* Subtle glow on hover */
  }

  @media (max-width: 600px) {
    width: 160px;
    height: 160px;
    margin-bottom: 35px;
  }
`;

const ProfileName = styled(motion.h1)`
  font-family: 'Outfit', sans-serif;
  font-size: 7.0rem;
  font-weight: 900;
  margin: 0;
  letter-spacing: -0.09em;
  line-height: 1;
  color: ${(props) => props.theme.titleText};
  /* Use theme-defined glow for title text */
  text-shadow: 0 4px 12px ${(props) => props.theme.primaryGlow};

  ${(props) => props.theme.nameGradient && css`
    background: linear-gradient(120deg, ${(props) => props.theme.primary} 0%, ${(props) => props.theme.accentLight} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
    text-shadow: none;
  `};

  @media (max-width: 1200px) {
    font-size: 6.2rem;
  }
  @media (max-width: 992px) {
    font-size: 5.2rem;
  }
  @media (max-width: 768px) {
    font-size: 4.4rem;
    letter-spacing: -0.08em;
  }
  @media (max-width: 576px) {
    font-size: 3.8rem;
    letter-spacing: -0.07em;
  }
`;

const TaglineText = styled(motion.h2)`
  font-family: 'Outfit', sans-serif;
  font-size: 3.2rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.5;
  color: ${(props) => props.theme.titleText};
  min-height: 120px;
  max-width: 950px;
  opacity: 0.99;

  .Typewriter__wrapper {
    ${(props) => gradientHighlight(props.theme)};
    font-family: 'Outfit', sans-serif;
    font-weight: 600;
  }
  .Typewriter__cursor {
    color: ${(props) => props.theme.primary};
    font-size: 1.1em;
  }

  @media (max-width: 1024px) {
    font-size: 2.8rem;
    min-height: 110px;
  }
  @media (max-width: 768px) {
    font-size: 2.4rem;
    min-height: 100px;
  }
  @media (max-width: 480px) {
    font-size: 2rem;
    min-height: 90px;
  }
`;

const IntroParagraph = styled(motion.p)`
  font-family: 'Inter', sans-serif;
  margin: 0 0 90px 0;
  font-size: 1.5rem;
  font-weight: 380;
  color: ${(props) => props.theme.softText};
  opacity: 0.96;
  line-height: 2.2;
  letter-spacing: 0.015em;
  max-width: 900px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.35rem;
    margin-bottom: 80px;
  }
  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin-bottom: 70px;
  }
`;

// --- Primary Call To Action (Contact) ---
const PrimaryCTA = styled(motion.div)`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 130px;

  @media (max-width: 768px) {
    margin-bottom: 100px;
  }
`;

const CTAButton = styled(motion.button)`
  padding: 14px 30px;
  border-radius: ${(props) => props.theme.borderRadiusLg};
  border: none;
  font-size: 1.1em;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  transition: all 0.3s ease-in-out;

  // IMPORTANT: Set background and color based on theme
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.accentLight}
  ); /* Use theme colors for gradient background */
  color: ${(props) => props.theme.buttonText}; /* Use themed buttonText color */

  // Shadows and glows using theme properties
  box-shadow:
    0 6px 15px ${(props) => props.theme.primaryGlow},
    0 10px 25px ${(props) => props.theme.primaryGlow}; /* Adjusted glow */

  &:hover, &:focus {
    transform: translateY(-3px);
    box-shadow:
      0 10px 25px ${(props) => props.theme.primaryGlow.replace('rgba(', 'rgba(').replace(', 0.', ', 0.')},
      0 15px 40px ${(props) => props.theme.primaryGlow.replace('rgba(', 'rgba(').replace(', 0.', ', 0.')};
  }

  svg {
    font-size: 1.2em;
  }
`;


// --- Feature Cards:
const FeatureCardsContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 35px;
  margin-top: 110px;
  width: 100%;
  max-width: 1100px;
  padding: 0 20px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    gap: 25px;
    margin-top: 90px;
  }
`;

const FeatureCard = styled(motion.div)`
  background: ${(props) => props.theme.cardBackground};
  border-radius: ${(props) => props.theme.borderRadiusLg};
  padding: 35px 25px;
  width: 300px;
  min-height: 240px;
  position: relative;
  cursor: pointer;
  text-align: center;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  border: 1px solid ${(props) => props.theme.cardBorder};
  box-shadow: ${(props) => props.theme.cardShadow};

  &:hover, &:focus {
    transform: translateY(-8px) scale(1.01);
    outline: 2px solid ${(props) => props.theme.primary}80;
    outline-offset: 4px;
    box-shadow:
      ${(props) => props.theme.cardHoverShadow},
      0 0 30px ${(props) => props.theme.primaryGlow};
    border-color: ${(props) => props.theme.primary}A0;
  }

  @media (max-width: 480px) {
    width: 90%;
    min-height: 220px;
    padding: 30px 20px;
  }
`;

const FeatureIcon = styled(motion.div)`
  font-size: 4.5rem;
  color: ${(props) => props.theme.primary};
  margin-bottom: 25px;

  ${FeatureCard}:hover & {
    transform: translateY(-6px) rotate(2deg) scale(1.05);
    color: ${(props) => props.theme.accentLight};
    transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  @media (max-width: 768px) {
    font-size: 4rem;
    margin-bottom: 20px;
  }
`;

const FeatureTitle = styled(motion.h3)`
  font-family: 'Outfit', sans-serif;
  font-size: 2.0rem;
  font-weight: 700;
  margin: 0 0 15px 0;
  color: ${(props) => props.theme.titleText};
  line-height: 1.25;

  ${FeatureCard}:hover & {
    transform: translateY(-4px);
    color: ${(props) => props.theme.primary};
    transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`;

const FeatureDescription = styled(motion.p)`
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  color: ${(props) => props.theme.softText};
  line-height: 1.7;
  opacity: 0.96;
  letter-spacing: 0.005em;

  ${FeatureCard}:hover & {
    opacity: 1;
    transform: translateY(4px);
    transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  @media (max-width: 768px) {
    font-size: 1.0rem;
  }
`;

// --- Loading State ---
const LoadingContainer = styled(MainContainer)`
  justify-content: center;
  align-items: center;
`;

const LoadingSpinner = styled(motion.div)`
  border: 8px solid ${(props) => `${props.theme.primary}30`};
  border-top: 8px solid ${(props) => props.theme.primary};
  border-radius: 50%;
  width: 90px;
  height: 90px;
  animation: spin 1.2s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// --- Framer Motion Variants ---
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

const heroItemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 15,
      mass: 0.9,
      delay: 0.3
    },
  },
};

const featureCardVariants = {
  hidden: { opacity: 0, y: 80, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 12,
      mass: 0.7,
    },
  },
};

// Optimized function for blob animation values - minimal movement, no scale/rotate
const getBlobAnimation = (i) => ({
  opacity: i % 2 === 0 ? 0.012 : 0.008,
  x: i % 2 === 0 ? ["-5%", "5%", "-5%"] : ["5%", "-5%", "5%"],
  y: i % 3 === 0 ? ["-5%", "5%", "-5%"] : ["5%", "-5%", "5%"],
  transition: {
    duration: 180 + i * 40,
    repeat: Infinity,
    repeatType: "loop",
    ease: "linear",
    delay: i * 2,
  },
});


// --- Main Screen Component ---
const MainScreen = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(loadTimer);
    };
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Handler for Blog to navigate to a dedicated "Coming Soon" page
  const handleBlogClick = () => {
    navigate("/blog-coming-soon");
  };

  // REINSTATED: Original Handler for Resume Download
  const handleOpenResume = () => {
    window.open(
      process.env.PUBLIC_URL + "/resume/Resume_Prateek Shetty.pdf",
      "_blank"
    );
  };


  // Defensive theme check and default values (should align with your App.js light/dark themes)
  if (!theme) {
    console.warn("Theme not provided to MainScreen. Using default dark theme.");
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
      buttonText: "#ffffff", // Changed to white as per your App.js theme
      cardBackground: "#1e1e1e",
      cardBackgroundAlt: "#282828",
      glassBackground: "rgba(30, 30, 30, 0.2)",
      glassBorder: "rgba(255, 255, 255, 0.08)",
      cardBorder: "rgba(255, 255, 255, 0.05)",
      nameGradient: true,
      cardShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
      cardHoverShadow: "0 15px 40px rgba(0, 0, 0, 0.5)",
      primaryGlow: "rgba(0, 188, 212, 0.6)",
      accentLightGlow: "rgba(0, 229, 114, 0.6)",
      borderRadiusLg: '16px',
      cardHoverBackground: "#2a2a2a",
    };
  }


  if (isLoading) {
    return (
      <LoadingContainer style={{ backgroundColor: theme.background }}>
        <AnimatedBlob
          $color={theme.primary}
          $opacity={0.3}
          style={{ width: "900px", height: "900px", top: "0%", left: "-15%" }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.3, scale: 1.2, rotate: 360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        />
        <AnimatedBlob
          $color={theme.accentLight}
          $opacity={0.2}
          style={{ width: "800px", height: "800px", bottom: "-15%", right: "0%" }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.2, scale: 1.3, rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear", delay: 1.5 }}
        />
        <LoadingSpinner />
      </LoadingContainer>
    );
  }

  return (
    <MainContainer
      variants={pageEntranceVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      theme={theme}
    >
      {/* Reduced to 2 blobs for performance, ensure they cover the screen subtly */}
      <AnimatedBlob
        $color={theme.primary}
        $opacity={getBlobAnimation(0).opacity}
        style={{ top: "10%", left: "5%", width: "1000px", height: "1000px" }}
        animate={{
          x: getBlobAnimation(0).x,
          y: getBlobAnimation(0).y,
          opacity: getBlobAnimation(0).opacity,
        }}
        transition={getBlobAnimation(0).transition}
      />
      <AnimatedBlob
        $color={theme.accentLight}
        $opacity={getBlobAnimation(1).opacity}
        style={{ bottom: "10%", right: "5%", width: "1200px", height: "1200px" }}
        animate={{
          x: getBlobAnimation(1).x,
          y: getBlobAnimation(1).y,
          opacity: getBlobAnimation(1).opacity,
        }}
        transition={getBlobAnimation(1).transition}
      />

      <HeroSection>
        <ProfileImage
          src={process.env.PUBLIC_URL + "/images/self_profile_image.jpg"}
          alt="Prateek Shetty"
          variants={heroItemVariants}
          theme={theme}
        />

        <ProfileName variants={heroItemVariants} theme={theme}>
          PRATEEK SHETTY
        </ProfileName>

        <TaglineText variants={heroItemVariants} theme={theme}>
          <Typewriter
            words={[
              "Innovating at the Intersection of Code & Infrastructure 🚀",
              "A DevOps Engineer & Systems Builder",
              "Passionately Automating for Scalability & Reliability ⚙️",
              "Kubernetes • Docker • AWS • Terraform • CI/CD Expert ☁️",
              "Beyond the Keyboard: Living the Beautiful Game ⚽",
            ]}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={50}
            deleteSpeed={20}
            delaySpeed={2200}
          />
        </TaglineText>

        <IntroParagraph variants={heroItemVariants} theme={theme}>
          As a 2023 Computer Science graduate from PES University, I engineer and optimize robust, scalable solutions. My expertise spans cloud infrastructure, container orchestration, and continuous delivery, transforming complex systems into seamless, efficient workflows. Off-duty, I channel the same drive and precision into my passion for football.
        </IntroParagraph>

        <PrimaryCTA>
          <CTAButton
            onClick={() => handleNavigation("/contact")}
            variants={heroItemVariants}
            theme={theme}
          >
            <FaEnvelope /> Let's Connect
          </CTAButton>
        </PrimaryCTA>

        <FeatureCardsContainer>
          <FeatureCard
            onClick={() => handleNavigation("/experience")}
            variants={featureCardVariants}
            theme={theme}
          >
            <FeatureIcon theme={theme}><FaBriefcase /></FeatureIcon>
            <FeatureTitle theme={theme}>My Journey</FeatureTitle>
            <FeatureDescription theme={theme}>
              Explore my professional experience, roles, and key contributions.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard
            onClick={() => handleNavigation("/skills")}
            variants={featureCardVariants}
            theme={theme}
          >
            <FeatureIcon theme={theme}><FaCode /></FeatureIcon>
            <FeatureTitle theme={theme}>My Expertise</FeatureTitle>
            <FeatureDescription theme={theme}>
              Dive into my technical proficiencies and tooling knowledge.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard
            onClick={() => handleNavigation("/achievements")}
            variants={featureCardVariants}
            theme={theme}
          >
            <FeatureIcon theme={theme}><FaTrophy/></FeatureIcon>
            <FeatureTitle theme={theme}>My Milestones</FeatureTitle>
            <FeatureDescription theme={theme}>
              Discover my certifications, awards, and project successes.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard
            onClick={() => window.open("https://hashnode.com/@prateeks007", "_blank")}
            variants={featureCardVariants}
            theme={theme}
          >
            <FeatureIcon theme={theme}><FaBlog /></FeatureIcon>
            <FeatureTitle theme={theme}>My Blog</FeatureTitle>
            <FeatureDescription theme={theme}>
              Insights, tutorials, and thoughts on DevOps, tech, and more.
            </FeatureDescription>
          </FeatureCard>

          {/* NEW/REINSTATED: Resume Download Feature Card */}
          <FeatureCard
            onClick={handleOpenResume} // <-- Using your original handler
            variants={featureCardVariants}
            theme={theme}
          >
            <FeatureIcon theme={theme}><FaDownload /></FeatureIcon> {/* Using FaDownload */}
            {/* You could also use FaFileAlt for a document icon: <FaFileAlt /> */}
            <FeatureTitle theme={theme}>My Resume</FeatureTitle>
            <FeatureDescription theme={theme}>
              Download my complete professional resume in PDF format.
            </FeatureDescription>
          </FeatureCard>
        </FeatureCardsContainer>
      </HeroSection>

    </MainContainer>
  );
};

export default MainScreen;