import styled from 'styled-components';
import chromeStoreLogo from '../images/ChromeStoreIcon.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ErrorMessage = styled.span`
  font-size: 18px;
  font-weight: 600;
`;

const ChromeStoreLogo = styled.img`
  height: 32px;
  margin: 0 12px 0 0;
`;

const Link = styled.a`
  font-size: 16px;
  line-height: 1;
  font-weight: 600;
  color: #fff;
  margin: 12px 0 0 0;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  align-items: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }
`;

export function CoreNotFoundError() {
  return (
    <Container>
      <ErrorMessage>Core Extension not found.</ErrorMessage>
      <Link
        target="_blank"
        rel="noreferrer"
        href="https://chrome.google.com/webstore/detail/core/agoakfejjabomempkjlepdflaleeobhb"
      >
        <ChromeStoreLogo src={chromeStoreLogo} alt="Chrome Web Store Logo" />
        <span>Download Core</span>
      </Link>
    </Container>
  );
}
