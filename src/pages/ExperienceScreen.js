import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import Timeline from "../components/Timeline";

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
  background-color: #000;
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

const ExperienceContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ExperienceCard = styled(motion.div)`
  background-color: rgba(26, 26, 26, 0.8);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ExperienceHeader = styled.div`
  margin-bottom: 15px;
`;

const ExperienceTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #fb9038;
  font-family: "Roboto", sans-serif;
  font-weight: 100;
`;

const ExperienceCompany = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
  color: #e0e0e0;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
`;

const ExperienceDate = styled.p`
  font-size: 16px;
  color: #a0a0a0;
  margin-bottom: 12px;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
`;

const ResponsibilitiesList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ResponsibilityItem = styled.li`
  font-size: 16px;
  margin-bottom: 8px;
  color: #d0d0d0;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  position: relative;
  padding-left: 20px;

  &:before {
    content: "•";
    color: #fb9038;
    position: absolute;
    left: 0;
  }
`;

const SectionDivider = styled.div`
  height: 1px;
  background-color: rgba(251, 144, 56, 0.3);
  margin: 40px 0;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  color: #fb9038;
  margin-bottom: 20px;
  text-align: center;
  font-family: "Roboto", sans-serif;
  font-weight: 100;
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

  // Timeline data for the visual timeline
  const timelineEvents = [
    {
      year: "2023",
      title: "Junior DevOps Engineer",
      organization: "EOX Vantage",
      description: "Implementing security solutions and CI/CD pipelines",
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
    <PageContainer>
      <BackgroundImage />
      <ContentContainer>
        <Header>Experience</Header>
        <ExperienceContainer
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ duration: 0.5 }}
        >
          {experiences.map((exp, index) => (
            <ExperienceCard key={index}>
              <ExperienceHeader>
                <ExperienceTitle>{exp.title}</ExperienceTitle>
                <ExperienceCompany>{exp.company}</ExperienceCompany>
                <ExperienceDate>{exp.date}</ExperienceDate>
              </ExperienceHeader>
              <ResponsibilitiesList>
                {exp.responsibilities.map((resp, respIndex) => (
                  <ResponsibilityItem key={respIndex}>
                    {resp}
                  </ResponsibilityItem>
                ))}
              </ResponsibilitiesList>
            </ExperienceCard>
          ))}
        </ExperienceContainer>

        <SectionDivider />

        <SectionTitle>Career Timeline</SectionTitle>
        <Timeline events={timelineEvents} />
      </ContentContainer>
    </PageContainer>
  );
};

export default ExperienceScreen;
