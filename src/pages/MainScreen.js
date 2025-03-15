import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import {
  FaLinkedinIn,
  FaGithub,
  FaCode,
  FaServer,
  FaShieldAlt,
  FaEnvelope,
} from "react-icons/fa";

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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1a2a3a 0%, #0d1b2a 100%);
  z-index: -1;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  position: relative;
  z-index: 1;
`;

const HeaderLeft = styled.div`
  display: flex;
  gap: 20px;
`;

const HeaderRight = styled.div`
  display: flex;
  gap: 20px;
`;

const NavLink = styled(motion.button)`
  background: none;
  border: none;
  color: #fb9038;
  font-size: 16px;
  cursor: pointer;
  padding: 5px 0;
  font-weight: 300;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const ProfileImage = styled(motion.img)`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #fb9038;
`;

const ProfileName = styled.h1`
  font-size: 24px;
  margin-top: 10px;
  font-weight: 400;
`;

const ContentSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const GreetingText = styled(motion.h2)`
  font-size: 36px;
  color: #fb9038;
  margin-bottom: 10px;
  font-weight: 300;
`;

const IntroText = styled(motion.h3)`
  font-size: 28px;
  margin-bottom: 20px;
  font-weight: 300;
`;

const DescriptionText = styled(motion.p)`
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 30px;
  font-weight: 300;
  max-width: 600px;
`;

const Cursor = styled.span`
  animation: blink 1s step-end infinite;

  @keyframes blink {
    from,
    to {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
`;

const SkillsPreview = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  flex-wrap: wrap;
`;

const SkillCard = styled(motion.div)`
  background-color: rgba(26, 26, 26, 0.8);
  border-radius: 10px;
  padding: 15px;
  width: 150px;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(40, 40, 40, 0.9);
    .skill-details {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const SkillIcon = styled.div`
  font-size: 24px;
  color: #fb9038;
  margin-bottom: 12px;
`;

const SkillTitle = styled.h4`
  font-size: 16px;
  margin-bottom: 8px;
  font-weight: 400;
`;

const SkillDetails = styled.p`
  font-size: 12px;
  text-align: center;
  color: #ccc;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(26, 26, 26, 0.95);
  padding: 8px;
  opacity: 0;
  transform: translateY(100%);
  transition: all 0.3s ease;
  class="skill-details"
`;

const CTAContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
  width: 100%;
  z-index: 1;
`;

const CTAButton = styled(motion.button)`
  padding: 10px 20px;
  background-color: transparent;
  color: white;
  border: 1px solid #fb9038;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    font-size: 16px;
  }

  &:hover {
    background-color: rgba(251, 144, 56, 0.1);
  }
`;

const Footer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 20px 0;
  position: relative;
  z-index: 1;
  width: 100%;
  margin-top: auto;
`;

const SocialIcon = styled(motion.a)`
  color: white;
  margin: 0 16px;
  font-size: 20px;
  cursor: pointer;
`;

function MainScreen() {
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "Hey There!!!";
  const typingSpeed = 150;

  const imageControls = useAnimation();
  const descriptionControls = useAnimation();
  const skillsControls = useAnimation();
  const socialIconsControls = useAnimation();
  const ctaControls = useAnimation();

  useEffect(() => {
    let currentIndex = 0;

    // Start animations
    imageControls.start({ scale: 1, transition: { duration: 0.5 } });

    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setTypedText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);

        // Start the next animations after typing is complete
        descriptionControls.start({
          opacity: 1,
          y: 0,
          transition: { delay: 0.3 },
        });

        skillsControls.start({
          opacity: 1,
          y: 0,
          transition: { delay: 0.8 },
        });

        ctaControls.start({
          opacity: 1,
          y: 0,
          transition: { delay: 1.0 },
        });

        socialIconsControls.start({
          opacity: 1,
          transition: { delay: 1.2 },
        });
      }
    }, typingSpeed);

    // Cursor blinking
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, [
    imageControls,
    descriptionControls,
    socialIconsControls,
    skillsControls,
    ctaControls,
  ]);

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
            whileHover={{ scale: 1.05 }}
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

        <SkillsPreview initial={{ opacity: 0, y: 20 }} animate={skillsControls}>
          <SkillCard
            whileHover={{ y: -5 }}
            onClick={() => handleNavigation("/skills")}
          >
            <SkillIcon>
              <FaCode />
            </SkillIcon>
            <SkillTitle>Development</SkillTitle>
            <SkillDetails className="skill-details">
              JavaScript, React, Node.js, Python, Java, C++
            </SkillDetails>
          </SkillCard>

          <SkillCard
            whileHover={{ y: -5 }}
            onClick={() => handleNavigation("/skills")}
          >
            <SkillIcon>
              <FaServer />
            </SkillIcon>
            <SkillTitle>DevOps</SkillTitle>
            <SkillDetails className="skill-details">
              Docker, Kubernetes, AWS, CI/CD, Jenkins, Terraform
            </SkillDetails>
          </SkillCard>

          <SkillCard
            whileHover={{ y: -5 }}
            onClick={() => handleNavigation("/skills")}
          >
            <SkillIcon>
              <FaShieldAlt />
            </SkillIcon>
            <SkillTitle>Security</SkillTitle>
            <SkillDetails className="skill-details">
              SIEM, Pen Testing, OWASP ZAP
            </SkillDetails>
          </SkillCard>
        </SkillsPreview>
      </ContentSection>

      <CTAContainer>
        <CTAButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleNavigation("/contact")}
          initial={{ opacity: 0 }}
          animate={ctaControls}
        >
          <FaEnvelope /> Get In Touch
        </CTAButton>
      </CTAContainer>

      <Footer>
        <SocialIcon
          href="https://linkedin.com/in/prateek-shetty-7375031a6/"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0 }}
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
          initial={{ opacity: 0 }}
          animate={socialIconsControls}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaGithub />
        </SocialIcon>
      </Footer>
    </MainContainer>
  );
}

export default MainScreen;
