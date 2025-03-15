import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const TimelineContainer = styled(motion.div)`
  width: 100%;
  max-width: 800px;
  margin: 40px auto 0;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: rgba(251, 144, 56, 0.3);
    transform: translateX(-50%);

    @media (max-width: 768px) {
      left: 20px;
    }
  }
`;

const TimelineEvent = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-left: 40px;
  }
`;

const TimelineDate = styled.div`
  width: 120px;
  text-align: right;
  padding-right: 30px;
  color: #fb9038;
  font-weight: 600;

  @media (max-width: 768px) {
    text-align: left;
    padding-right: 0;
    margin-bottom: 5px;
  }
`;

const TimelineContent = styled.div`
  flex: 1;
  background-color: rgba(40, 44, 52, 0.8);
  border-radius: 8px;
  padding: 20px;
  margin-left: 30px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #fb9038;
    left: -38px;
    top: 15px;

    @media (max-width: 768px) {
      left: -48px;
    }
  }

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const EventTitle = styled.h3`
  color: #e0e0e0;
  margin: 0 0 5px;
  font-size: 18px;
  font-weight: 500;
`;

const EventOrganization = styled.h4`
  color: #fb9038;
  margin: 0 0 10px;
  font-size: 16px;
  font-weight: 400;
`;

const EventDescription = styled.p`
  color: #e0e0e0;
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
`;

const Timeline = ({ events }) => {
  return (
    <TimelineContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      {events.map((event, index) => (
        <TimelineEvent
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 + index * 0.1 }}
        >
          <TimelineDate>{event.year}</TimelineDate>
          <TimelineContent>
            <EventTitle>{event.title}</EventTitle>
            <EventOrganization>{event.organization}</EventOrganization>
            <EventDescription>{event.description}</EventDescription>
          </TimelineContent>
        </TimelineEvent>
      ))}
    </TimelineContainer>
  );
};

export default Timeline;
