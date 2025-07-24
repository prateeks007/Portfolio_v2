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
  FaArrowUp, // For Scroll To Top
} from "react-icons/fa";
import { FiLoader } from "react-icons/fi"; // For loading spinner

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
  box-shadow: 
    inset 0 0 15px rgba(0, 0, 0, 0.3), 
    0 0 0 4px rgba(${(props) => props.theme.text === '#ffffff' ? '255, 255, 255' : '0, 0, 0'}, 0.05); 
  margin-bottom: 40px; 
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); 

  &:hover {
    transform: scale(1.03); 
    box-shadow: 
      inset 0 0 20px rgba(0, 0, 0, 0.4), 
      0 0 0 5px rgba(${(props) => props.theme.text === '#ffffff' ? '255, 255, 255' : '0, 0, 0'}, 0.1),
      0 0 0 8px ${(props) => props.theme.primary}30; 
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
  color: ${(props) => props.theme.titleText}; /* Default to solid color for max clarity */
  text-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.35); /* Crisp shadow for definition */

  /* Apply gradient only if theme.nameGradient is true AND it looks good in both modes */
  ${(props) => props.theme.nameGradient && css`
    background: linear-gradient(120deg, ${(props) => props.theme.primary} 0%, ${(props) => props.theme.accentLight} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent; /* Fallback for browsers not supporting text-fill-color */
    text-shadow: none; /* Remove shadow if gradient applied to prevent blur */
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
  font-family: 'Outfit', sans-serif; 
  padding: 20px 60px; 
  background: ${(props) => gradientHighlight(props.theme).background};
  /* Explicitly set button text color based on background for contrast */
  color: ${(props) => props.theme.background === '#f0f2f5' ? '#1a1a1a' : '#ffffff'}; /* Dark text for light mode, white for dark */
  border: none;
  border-radius: 40px; 
  font-size: 1.5rem; 
  font-weight: 700;
  letter-spacing: 0.04em; 
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 20px; 
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); 
  box-shadow: 
    0 6px 15px 0 rgba(${(props) => props.theme.primaryR}, ${(props) => props.theme.primaryG}, ${(props) => props.theme.primaryB}, 0.2),
    0 10px 25px 0 rgba(${(props) => props.theme.primaryR}, ${(props) => props.theme.primaryG}, ${(props) => props.theme.primaryB}, 0.15);
  position: relative;
  overflow: hidden;

  &:before { 
    content: '';
    position: absolute;
    top: 0;
    left: -150%; 
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transform: skewX(-20deg); 
    transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  &:hover, &:focus {
    transform: translateY(-6px) scale(1.03); 
    box-shadow: 
      0 10px 25px 0 rgba(${(props) => props.theme.primaryR}, ${(props) => props.theme.primaryG}, ${(props) => props.theme.primaryB}, 0.3),
      0 15px 40px 0 rgba(${(props) => props.theme.primaryR}, ${(props) => props.theme.primaryG}, ${(props) => props.theme.primaryB}, 0.25); 
    outline: none;
    &:before {
      left: 150%; 
    }
  }

  &:active {
    transform: translateY(-2px) scale(0.98);
    box-shadow: 
      0 4px 10px 0 rgba(${(props) => props.theme.primaryR}, ${(props) => props.theme.primaryG}, ${(props) => props.theme.primaryB}, 0.1),
      0 6px 15px 0 rgba(${(props) => props.theme.primaryR}, ${(props) => props.theme.primaryG}, ${(props) => props.theme.primaryB}, 0.08);
  }

  svg {
    font-size: 1.6rem;
  }

  @media (max-width: 768px) {
    padding: 18px 50px;
    font-size: 1.3rem;
    gap: 18px;
  }
  @media (max-width: 480px) {
    padding: 16px 40px;
    font-size: 1.15rem;
    gap: 16px;
  }
`;

// --- Feature Cards: Refined for Sleek Aura & Performance ---
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
  border-radius: 16px; 
  padding: 35px 25px; 
  width: 300px; 
  min-height: 240px; 
  position: relative;
  cursor: pointer;
  text-align: center;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1); 
  border: 1px solid ${(props) => props.theme.cardBorder || 'transparent'}; /* New: dynamic border */
  
  /* Multi-layered, ultra-subtle shadows for a truly floating look */
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.01),
    0 2px 8px rgba(0, 0, 0, 0.02),
    0 5px 20px rgba(0, 0, 0, 0.03); 

  &:hover, &:focus {
    transform: translateY(-8px) scale(1.01); 
    outline: none;
    /* Enhanced hover shadow with a controlled, elegant glow */
    box-shadow: 
      0 2px 5px rgba(0, 0, 0, 0.02),
      0 5px 15px rgba(0, 0, 0, 0.04),
      0 10px 30px rgba(0, 0, 0, 0.05),
      0 0 30px ${(props) => props.theme.primary}40; 
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

// --- Scroll to Top Button ---
const ScrollToTopButton = styled(motion.button)`
  position: fixed;
  bottom: 50px; 
  right: 50px;
  background: ${(props) => gradientHighlight(props.theme).background};
  color: ${(props) => props.theme.buttonText};
  border: none;
  border-radius: 50%;
  width: 60px; 
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  cursor: pointer;
  box-shadow: 0 10px 25px ${(props) => props.theme.primary}60;
  z-index: 100; 
  transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover, &:focus {
    transform: translateY(-8px) scale(1.1); 
    box-shadow: 0 15px 40px ${(props) => props.theme.primary}90;
    outline: none;
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 1.6rem;
    bottom: 40px;
    right: 40px;
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
      stiffness: 70, // Slightly softer spring
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
      stiffness: 60, // Softer spring for cards
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
    duration: 180 + i * 40, // Even longer durations for imperceptible movement
    repeat: Infinity,
    repeatType: "loop",
    ease: "linear", 
    delay: i * 2, 
  },
});


// --- Main Screen Component ---
// This component should receive 'theme' and 'toggleTheme' from a parent ThemeProvider context
const MainScreen = ({ theme, toggleTheme }) => { // Assume theme and toggleTheme are passed as props
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Further reduced initial load delay for snappier feel

    const handleScroll = () => {
      if (window.scrollY > 400) { 
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(loadTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  // If theme is not passed or is null, provide a default (should ideally come from ThemeProvider)
  // This helps prevent crashes if theme isn't properly wired up yet, but IS NOT the final solution
  // The final solution requires your App.js or Layout.js to correctly pass theme/toggleTheme
  if (!theme) {
    console.warn("Theme not provided to MainScreen. Using default dark theme.");
    theme = {
      primary: "#FF7F50", // Coral / Orange-Red
      primaryR: 255, primaryG: 127, primaryB: 80, 
      accentLight: "#FFCC99", 
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
      cardBorder: "rgba(255, 255, 255, 0.05)", // Specific card border for dark mode
      nameGradient: true, 
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
            <FeatureIcon theme={theme}><FaTrophy /></FeatureIcon>
            <FeatureTitle theme={theme}>My Milestones</FeatureTitle>
            <FeatureDescription theme={theme}>
              Discover my certifications, awards, and project successes.
            </FeatureDescription>
          </FeatureCard>
        </FeatureCardsContainer>
      </HeroSection>

      {showScrollToTop && (
        <ScrollToTopButton
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
          theme={theme}
        >
          <FaArrowUp />
        </ScrollToTopButton>
      )}
    </MainContainer>
  );
};

export default MainScreen;