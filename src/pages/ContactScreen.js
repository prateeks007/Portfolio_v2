import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import {
  FaEnvelope,
  FaLinkedinIn,
  FaGithub,
  FaMapMarkerAlt,
  FaArrowRight, // New icon for "send" or "continue"
} from "react-icons/fa";
import { FiLoader } from "react-icons/fi"; // For loading spinner
// import { sendEmail } from "../utils/emailService"; // Keep this commented if not functional

// --- Master Page Container ---
const PageContainer = styled(motion.div)`
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  /* Use gradientStart and gradientEnd for a richer, themed background */
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.gradientStart} 0%,
    ${(props) => props.theme.gradientEnd} 100%
  );
  padding: 80px 20px 40px; /* Overall padding */
  box-sizing: border-box; /* Include padding in element's total width and height */

  @media (max-width: 768px) {
    padding: 60px 15px 30px;
  }
`;

// --- Animated Background Elements ---
const BackgroundCircle = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    ${(props) => props.theme.animatedOverlay1} 0%,
    ${(props) => props.theme.animatedOverlay1}00 70% /* Use theme colors */
  );
  z-index: 0;
  pointer-events: none; /* Ensure it doesn't interfere with interactions */
`;

// --- Main Content Wrapper ---
const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  max-width: 1200px; /* Wider content for split layout */
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
`;

// --- Header Section ---
const HeaderSection = styled(motion.div)`
  text-align: center;
  margin-bottom: 60px; /* More space before the main contact layout */

  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

const MainHeader = styled.h1`
  font-size: 64px; /* Even larger, more impactful */
  font-weight: 800; /* Extra bold */
  color: ${(props) => props.theme.headerText};
  margin-bottom: 15px;
  font-family: "Roboto", sans-serif;
  letter-spacing: -0.05em; /* Tighter for modern look */
  text-shadow: 0 0 40px ${(props) => props.theme.primary}B0; /* More intense glow */

  @media (max-width: 1024px) {
    font-size: 54px;
  }
  @media (max-width: 768px) {
    font-size: 44px;
  }
  @media (max-width: 480px) {
    font-size: 36px;
  }
`;

const Subheader = styled.p`
  font-size: 22px;
  color: ${(props) => props.theme.titleText};
  max-width: 700px; /* Constrain width for readability */
  margin: 0 auto;
  font-family: "Inter", sans-serif;
  line-height: 1.6;
  opacity: 0.9;

  @media (max-width: 1024px) {
    font-size: 20px;
  }
  @media (max-width: 768px) {
    font-size: 18px;
  }
  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

// --- Main Contact Layout (Split Columns) ---
const ContactLayout = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1.5fr; /* Info on left, wider form on right */
  gap: 50px; /* Increased gap */
  align-items: flex-start; /* Align content to the top */

  @media (max-width: 1024px) {
    grid-template-columns: 1fr; /* Stack columns on smaller screens */
    gap: 40px;
  }
`;

// --- Contact Info Card ---
const ContactInfoCard = styled(motion.div)`
  background-color: ${(props) => props.theme.cardBackground};
  border-radius: 20px; /* Larger border-radius for softer look */
  padding: 40px; /* More generous padding */
  display: flex;
  flex-direction: column;
  gap: 30px;
  box-shadow: 0 20px 60px ${(props) => props.theme.cardShadow}; /* Deeper shadow */
  border: 1px solid ${(props) => props.theme.cardBorder};
  transition: transform 0.3s ease-out, box-shadow 0.3s ease-out,
    background-color 0.3s ease-out, border-color 0.3s ease-out;

  &:hover {
    transform: translateY(-10px); /* More pronounced lift */
    box-shadow: 0 25px 70px ${(props) => props.theme.cardShadow}C0; /* Stronger shadow on hover */
    background-color: ${(props) => props.theme.cardHoverBackground};
    border-color: ${(props) => props.theme.primary}50;
  }

  @media (max-width: 480px) {
    padding: 30px;
  }
`;

const InfoItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 20px; /* Larger gap */
  color: ${(props) => props.theme.companyText}; /* Softer text color */
  padding: 15px;
  border-radius: 12px; /* Softer corners */
  transition: background-color 0.3s ease, transform 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.animatedOverlay1};
    transform: translateX(8px); /* Subtle slide on hover */
  }

  svg {
    color: ${(props) => props.theme.primary};
    font-size: 30px; /* Larger icons */
    min-width: 30px;
  }

  span {
    font-size: 20px; /* Larger text */
    font-weight: 500;
    font-family: "Inter", sans-serif;
  }
`;

const SocialsTitle = styled.h3`
  color: ${(props) => props.theme.primary};
  margin-bottom: 20px;
  font-size: 24px;
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  letter-spacing: -0.02em;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 20px; /* Larger gap */
  margin-top: 10px; /* Space from title */
`;

const SocialIcon = styled(motion.a)`
  width: 55px; /* Larger icons */
  height: 55px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.cardHoverBackground};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.primary};
  font-size: 28px; /* Larger icon font size */
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15); /* More pronounced shadow */
  border: 1px solid ${(props) => props.theme.cardBorder};

  &:hover {
    background-color: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.cardBackground};
    transform: translateY(-6px) scale(1.1); /* More pronounced lift and scale */
    box-shadow: 0 10px 25px ${(props) => props.theme.primary}60;
  }
`;

// --- Contact Form Card ---
const ContactFormCard = styled(motion.form)`
  background-color: ${(props) => props.theme.cardBackground};
  padding: 40px; /* Consistent padding */
  border-radius: 20px; /* Consistent border-radius */
  box-shadow: 0 20px 60px ${(props) => props.theme.cardShadow};
  border: 1px solid ${(props) => props.theme.cardBorder};
  transition: transform 0.3s ease-out, box-shadow 0.3s ease-out,
    background-color 0.3s ease-out, border-color 0.3s ease-out;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 25px 70px ${(props) => props.theme.cardShadow}C0;
    background-color: ${(props) => props.theme.cardHoverBackground};
    border-color: ${(props) => props.theme.primary}50;
  }

  @media (max-width: 480px) {
    padding: 30px;
  }
`;

// --- Form Group with Floating Label ---
const FormGroup = styled(motion.div)`
  position: relative;
  margin-bottom: 35px; /* More space for floating label */
`;

const Label = styled.label`
  position: absolute;
  top: 16px; /* Initial position within input padding */
  left: 18px; /* Initial position */
  color: ${(props) => props.theme.dateText}; /* Softer color for initial label */
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 18px;
  pointer-events: none; /* Make label unclickable */
  transition: all 0.2s ease-out; /* Smooth transition for floating effect */
  background-color: ${(props) => props.theme.cardBackground}; /* To cover input border if label goes above */
  padding: 0 5px; /* Padding for background coverage */
  box-sizing: border-box;
`;

const StyledInput = styled(motion.input)`
  width: 100%;
  padding: 16px 18px; /* More padding */
  border: 1px solid ${(props) => props.theme.cardBorder};
  border-radius: 10px; /* Softer corners */
  background-color: ${(props) => props.theme.secondaryBackground};
  color: ${(props) => props.theme.titleText};
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 18px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
  box-sizing: border-box; /* Important for consistent sizing */

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.primary};
    box-shadow: 0 0 0 4px ${(props) => props.theme.primary}40; /* Stronger glow */
    background-color: ${(props) => props.theme.cardBackground}; /* White/darker background on focus */
  }

  /* Specific style when the input is filled or focused, to move the label */
  &:not(:placeholder-shown) + ${Label},
  &:focus + ${Label} {
    top: -12px; /* Move label above the input */
    left: 15px;
    font-size: 14px; /* Smaller font size when floating */
    color: ${(props) => props.theme.primary}; /* Primary color when floating */
    font-weight: 600;
  }
`;

const StyledTextArea = styled(motion.textarea)`
  width: 100%;
  padding: 16px 18px;
  border: 1px solid ${(props) => props.theme.cardBorder};
  border-radius: 10px;
  background-color: ${(props) => props.theme.secondaryBackground};
  color: ${(props) => props.theme.titleText};
  min-height: 180px; /* More generous height for messages */
  resize: vertical;
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 1.6;
  transition: border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.primary};
    box-shadow: 0 0 0 4px ${(props) => props.theme.primary}40;
    background-color: ${(props) => props.theme.cardBackground};
  }

  /* Specific style when the textarea is filled or focused, to move the label */
  &:not(:placeholder-shown) + ${Label},
  &:focus + ${Label} {
    top: -12px;
    left: 15px;
    font-size: 14px;
    color: ${(props) => props.theme.primary};
    font-weight: 600;
  }
`;

const SubmitButton = styled(motion.button)`
  background-color: ${(props) => props.theme.primary};
  color: #ffffff;
  padding: 15px 30px; /* More generous padding */
  border: none;
  border-radius: 10px; /* Consistent with inputs */
  cursor: pointer;
  font-size: 19px; /* Larger font size */
  font-weight: 700; /* Bolder font */
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease, opacity 0.3s ease;
  font-family: "Roboto", sans-serif;
  display: flex;
  align-items: center;
  gap: 12px; /* More space for icon */
  justify-content: center;
  width: fit-content; /* Adjust width to content */
  min-width: 180px; /* Minimum width for consistency */

  &:hover {
    background-color: ${(props) => props.theme.primaryHover};
    transform: translateY(-3px); /* More subtle lift on hover */
    box-shadow: 0 10px 25px ${(props) => props.theme.primary}50; /* Stronger shadow */
  }

  &:disabled {
    background-color: ${(props) => props.theme.dateText};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    opacity: 0.7;
  }

  svg {
    font-size: 22px;
  }
`;

// --- Message Feedback ---
const MessageContainer = styled(motion.div)`
  margin-top: 30px; /* More space */
  padding: 18px 25px; /* More padding */
  border-radius: 10px;
  font-family: "Inter", sans-serif;
  font-weight: 600; /* Bolder message text */
  font-size: 17px;
  display: flex;
  align-items: center;
  gap: 12px; /* More space for icon */
  border: 1px solid;
`;

const ErrorMessage = styled(MessageContainer)`
  background-color: #fce8e8; /* Lighter red */
  color: #c0392b; /* Darker, clearer red */
  border-color: #e74c3c;
  box-shadow: 0 5px 15px rgba(192, 57, 43, 0.2);

  span {
    font-size: 24px;
  }
`;

const SuccessMessage = styled(MessageContainer)`
  background-color: #e6f7ed; /* Lighter green */
  color: #27ae60; /* Darker, clearer green */
  border-color: #2ecc71;
  box-shadow: 0 5px 15px rgba(46, 204, 113, 0.2);

  span {
    font-size: 24px;
  }
`;

// --- Main Component ---
const ContactScreen = () => {
  const controls = useAnimation(); // For overall entrance animation (though page transition from App.js handles this)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Use this for initial animations of child elements within this screen if needed
  useEffect(() => {
    // For example, to stagger children elements, you might use sequence
    // controls.start({ opacity: 1, y: 0, transition: { staggerChildren: 0.1 } });
  }, [controls]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error/success messages on input change
    if (error) setError("");
    if (isSubmitted) setIsSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setIsSubmitted(false);

    // Simple validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError("Please fill in all fields.");
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    // --- Simulate API call since `sendEmail` is not functional ---
    console.log("Simulating email submission:", formData);
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2-second delay

      // You can toggle these to simulate success or failure during development
      const simulateSuccess = true; // Set to false to simulate an error

      if (simulateSuccess) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" }); // Clear form on success
      } else {
        throw new Error("Simulated network error or server issue.");
      }
    } catch (err) {
      setError("Failed to send message. Please try again later.");
      console.error("Error simulating email send:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated background elements */}
      <BackgroundCircle
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0.3, 0.5, 0.3], // Varying opacity for a more organic feel
          scale: [0.8, 1.2, 0.8],
          x: ["10%", "5%", "15%", "10%"], // More subtle movement
          y: ["20%", "25%", "15%", "20%"],
          rotate: [0, 90, 180, 270, 360], // Rotation
        }}
        transition={{
          duration: 30, // Longer duration for slower animation
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        style={{
          top: "10%",
          left: "5%",
          width: "350px",
          height: "350px",
        }}
      />

      <BackgroundCircle
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [0.7, 1.1, 0.7],
          x: ["-10%", "0%", "-5%", "-10%"],
          y: ["-20%", "-25%", "-15%", "-20%"],
          rotate: [0, -90, -180, -270, -360],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: 5,
        }}
        style={{
          bottom: "5%",
          right: "5%",
          width: "450px",
          height: "450px",
        }}
      />

      <ContentWrapper>
        <HeaderSection
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <MainHeader>Let's Build Something Great!</MainHeader>
          <Subheader>
            I'm always excited to discuss new projects, creative ideas, or
            opportunities to be part of your vision. Feel free to send me a message!
          </Subheader>
        </HeaderSection>

        <ContactLayout
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <ContactInfoCard
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <InfoItem
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => window.location.href = "mailto:prateekshettybdmi@gmail.com"}
            >
              <FaEnvelope />
              <span>prateekshettybdmi@gmail.com</span>
            </InfoItem>

            <InfoItem
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaMapMarkerAlt />
              <span>Bengaluru, Karnataka, India</span>
            </InfoItem>

            <div>
              <SocialsTitle>Find Me Online</SocialsTitle>
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
          </ContactInfoCard>

          <ContactFormCard
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            onSubmit={handleSubmit}
          >
            <FormGroup
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <StyledInput
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder=" " /* Corrected: Comment removed */
                required
              />
              <Label htmlFor="name">Your Full Name</Label>
            </FormGroup>

            <FormGroup
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <StyledInput
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder=" " /* Corrected: Comment removed */
                required
              />
              <Label htmlFor="email">Your Email Address</Label>
            </FormGroup>

            <FormGroup
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              <StyledTextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder=" " /* Corrected: Comment removed */
                required
              />
              <Label htmlFor="message">Your Message</Label>
            </FormGroup>

            <SubmitButton
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <FiLoader />
                  </motion.div>
                  Sending...
                </>
              ) : (
                <>
                  Send Message <FaArrowRight />
                </>
              )}
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
                Your message has been sent successfully! I'll get back to you soon.
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
          </ContactFormCard>
        </ContactLayout>
      </ContentWrapper>
    </PageContainer>
  );
};

export default ContactScreen;