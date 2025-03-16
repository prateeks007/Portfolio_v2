import styled from "styled-components";

const Header = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: ${(props) => props.theme.primary};
  margin-bottom: 40px;
  text-align: center;
  font-family: "Roboto", sans-serif;
  font-weight: 100;
`;

const AchievementCard = styled.div`
  background-color: ${(props) => props.theme.cardBackground};
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px ${(props) => props.theme.shadow};
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Title = styled.h2`
  font-size: 24px;
  color: ${(props) => props.theme.primary};
  margin-bottom: 10px;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
`;

const Organization = styled.h3`
  font-size: 18px;
  color: ${(props) => props.theme.text};
  margin-bottom: 10px;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
`;

const Date = styled.p`
  font-size: 14px;
  color: ${(props) => props.theme.cardText};
  margin-bottom: 15px;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
`;

const Description = styled.p`
  font-size: 16px;
  color: ${(props) => props.theme.cardText};
  line-height: 1.6;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
`;
