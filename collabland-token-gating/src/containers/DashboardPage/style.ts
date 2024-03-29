import { device } from '@/components/utils';
import styled from 'styled-components';

const DashboardPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;
// const HeaderContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   background-color: #f6c349;
//   height: 40px;
//   color: #1b1b1b;
//   overflow: hidden;
//   position: relative;
//   align-items: center;
//   justify-content: center;
//   @media screen and ${device.desktop} {
//     text-align: center;
//     font-size: 16px;
//   }
//   @media screen and ${device.mobile} {
//     text-align: center;
//     font-size: 12px;
//     display: none;
//   }
// `;
const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  padding: 0 40px 60px 40px;
`;
const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and ${device.desktop} {
    width: 80vw;
    min-width: 1280px;
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
  font-weight: 200;
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

export { DashboardPageContainer, BodyContainer, TitleContainer, MainTitle, SubTitle, NavbarLinkContainer, FooterLink };
