import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";

const PageContainer = styled.div`
  min-height: 100vh;
  position: relative;
  background-color: ${(props) => props.theme.background};
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${(props) => props.theme.background};
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.secondaryBackground} 0%,
    ${(props) => props.theme.background} 100%
  );
  z-index: 0;
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 1;
  padding: 16px;
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: ${(props) => props.theme.primary};
  margin-bottom: 40px;
  text-align: center;
  font-family: "Roboto", sans-serif;
  font-weight: 100;
`;

const AchievementCard = styled(motion.div)`
  background-color: ${(props) => props.theme.cardBackground};
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px ${(props) => props.theme.shadow};
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Title = styled.h2`
  font-size: 24px;
  color: ${(props) => props.theme.primary};
  margin-bottom: 10px;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
`;

const Organization = styled.h3`
  font-size: 18px;
  color: ${(props) => props.theme.text};
  margin-bottom: 10px;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
`;

const Date = styled.p`
  font-size: 14px;
  color: ${(props) => props.theme.cardText};
  margin-bottom: 15px;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
`;

const Description = styled.p`
  font-size: 16px;
  color: ${(props) => props.theme.cardText};
  line-height: 1.6;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
`;

const CertificateLink = styled.a`
  display: inline-block;
  margin-top: 10px;
  color: ${(props) => props.theme.primary};
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;

  &:hover {
    color: ${(props) => props.theme.primaryHover};
    text-decoration: underline;
  }
`;

const AchievementContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Badge = styled.span`
  background-color: ${(props) => props.theme.secondaryBackground};
  color: ${(props) => props.theme.text};
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  margin-right: 8px;
  margin-bottom: 8px;
  display: inline-block;
`;

const BadgeContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
`;

const AchievementScreen = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  const achievements = [
    {
      title: "Outstanding Team",
      organization: "EOX Vantage",
      date: "Mar 2025",
      description:
        "Won the Outstanding Team Award at EOX Vantage for our contributions to the organization.",
    },
    {
      title: "Outstanding Performer",
      organization: "EOX Vantage",
      date: "OCT 2024",
      description:
        "Won the Outstanding Performer Award at EOX Vantage for my contributions to the team.",
    },
    {
      title: "Outstanding Team",
      organization: "EOX Vantage",
      date: "May 2024",
      description:
        "Won the Outstanding Team Award at EOX Vantage for our contributions to the organization.",
    },
    {
      title: "Winner of NetApp Hackathon",
      organization: "PES University",
      date: "OCT 2022",
      description: "Winner of NetApp Hackathon from PES University.",
    },
    {
      title: "Meta Global Hackathon Top 400",
      organization: "Meta",
      date: "SEP 2022",
      description:
        "One of the top 400 winners in Meta Global Hackathon out of 3000+ participants.",
    },
    {
      title: "Zoho Creator Challenge Qualifier",
      organization: "Hackerearth",
      date: "AUG 2022",
      description:
        "Qualified for the prototyping round of Zoho Creator Build an App Challenge on Hackerearth.",
    },
    {
      title: "Google Code Jam Qualifier",
      organization: "Google",
      date: "APR 2022",
      description: "Cleared the qualification round of Google Code Jam.",
    },
    {
      title: "Codechef Global Rank 157",
      organization: "Codechef",
      date: "FEB 2022",
      description:
        "Global Rank: 157 in February Long 2022 - II, Division 3 on Codechef.",
    },
    {
      title: "Hacktoberfest 2020",
      organization: "Digital Ocean",
      date: "OCT 2020",
      description: "Successfully completed Hacktoberfest 2020.",
    },
    {
      title: "PES University Ideathon Winner",
      organization: "PES University",
      date: "AUG 2019",
      description:
        "Led a team of 6 members and stood first among 30+ teams in an ideathon held by my university, for creating a simple prototype for a portable bottle capable of producing drinkable water on the go.",
    },
    {
      title: "TechnoSpark First Place",
      organization: "SDIT",
      date: "JUL 2018",
      description:
        "TechnoSpark, SDIT, stood first among 200+ teams by leading a team of 4 members and developing a model to replace inefficient road transportation vehicles by a proposed electric vehicle thus reducing the loss per annum to a nation's economy.",
    },
  ];

  return (
    <PageContainer>
      <BackgroundImage />
      <ContentContainer>
        <Header>Achievements</Header>
        <AchievementContainer
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ duration: 0.5 }}
        >
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Title>{achievement.title}</Title>
              <Organization>{achievement.organization}</Organization>
              <Date>{achievement.date}</Date>
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
            </AchievementCard>
          ))}
        </AchievementContainer>
      </ContentContainer>
    </PageContainer>
  );
};

export default AchievementScreen;
