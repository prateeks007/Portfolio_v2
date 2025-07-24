// src/components/TimelineEventItem.jsx
import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer"; // Make sure this is installed!

// --- Styled Components (Moved from Timeline.jsx to be specific to an item) ---

const TimelineEventWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-bottom: 50px; /* Space between events */
  position: relative;
  z-index: 1; /* Ensure events are above the line */

  &:last-child {
    margin-bottom: 0;
  }

  /* Alternating layout for events */
  &.odd { /* Use a class for odd/even, passed via props */
    flex-direction: row-reverse; /* Text on the right, node on the right */
    .timeline-node {
      margin-left: -2px; /* Pull node slightly into line for visual cohesion */
    }
    .timeline-content {
      margin-right: 40px; /* Space from node */
      text-align: right;
    }
    .timeline-year {
      left: auto;
      right: calc(50% + 50px); /* Position year correctly for right side */
      @media (max-width: 768px) {
        right: auto;
        left: 50px; /* Adjust for mobile left alignment */
        text-align: left;
      }
    }
  }

  &.even { /* Use a class for odd/even, passed via props */
    flex-direction: row; /* Text on the left, node on the left */
    .timeline-node {
      margin-right: -2px;
    }
    .timeline-content {
      margin-left: 40px;
      text-align: left;
    }
    .timeline-year {
      left: calc(50% + 50px); /* Position year correctly for left side */
      @media (max-width: 768px) {
        left: 50px; /* Adjust for mobile left alignment */
        text-align: left;
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: row !important; /* Force all to left on small screens */
    margin-bottom: 30px;
    .timeline-node {
      margin-right: -2px !important; /* Adjust node margin for mobile */
      margin-left: 0 !important;
    }
    .timeline-content {
      margin-left: 40px !important;
      margin-right: 0 !important;
      text-align: left !important;
    }
  }
`;

const TimelineNode = styled(motion.div)`
  width: 20px;
  height: 20px;
  background-color: ${(props) => props.theme.primary};
  border-radius: 50%;
  border: 4px solid ${(props) => props.theme.cardBackground}; /* Card background to simulate depth */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0; /* Prevent shrinking on small screens */
  box-shadow: 0 0 15px ${(props) => props.theme.primary}50; /* Subtle glow */
  position: relative;
  z-index: 2; /* Ensure node is on top */
  transition: transform 0.3s ease-out;

  &:hover {
    transform: scale(1.2); /* Subtle pop on hover */
    box-shadow: 0 0 25px ${(props) => props.theme.primary}80;
  }
`;

const TimelineContent = styled(motion.div)`
  background: ${(props) => props.theme.cardBackground};
  border-radius: 12px; /* Slightly less rounded than experience cards */
  padding: 20px 25px;
  box-shadow: 0 8px 25px ${(props) => props.theme.cardShadow}; /* Softer shadow */
  border: 1px solid ${(props) => props.theme.cardBorder};
  flex-grow: 1; /* Allows content to take available space */
  max-width: calc(50% - 60px); /* Adjust based on node width and margin */
  position: relative; /* For year positioning */

  @media (max-width: 768px) {
    max-width: calc(100% - 70px); /* Takes more width on mobile */
  }
`;

const TimelineYear = styled(motion.div)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 28px;
  font-weight: 700;
  color: ${(props) => props.theme.primary};
  text-shadow: 0 0 10px ${(props) => props.theme.primary}40;
  white-space: nowrap; /* Prevent year from wrapping */
  width: 80px; /* Fixed width for consistent alignment */
  text-align: center;
  z-index: 1; /* Below the content card but above the line */

  @media (max-width: 768px) {
    position: static; /* Remove absolute positioning on mobile */
    transform: none;
    font-size: 24px;
    margin-bottom: 10px; /* Add margin below year on mobile */
    text-align: left;
    width: auto;
  }
`;

const EventTitle = styled.h4`
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.titleText};
  margin-bottom: 5px;
  line-height: 1.3;
`;

const EventOrganization = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => props.theme.companyText};
  margin-bottom: 8px;
`;

const EventDescription = styled.p`
  font-size: 15px;
  color: ${(props) => props.theme.responsibilityText};
  line-height: 1.5;
`;

// --- Animation Variants ---

const timelineEventVariants = {
  hidden: (isOdd) => ({
    opacity: 0,
    x: isOdd ? 100 : -100, // Slide from right for odd, left for even
    scale: 0.85,
  }),
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 12,
      mass: 1,
      delayChildren: 0.2, // Delay for internal elements
      staggerChildren: 0.1,
    },
  },
};

const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 150,
            damping: 10,
            delay: 0.1 // Node appears slightly before content
        }
    }
};

const yearVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delay: 0.3, // Year appears after the node/card starts
            duration: 0.4
        }
    }
};

const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.3, // Content appears after the card slides in
            duration: 0.5
        }
    }
};

// --- TimelineEventItem Component ---
const TimelineEventItem = ({ event, isOdd }) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.2, // Trigger when 20% of the component is in view
    triggerOnce: true, // Only animate once
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      // Optional: reset animation if element scrolls out of view
      // controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <TimelineEventWrapper
      ref={ref}
      className={isOdd ? 'odd' : 'even'} // Pass odd/even as a class
      custom={isOdd}
      initial="hidden"
      animate={controls}
      variants={timelineEventVariants}
    >
      <TimelineYear className="timeline-year" variants={yearVariants}>
        {event.year}
      </TimelineYear>

      <TimelineNode className="timeline-node" variants={nodeVariants} />

      <TimelineContent className="timeline-content" variants={contentVariants}>
        <EventTitle>{event.title}</EventTitle>
        <EventOrganization>{event.organization}</EventOrganization>
        <EventDescription>{event.description}</EventDescription>
      </TimelineContent>
    </TimelineEventWrapper>
  );
};

export default TimelineEventItem;