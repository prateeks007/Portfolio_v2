import React from "react";
import styled from "styled-components";

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  width: 400px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RobotGif = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
`;

const PopupText = styled.p`
  font-size: 16px;
  text-align: center;
  margin-bottom: 10px;
  color: #333;
  font-family: "Roboto", sans-serif;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #fb9038;
  border-radius: 5px;
  border: none;
  color: #fff;
  font-family: "Merriweather", serif;
  font-weight: 300;
  font-style: italic;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e07d20;
  }
`;

const Popup = ({ onClose }) => {
  return (
    <PopupOverlay>
      <PopupContent>
        <RobotGif
          src="https://media.giphy.com/media/9kzGqfk7xgN0AZw3jo/giphy.gif"
          alt="Robot"
        />
        <PopupText>Hi there! 🚧</PopupText>
        <PopupText>
          This portfolio is still a work in progress. Check back soon for more
          updates!
        </PopupText>
        <Button onClick={onClose}>Got it!</Button>
      </PopupContent>
    </PopupOverlay>
  );
};

export default Popup;
