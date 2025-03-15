import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import { FaLinkedinIn } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai";

// Styled components
const MainContainer = styled.div`
  min-height: 100vh;
  background-color: #000;
  color: white;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
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

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  position: relative;
  z-index: 1;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-end;
  }
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImage = styled(motion.img)`
  width: 200px;
  height: 200px;
  border-radius: 100px;

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
    border-radius: 75px;
  }
`;

const ProfileName = styled.h1`
  color: white;
  font-size: 30px;
  margin-top: 10px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const NavLink = styled(motion.div)`
  font-size: 16px;
  font-weight: bold;
  color: #fb9038;
  margin: 5px 10px;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 14px;
    margin: 5px 0;
  }
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  position: relative;
  z-index: 1;
  flex: 1;
`;

const GreetingText = styled(motion.h2)`
  color: white;
  font-size: 36px;
  font-family: "Merriweather", serif;
  font-style: italic;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const IntroText = styled(motion.h3)`
  color: #fb9038;
  font-size: 48px;
  font-family: "Merriweather", serif;
  font-style: italic;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 38px;
  }
`;

const DescriptionText = styled(motion.p)`
  color: white;
  font-size: 24px;
  font-family: "Roboto", sans-serif;
  font-weight: 100;
  text-align: center;
  margin-top: 20px;
  max-width: 800px;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const Footer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 5px 0;
  position: relative;
  z-index: 1;
  width: 100%;
  margin-top: auto;
`;

const SocialIcon = styled(motion.a)`
  color: white;
  margin: 10px;
  font-size: 20px;
  cursor: pointer;
`;

const Cursor = styled.span`
  color: white;
  font-size: 36px;
  font-family: "Merriweather", serif;
  font-style: italic;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

function MainScreen() {
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  // Animation controls
  const descriptionControls = useAnimation();
  const imageControls = useAnimation();
  const socialIconsControls = useAnimation();

  useEffect(() => {
    const greetingText = "Hey There!!!";
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex <= greetingText.length) {
        setTypedText(greetingText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          descriptionControls.start({ opacity: 1, y: 0 });
          imageControls.start({ scale: 1 });
          socialIconsControls.start({ y: 0, opacity: 1 });
        }, 500);
      }
    }, 150);

    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, [descriptionControls, imageControls, socialIconsControls]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleOpenResume = () => {
    window.open("/resume/Resume_Prateek Shetty.pdf", "_blank");
  };

  return (
    <MainContainer>
      <BackgroundImage />

      <Header>
        <HeaderLeft>
          <NavLink
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavigation("/experience")}
          >
            EXPERIENCE
          </NavLink>
          <NavLink
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenResume}
          >
            RESUME
          </NavLink>
        </HeaderLeft>

        <ProfileSection>
          <ProfileImage
            src="/images/self_profile_image.jpg"
            alt="Prateek Shetty"
            initial={{ scale: 0.8 }}
            animate={imageControls}
            whileHover={{
              y: -10,
              transition: { yoyo: Infinity, duration: 0.5 },
            }}
          />
          <ProfileName>Prateek Shetty</ProfileName>
        </ProfileSection>

        <HeaderRight>
          <NavLink
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavigation("/skills")}
          >
            SKILLS
          </NavLink>
          <NavLink
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavigation("/achievements")}
          >
            ACHIEVEMENTS
          </NavLink>
        </HeaderRight>
      </Header>

      <ContentSection>
        <GreetingText initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {typedText}
          {showCursor && <Cursor>|</Cursor>}
        </GreetingText>

        <IntroText
          initial={{ opacity: 0, y: 20 }}
          animate={descriptionControls}
        >
          Prateek here.
        </IntroText>

        <DescriptionText
          initial={{ opacity: 0, y: 20 }}
          animate={descriptionControls}
        >
          I'm a 2023 Computer Science graduate from PES University. As a Junior
          DevOps Engineer, I blend code and infrastructure to build seamless
          solutions. Beyond tech, you'll find me on the football field, chasing
          goals and living the beautiful game.
        </DescriptionText>
      </ContentSection>

      <Footer>
        <SocialIcon
          href="https://linkedin.com/in/prateek-shetty-7375031a6/"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ y: 50, opacity: 0 }}
          animate={socialIconsControls}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaLinkedinIn />
        </SocialIcon>
        <SocialIcon
          href="https://github.com/prateeks007"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ y: 50, opacity: 0 }}
          animate={socialIconsControls}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <AiFillGithub />
        </SocialIcon>
      </Footer>
    </MainContainer>
  );
}

export default MainScreen;
