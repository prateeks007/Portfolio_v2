import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import emailjs from "emailjs-com";

const PageContainer = styled.div`
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
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

const Header = styled.h1`
  font-size: 36px;
  color: #fb9038;
  margin-bottom: 40px;
  text-align: center;
  font-weight: 300;
`;

const ContactWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ContactInfo = styled.div`
  flex: 1;
  background-color: rgba(40, 44, 52, 0.8);
  border-radius: 8px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ContactInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  color: #e0e0e0;

  svg {
    color: #fb9038;
    font-size: 24px;
  }

  span {
    font-size: 18px;
  }
`;

const ContactForm = styled.form`
  flex: 2;
  background-color: rgba(40, 44, 52, 0.8);
  border-radius: 8px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: #e0e0e0;
  font-size: 16px;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid rgba(251, 144, 56, 0.3);
  background-color: rgba(30, 33, 39, 0.8);
  color: #e0e0e0;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #fb9038;
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid rgba(251, 144, 56, 0.3);
  background-color: rgba(30, 33, 39, 0.8);
  color: #e0e0e0;
  font-size: 16px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #fb9038;
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 12px 24px;
  background-color: #fb9038;
  color: #000;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  align-self: flex-start;
  margin-top: 10px;
`;

const SuccessMessage = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: rgba(39, 174, 96, 0.2);
  border: 1px solid #27ae60;
  border-radius: 4px;
  color: #e0e0e0;
`;

const ErrorMessage = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: rgba(251, 144, 56, 0.2);
  border: 1px solid #fb9038;
  border-radius: 4px;
  color: #e0e0e0;
`;

const ContactCard = styled(motion.div)`
  background-color: rgba(26, 26, 26, 0.8);
  border-radius: 12px;
  padding: 20px;
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

    // Initialize EmailJS with your user ID
    emailjs.init("YOUR_USER_ID"); // Replace with your EmailJS user ID
  }, [controls]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await emailjs.send(
        "YOUR_SERVICE_ID", // Replace with your EmailJS service ID
        "YOUR_TEMPLATE_ID", // Replace with your EmailJS template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        }
      );

      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
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
      <ContentContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ duration: 0.5 }}
        >
          <Header>Get In Touch</Header>

          <ContactWrapper>
            <ContactInfo>
              <ContactInfoItem>
                <FaEnvelope />
                <span>prateekshettybdmi@gmail.com</span>
              </ContactInfoItem>
            </ContactInfo>

            <ContactForm onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="message">Message</Label>
                <TextArea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <SubmitButton
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </SubmitButton>

              {error && <ErrorMessage>{error}</ErrorMessage>}
              {isSubmitted && (
                <SuccessMessage>
                  Your message has been sent successfully!
                </SuccessMessage>
              )}
            </ContactForm>
          </ContactWrapper>
        </motion.div>
      </ContentContainer>
    </PageContainer>
  );
};

export default ContactScreen;
