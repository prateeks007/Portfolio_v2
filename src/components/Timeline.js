// src/components/Timeline.jsx (UPDATED)
import React from "react";
import styled from "styled-components";
import TimelineEventItem from "./TimelineEventItem"; // Import the new component

// --- Keyframe Animations (if any global animations needed for the timeline container itself) ---
// (None needed here for now, as individual items handle their own animations)

// --- Styled Components for Timeline Container ---

const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  max-width: 800px; /* Constrain width for better aesthetics */
  margin: 0 auto;
  padding: 40px 0;
  overflow-x: hidden; /* Prevent horizontal scroll from animations */

  &:before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 4px; /* Thicker timeline line */
    background: linear-gradient(
      180deg,
      transparent,
      ${(props) => props.theme.primary}50, /* Subtle gradient along the line */
      ${(props) => props.theme.primaryHover}50,
      transparent
    );
    border-radius: 2px;
    transform: translateX(-50%);
    z-index: 0; /* Keep behind events */
  }

  @media (max-width: 768px) {
    padding: 20px 0;
    &:before {
      left: 20px; /* Align line to the left on smaller screens */
      transform: translateX(0);
    }
  }
`;

// --- Timeline Component ---

const Timeline = ({ events }) => {
  return (
    <TimelineContainer>
      {events.map((event, index) => {
        const isOdd = index % 2 !== 0; // Determine if it's an odd index for alternating layout
        return (
          <TimelineEventItem key={index} event={event} isOdd={isOdd} />
        );
      })}
    </TimelineContainer>
  );
};

export default Timeline;