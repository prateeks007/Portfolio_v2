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
`;

const Header = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #fb9038;
  margin-bottom: 24px;
  text-align: center;
  font-family: "Roboto", sans-serif;
  font-weight: 100;
`;

const ExperienceCard = styled(motion.div)`
  background-color: rgba(40, 44, 52, 0.9);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #fb9038;
  font-family: "Roboto", sans-serif;
  font-weight: 100;
`;

const Company = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
  color: #e0e0e0;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
`;

const Date = styled.p`
  font-size: 16px;
  color: #a0a0a0;
  margin-bottom: 12px;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
`;

const Divider = styled.div`
  height: 1px;
  background-color: #fb9038;
  margin: 12px 0;
`;

const Responsibility = styled.p`
  font-size: 16px;
  margin-bottom: 8px;
  color: #d0d0d0;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
`;

const ExperienceScreen = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  const experiences = [
    {
      title: "Junior DevOps Engineer",
      company: "EOX Vantage",
      date: "AUG 2023 – Present",
      responsibilities: [
        "Implemented Elasticsearch for enhanced logging and monitoring architecture",
        "Deployed Wazuh SIEM solution across multiple servers",
        "Implemented GitHub Actions for CI/CD processes",
        "Regularly conduct Dynamic Application Security Testing (DAST)",
        "Developed security scripts for vulnerability scanning",
      ],
    },
    {
      title: "Software Developer Intern / DevOps Intern",
      company: "EOX Vantage",
      date: "JAN 2023 – AUG 2023",
      responsibilities: [
        "Gained experience with JavaScript, Ruby, and Ruby on Rails",
        "Migrated client project to company's low code platform",
        "Conducted pen-testing using ZAP, Burp Suite, and sqlmap",
        "Implemented Circle CI for continuous integration",
        "Explored Jenkins, Terraform, and Ansible",
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

  return (
    <PageContainer>
      <BackgroundImage />
      <ContentContainer>
        <Header>Experience</Header>

        {experiences.map((exp, index) => (
          <ExperienceCard
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            transition={{ delay: index * 0.2 }}
          >
            <Title>{exp.title}</Title>
            <Company>{exp.company}</Company>
            <Date>{exp.date}</Date>
            <Divider />
            {exp.responsibilities.map((resp, i) => (
              <Responsibility key={i}>• {resp}</Responsibility>
            ))}
          </ExperienceCard>
        ))}
      </ContentContainer>
    </PageContainer>
  );
};

export default ExperienceScreen;
