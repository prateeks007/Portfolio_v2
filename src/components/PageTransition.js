import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const PageContainer = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
`;

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -20,
  },
};

const PageTransition = ({ children }) => {
  return (
    <PageContainer
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {children}
    </PageContainer>
  );
};

export default PageTransition;
