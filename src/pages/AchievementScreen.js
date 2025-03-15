import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";

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
  max-width: 800px;
  margin: 0 auto;

  @media (min-width: 600px) {
    padding: 24px;
  }
`;

const Header = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #fb9038;
  margin-bottom: 28px;
  text-align: center;
  font-family: "Roboto", sans-serif;
  font-weight: 100;

  @media (min-width: 600px) {
    font-size: 32px;
  }
`;

const AchievementCard = styled(motion.div)`
  background-color: rgba(40, 44, 52, 0.9);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (min-width: 600px) {
    padding: 24px;
  }
`;

const Date = styled.h3`
  font-size: 16px;
  font-weight: bold;
  color: #fb9038;
  margin-bottom: 12px;
  font-family: "Roboto", sans-serif;
  font-weight: 300;

  @media (min-width: 600px) {
    font-size: 18px;
  }
`;

const AchievementText = styled.p`
  font-size: 18px;
  color: #e0e0e0;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  line-height: 26px;

  @media (min-width: 600px) {
    font-size: 20px;
    line-height: 28px;
  }
`;

const AchievementScreen = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  const achievements = [
    {
      achievement: "Winner of NetApp Hackathon from PES University.",
      date: "OCT 2022",
    },
    {
      achievement:
        "One of the top 400 winners in Meta Global Hackathon out of 3000+ participants.",
      date: "SEP 2022",
    },
    {
      achievement:
        "Qualified for the prototyping round of Zoho Creator Build an App Challenge on Hackerearth.",
      date: "AUG 2022",
    },
    {
      achievement: "Cleared the qualification round of Google Code Jam.",
      date: "APR 2022",
    },
    {
      achievement:
        "Global Rank: 157 in February Long 2022 - II, Division 3 on Codechef.",
      date: "FEB 2022",
    },
    {
      achievement: "Successfully completed Hacktoberfest 2020.",
      date: "OCT 2020",
    },
    {
      achievement:
        "Led a team of 6 members and stood first among 30+ teams in an ideathon held by my university, for creating a simple prototype for a portable bottle capable of producing drinkable water on the go.",
      date: "AUG 2019",
    },
    {
      achievement:
        "TechnoSpark, SDIT, stood first among 200+ teams by leading a team of 4 members and developing a model to replace inefficient road transportation vehicles by a proposed electric vehicle thus reducing the loss per annum to a nation's economy.",
      date: "JUL 2018",
    },
  ];

  return (
    <PageContainer>
      <BackgroundImage />
      <ContentContainer>
        <Header>Achievements</Header>

        {achievements.map((item, index) => (
          <AchievementCard
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            transition={{ delay: index * 0.1 }}
          >
            <Date>{item.date}</Date>
            <AchievementText>{item.achievement}</AchievementText>
          </AchievementCard>
        ))}
      </ContentContainer>
    </PageContainer>
  );
};

export default AchievementScreen;
