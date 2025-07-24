// src/components/AchievementCardItem.jsx
import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer"; // Ensure this is installed!

// --- Styled Components (Moved from AchievementScreen.jsx) ---

const StyledAchievementCard = styled(motion.div)`
  background: ${(props) => props.theme.cardBackground};
  border-radius: 20px;
  padding: 35px;
  box-shadow: 0 15px 45px ${(props) => props.theme.cardShadow};
  border: 1px solid ${(props) => props.theme.cardBorder};
  perspective: 1000px;

  transition: transform 0.3s ease-out, box-shadow 0.3s ease-out, background 0.3s ease-out, border-color 0.3s ease-out;

  &:hover {
    transform: translateY(-10px) rotateX(3deg) scale(1.01);
    background: ${(props) => props.theme.cardHoverBackground};
    box-shadow: 0 20px 60px ${(props) => props.theme.cardShadow}A0;
    border-color: ${(props) => props.theme.primary}50;
  }

  @media (max-width: 600px) {
    padding: 25px;
  }
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: ${(props) => props.theme.primary};
  margin-bottom: 10px;
  font-family: "Roboto", sans-serif;
  letter-spacing: -0.025em;
  text-shadow: 0 0 8px ${(props) => props.theme.primary}40;

  @media (max-width: 600px) {
    font-size: 22px;
  }
`;

const Organization = styled.h3`
  font-size: 22px;
  font-weight: 500;
  color: ${(props) => props.theme.companyText};
  margin-bottom: 8px;
  font-family: "Inter", sans-serif;
`;

const DateText = styled.p` // Renamed from 'Date' to 'DateText' to avoid conflict with JS Date object
  font-size: 18px;
  color: ${(props) => props.theme.dateText};
  margin-bottom: 18px;
  font-family: "Inter", sans-serif;
  font-weight: 400;
`;

const Description = styled.p`
  font-size: 18px;
  color: ${(props) => props.theme.responsibilityText};
  line-height: 1.7;
  font-family: "Inter", sans-serif;
  font-weight: 300;
`;

const CertificateLink = styled.a`
  display: inline-block;
  margin-top: 20px;
  color: ${(props) => props.theme.primary};
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  transition: color 0.2s, transform 0.2s;

  &:hover {
    color: ${(props) => props.theme.primaryHover};
    text-decoration: underline;
    transform: translateX(5px);
  }
`;

const Badge = styled.span`
  background-color: ${(props) => props.theme.cardHoverBackground};
  color: ${(props) => props.theme.titleText};
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 14px;
  margin-right: 10px;
  margin-bottom: 10px;
  display: inline-block;
  font-weight: 500;
  border: 1px solid ${(props) => props.theme.cardBorder};
`;

const BadgeContainer = styled.div`
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

// --- Animation Variants (from AchievementScreen.jsx) ---
const cardVariants = {
  hidden: { opacity: 0, y: 80, scale: 0.9, rotateX: -5 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 16,
      mass: 1.2,
    },
  },
};

// --- AchievementCardItem Component ---
const AchievementCardItem = ({ achievement }) => {
  const itemControls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.1, // Trigger when 10% of the item is visible
    triggerOnce: true, // Animate only once when it comes into view
  });

  useEffect(() => {
    if (inView) {
      itemControls.start("visible");
    }
  }, [itemControls, inView]);

  return (
    <StyledAchievementCard
      ref={ref}
      initial="hidden"
      animate={itemControls}
      variants={cardVariants}
    >
      <Title>{achievement.title}</Title>
      <Organization>{achievement.organization}</Organization>
      <DateText>{achievement.date}</DateText> {/* Use DateText here */}
      <Description>{achievement.description}</Description>
      {achievement.certificateLink && (
        <CertificateLink
          href={achievement.certificateLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Certificate
        </CertificateLink>
      )}
      {achievement.badges && (
        <BadgeContainer>
          {achievement.badges.map((badge, badgeIndex) => (
            <Badge key={badgeIndex}>{badge}</Badge>
          ))}
        </BadgeContainer>
      )}
    </StyledAchievementCard>
  );
};

export default AchievementCardItem;