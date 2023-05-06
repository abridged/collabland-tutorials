import {
  BodyContainer,
  BotContainer,
  HomePageContainer,
  MainTitle,
  NavbarLinkContainer,
  SubTitle,
  TitleContainer,
} from './style';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Footer, Navbar } from '@collabland/core-ui';
import React from 'react';
import rootAction from '@/actions';

const HomePage: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = () => {
    window.ethereum
      .request({
        method: 'eth_requestAccounts',
      })
      .then((accounts: string[]) => {
        localStorage.setItem('@collab.land:token-gating', accounts[0]);
        navigate('dashboard');
      })
      .catch((error: { code: number }) => {
        if (error.code === 4001) {
          dispatch(rootAction.homeActions.triggerToast({ isSuccess: false, message: `User rejected request` }));
        }
      });
  };
  return (
    <HomePageContainer>
      <Navbar>
        <NavbarLinkContainer>
          <Button theme="secondary" onClick={handleLogin}>
            Sign in with Ethereum
          </Button>
        </NavbarLinkContainer>
      </Navbar>
      <BodyContainer>
        <TitleContainer>
          <MainTitle>Token Gating Website</MainTitle>
          <SubTitle></SubTitle>
        </TitleContainer>
        <BotContainer />
      </BodyContainer>
      <Footer />
    </HomePageContainer>
  );
};

export default HomePage;
