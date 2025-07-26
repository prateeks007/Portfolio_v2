// src/pages/ComingSoonPage.js

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaHourglassHalf, FaRegSmileBeam } from 'react-icons/fa'; // Icons for visual appeal
import { useNavigate } from 'react-router-dom';

const ComingSoonContainer = styled(motion.div)`
  min-height: 100vh;
  background: radial-gradient(
    circle at 50% -10%,
    ${(props) => props.theme.gradientEnd} 0%,
    ${(props) => props.theme.background} 100%
  );
  color: ${(props) => props.theme.text};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  text-align: center;
  font-family: 'Inter', sans-serif;
  box-sizing: border-box;
`;

const ContentWrapper = styled(motion.div)`
  background: ${(props) => props.theme.cardBackground};
  border-radius: ${(props) => props.theme.borderRadiusLg};
  padding: 60px 40px;
  box-shadow: ${(props) => props.theme.cardHoverShadow}; /* A slightly more pronounced shadow */
  max-width: 700px;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${(props) => props.theme.cardBorder};

  @media (max-width: 768px) {
    padding: 40px 25px;
  }
`;

const IconWrapper = styled(motion.div)`
  font-size: 5rem;
  color: ${(props) => props.theme.primary};
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    filter: drop-shadow(0 0 15px ${(props) => props.theme.primaryGlow});
  }

  @media (max-width: 768px) {
    font-size: 4rem;
    margin-bottom: 25px;
  }
`;

const PageTitle = styled(motion.h1)`
  font-family: 'Outfit', sans-serif;
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 20px;
  color: ${(props) => props.theme.titleText};
  ${(props) => props.theme.nameGradient && `
    background: linear-gradient(120deg, ${props.theme.primary} 0%, ${props.theme.accentLight} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
  `};
  text-shadow: 0 4px 12px ${(props) => props.theme.primaryGlow};

  @media (max-width: 768px) {
    font-size: 3rem;
    margin-bottom: 15px;
  }
  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

const PageMessage = styled(motion.p)`
  font-family: 'Inter', sans-serif;
  font-size: 1.3rem;
  line-height: 1.8;
  color: ${(props) => props.theme.softText};
  margin-bottom: 40px;
  max-width: 550px;

  strong {
    color: ${(props) => props.theme.primary};
    font-weight: 600;
  }

  @media (max-width: 768px) {
    font-size: 1.15rem;
    margin-bottom: 30px;
  }
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const BackButton = styled(motion.button)`
  padding: 12px 28px;
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

  background: linear-gradient(
    135deg,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.accentLight}
  );
  color: ${(props) => props.theme.buttonText};
  box-shadow: 0 6px 15px ${(props) => props.theme.primaryGlow};

  &:hover, &:focus {
    transform: translateY(-3px);
    box-shadow:
      0 10px 25px ${(props) => props.theme.primaryGlow.replace('rgba(', 'rgba(').replace(', 0.', ', 0.')};
  }

  svg {
    font-size: 1.2em;
  }
`;

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 50, opacity: 0, scale: 0.9 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
    },
  },
};

const ComingSoonPage = ({ theme }) => {
  const navigate = useNavigate();

  return (
    <ComingSoonContainer
      theme={theme}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden" // Exit animation for smooth transitions (requires AnimatePresence in App.js)
    >
      <ContentWrapper theme={theme}>
        <IconWrapper theme={theme}>
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 10,
              ease: "linear"
            }}
          >
            <FaHourglassHalf />
          </motion.div>
        </IconWrapper>
        <PageTitle theme={theme} variants={itemVariants}>
          Brewing Something Awesome!
        </PageTitle>
        <PageMessage theme={theme} variants={itemVariants}>
          My <strong>Blog</strong> is currently under construction. I'm busy curating insightful articles, tutorials, and exciting updates just for you!
          <br /><br />
          Stay tuned for fresh content on DevOps, cloud engineering, projects, and more. I appreciate your patience and can't wait to share it with you soon! <FaRegSmileBeam style={{verticalAlign: 'middle', marginLeft: '5px'}}/>
        </PageMessage>
        <BackButton
          onClick={() => navigate("/")}
          variants={itemVariants}
          theme={theme}
        >
          Go Back to Home
        </BackButton>
      </ContentWrapper>
    </ComingSoonContainer>
  );
};

export default ComingSoonPage;