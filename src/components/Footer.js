import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaLinkedinIn } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai";

const FooterContainer = styled.footer`
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
  margin: 10px;
  font-size: 20px;
  cursor: pointer;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <SocialIcon
        href="https://linkedin.com/in/prateek-shetty-7375031a6/"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaLinkedinIn />
      </SocialIcon>
      <SocialIcon
        href="https://github.com/prateeks007"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <AiFillGithub />
      </SocialIcon>
    </FooterContainer>
  );
};

export default Footer;
