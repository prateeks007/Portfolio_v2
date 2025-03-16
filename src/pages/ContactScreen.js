import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import {
  FaEnvelope,
  FaPaperPlane,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";
import { sendEmail } from "../utils/emailService";

const PageContainer = styled.div`
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #1a2a3a 0%, #0d1b2a 100%);
  z-index: 0;
`;

// Animated background elements
const BackgroundCircle = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(251, 144, 56, 0.1) 0%,
    rgba(251, 144, 56, 0) 70%
  );
  z-index: 0;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 80px 20px 40px;
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const Header = styled(motion.h1)`
  font-size: 42px;
  color: #fb9038;
  margin-bottom: 40px;
  text-align: center;
  font-weight: 300;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(
      90deg,
      rgba(251, 144, 56, 0) 0%,
      rgba(251, 144, 56, 1) 50%,
      rgba(251, 144, 56, 0) 100%
    );
  }
`;

const ContactWrapper = styled(motion.div)`
  display: flex;
  flex-direction: row;
  gap: 40px;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ContactInfo = styled(motion.div)`
  flex: 1;
  background-color: rgba(40, 44, 52, 0.8);
  border-radius: 12px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(251, 144, 56, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  }
`;

const ContactInfoItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 15px;
  color: #e0e0e0;
  padding: 10px;
  border-radius: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(251, 144, 56, 0.1);
  }

  svg {
    color: #fb9038;
    font-size: 24px;
  }

  span {
    font-size: 18px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const SocialIcon = styled(motion.a)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(251, 144, 56, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fb9038;
  font-size: 20px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #fb9038;
    color: #0d1b2a;
    transform: translateY(-3px);
  }
`;

const ContactForm = styled(motion.form)`
  flex: 2;
  background-color: rgba(40, 44, 52, 0.8);
  border-radius: 12px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(251, 144, 56, 0.1);
`;

const FormGroup = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: #e0e0e0;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    color: #fb9038;
    font-size: 16px;
  }
`;

const Input = styled(motion.input)`
  padding: 14px;
  border-radius: 8px;
  border: 1px solid rgba(251, 144, 56, 0.3);
  background-color: rgba(30, 33, 39, 0.8);
  color: #e0e0e0;
  font-size: 16px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #fb9038;
    box-shadow: 0 0 0 3px rgba(251, 144, 56, 0.2);
  }
`;

const TextArea = styled(motion.textarea)`
  padding: 14px;
  border-radius: 8px;
  border: 1px solid rgba(251, 144, 56, 0.3);
  background-color: rgba(30, 33, 39, 0.8);
  color: #e0e0e0;
  font-size: 16px;
  resize: vertical;
  min-height: 150px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #fb9038;
    box-shadow: 0 0 0 3px rgba(251, 144, 56, 0.2);
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 14px 28px;
  background-color: #fb9038;
  color: #000;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  align-self: flex-start;
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  overflow: hidden;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  &:hover:after {
    left: 100%;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled(motion.div)`
  margin-top: 20px;
  padding: 15px;
  background-color: rgba(39, 174, 96, 0.2);
  border: 1px solid #27ae60;
  border-radius: 8px;
  color: #e0e0e0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ErrorMessage = styled(motion.div)`
  margin-top: 20px;
  padding: 15px;
  background-color: rgba(231, 76, 60, 0.2);
  border: 1px solid #e74c3c;
  border-radius: 8px;
  color: #e0e0e0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ContactScreen = () => {
  const controls = useAnimation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in all fields");
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      setIsSubmitting(false);
      return;
    }

    try {
      const htmlContent = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Message:</strong> ${formData.message}</p>
      `;

      const result = await sendEmail({
        to: "prateekshettybdmi@gmail.com",
        subject: `Portfolio Contact: ${formData.name}`,
        html: htmlContent,
      });

      if (result.success) {
        // If this is a mock response in development, show a message
        if (result.mock) {
          console.log("Development mode: Email sending simulated successfully");
        }

        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(result.error || "Failed to send email");
      }
    } catch (error) {
      setError("Failed to send message. Please try again later.");
      console.error("Error sending email:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer>
      <BackgroundImage />

      {/* Animated background elements */}
      <BackgroundCircle
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: 0.5,
          scale: 1,
          x: [0, 10, -10, 0],
          y: [0, -10, 10, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          top: "20%",
          left: "10%",
          width: "300px",
          height: "300px",
        }}
      />

      <BackgroundCircle
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: 0.3,
          scale: 1,
          x: [0, -15, 15, 0],
          y: [0, 15, -15, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2,
        }}
        style={{
          bottom: "10%",
          right: "15%",
          width: "400px",
          height: "400px",
        }}
      />

      <ContentContainer>
        <Header
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Get In Touch
        </Header>

        <ContactWrapper
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ContactInfo
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <ContactInfoItem
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaEnvelope />
              <span>prateekshettybdmi@gmail.com</span>
            </ContactInfoItem>

            <div>
              <h3 style={{ color: "#fb9038", marginBottom: "15px" }}>
                Connect With Me
              </h3>
              <SocialLinks>
                <SocialIcon
                  href="https://linkedin.com/in/prateek-shetty-7375031a6/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaLinkedinIn />
                </SocialIcon>
                <SocialIcon
                  href="https://github.com/prateeks007"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub />
                </SocialIcon>
              </SocialLinks>
            </div>
          </ContactInfo>

          <ContactForm
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            onSubmit={handleSubmit}
          >
            <FormGroup
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                whileFocus={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </FormGroup>

            <FormGroup
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                whileFocus={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </FormGroup>

            <FormGroup
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <Label htmlFor="message">Message</Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                whileFocus={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </FormGroup>

            <SubmitButton
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
              <FaPaperPlane />
            </SubmitButton>

            {isSubmitted && (
              <SuccessMessage
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span role="img" aria-label="success">
                  ✅
                </span>
                Your message has been sent successfully! I'll get back to you
                soon.
              </SuccessMessage>
            )}

            {error && (
              <ErrorMessage
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span role="img" aria-label="error">
                  ❌
                </span>
                {error}
              </ErrorMessage>
            )}
          </ContactForm>
        </ContactWrapper>
      </ContentContainer>
    </PageContainer>
  );
};

export default ContactScreen;
