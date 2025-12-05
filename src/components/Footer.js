import React from "react";
import { motion } from "framer-motion";
import { FaLinkedinIn, FaHashnode, FaDev } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="w-full flex justify-center items-center mt-10 mb-6">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-8 py-4 shadow-xl flex justify-center gap-6">
        <motion.a
          href="https://linkedin.com/in/prateek-shetty-7375031a6/"
          target="_blank"
          rel="noopener noreferrer"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.15 }}
          className="text-white text-2xl transition-colors hover:text-gray-100"
        >
          <FaLinkedinIn />
        </motion.a>
        <motion.a
          href="https://github.com/prateeks007"
          target="_blank"
          rel="noopener noreferrer"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.15 }}
          className="text-white text-2xl transition-colors hover:text-gray-100"
        >
          <AiFillGithub />
        </motion.a>
        <motion.a
          href="https://hashnode.com/@prateeks007"
          target="_blank"
          rel="noopener noreferrer"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.15 }}
          className="text-white text-2xl transition-colors hover:text-gray-100"
        >
          <FaHashnode />
        </motion.a>
        <motion.a
          href="https://dev.to/prateeks007"
          target="_blank"
          rel="noopener noreferrer"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.15 }}
          className="text-white text-2xl transition-colors hover:text-gray-100"
        >
          <FaDev />
        </motion.a>
      </div>
    </footer>
  );
};

export default Footer;
