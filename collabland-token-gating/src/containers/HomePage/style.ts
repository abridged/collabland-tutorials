import Bot from '@/assets/resource/images/bot.png';
import { device } from '@/components/utils';
import styled from 'styled-components';

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;
const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
`;
const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and ${device.desktop} {
    width: 80vw;
    max-width: 1280px;
  }
  @media screen and ${device.mobile} {
    width: 90vw;
  }
`;
const MainTitle = styled.div`
  font-size: 36px;
  color: #1b1b1b;
`;
const SubTitle = styled.div`
  font-size: 16px;
  color: #777;
  font-weight: 200-;
`;
const BotContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  @media screen and ${device.desktop} {
    width: 80vw;
  }
  @media screen and ${device.mobile} {
    width: 90vw;
  }
  background-image: url(${Bot});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;
const NavbarLinkContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
  @media screen and ${device.desktop} {
    padding-right: 40px;
  }
`;
const FooterLink = styled.a`
  display: flex;
  padding-right: 16px;
  text-decoration: none !important;
  color: #1b1b1b;
  &:hover {
    color: #f6c349;
    transition-duration: 150ms;
  }
`;

export {
  HomePageContainer,
  BodyContainer,
  TitleContainer,
  MainTitle,
  SubTitle,
  BotContainer,
  NavbarLinkContainer,
  FooterLink,
};
