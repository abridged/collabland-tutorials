import { BodyContainer, DashboardPageContainer, FooterLink, NavbarLinkContainer } from './style';
import { Button, Footer, Loading, Navbar, Toast } from '@collabland/core-ui';
import { IDashboardState } from '@/types/DashboardTypes';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IRootState } from '@/types/GlobalTypes';
import React from 'react';
import rootAction from '@/actions';
import { connectToSDK, getCollabClient } from '@/utils/sdkHelper';
import styled from 'styled-components';
import { truncateAddress } from '@/utils';

const TokenGatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1600px;
  width: 100%;
`;
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;
const TitleContainer = styled.div`
  display: flex;
  font-size: 24px;
`;
const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  margin-top: 16px;
  padding: 16px;
  min-height: 600px;
`;
const ModalHeader = styled.div`
  display: flex;
  flex-direction: column;
`;
const JsonContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
`;
const JsonDisplayer = styled.pre`
  display: flex;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 16px;
  flex-grow: 1;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;
const RolesContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
`;
const RoleContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
`;
const RoleGrayText = styled.div`
  display: flex;
  color: #999;
`;
const RoleBlackText = styled.div`
  display: flex;
  color: #1b1b1b;
`;
const DashboardPage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dashboardState: IDashboardState = useSelector((state: IRootState) => state.dashboard);
  const PATRON_ROLE = 'collabland-patron';
  const MEMBER_ROLE = 'collabland-member';
  const account = localStorage.getItem('@collab.land:token-gating') || '';
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isPatron, setIsPatron] = React.useState<boolean>(false);
  const [isMember, setIsMember] = React.useState<boolean>(false);
  // const isGuest = true;
  const handleLogout = () => {
    localStorage.removeItem('@collab.land:token-gating');
    navigate('/');
  };
  const handleCheck = () => {
    setIsLoading(true);
    connectToSDK()
      .then(() => {
        getCollabClient()
          .accessControl.checkRoles({
            account,
            rules: [
              {
                chainId: 137,
                minToken: '1',
                contractAddress: '0x1fdf97e5bee48893eef28116973ca81166e4ec02',
                roleId: MEMBER_ROLE,
                type: 'ERC721',
                name: 'MemberNFT Holder',
              },
              {
                chainId: 1,
                minToken: '1',
                contractAddress: '0x1fdf97e5bee48893eef28116973ca81166e4ec02',
                roleId: PATRON_ROLE,
                type: 'ERC721',
                name: 'PatronNFT Holder',
              },
            ],
          })
          .then((res) => {
            setIsLoading(false);
            res.roles?.filter((role) =>
              role.id === PATRON_ROLE ? setIsPatron(true) : role.id === MEMBER_ROLE ? setIsMember(true) : ''
            );
          })
          .catch(() => {
            setIsLoading(false);
            dispatch(rootAction.dashboardActions.triggerToast({ isSuccess: false, message: `Failed checkRoles!` }));
          });
      })
      .catch(() => {
        setIsLoading(false);
        dispatch(rootAction.homeActions.triggerToast({ isSuccess: false, message: `Failed connect to SDK!` }));
      });
  };

  return (
    <>
      {dashboardState.isLoading && <Loading />}
      {isLoading && <Loading />}
      {!dashboardState.isLoading && dashboardState.showToast && (
        <Toast
          isSucceed={dashboardState.toastSucceed}
          toastMessage={dashboardState.toastMessage}
          handelClose={() =>
            dispatch(
              rootAction.dashboardActions.toastAction({ showToast: false, toastSucceed: false, toastMessage: '' })
            )
          }
        />
      )}
      <DashboardPageContainer>
        <Navbar>
          <NavbarLinkContainer>
            <Button theme="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </NavbarLinkContainer>
        </Navbar>
        <BodyContainer>
          <TokenGatingContainer>
            <HeaderContainer>
              <TitleContainer>{'Token Gating'}</TitleContainer>
            </HeaderContainer>
            <ModalContainer>
              <ModalHeader>This website defined two Collab.Land token gating rules (TGRs)</ModalHeader>
              <JsonContainer>
                <JsonDisplayer>
                  {JSON.stringify(
                    {
                      chainId: 137,
                      minToken: '1',
                      contractAddress: '0x1fdf97e5bee48893eef28116973ca81166e4ec02',
                      roleId: MEMBER_ROLE,
                      type: 'ERC721',
                      name: 'MemberNFT Holder',
                    },
                    null,
                    2
                  )}
                </JsonDisplayer>
                <JsonDisplayer>
                  {JSON.stringify(
                    {
                      chainId: 1,
                      minToken: '1',
                      contractAddress: '0x1fdf97e5bee48893eef28116973ca81166e4ec02',
                      roleId: PATRON_ROLE,
                      type: 'ERC721',
                      name: 'PatronNFT Holder',
                    },
                    null,
                    2
                  )}
                </JsonDisplayer>
              </JsonContainer>
              <ButtonContainer>
                <Button onClick={handleCheck}>Check for {truncateAddress(account)}</Button>
              </ButtonContainer>
              <RolesContainer>
                <RoleContainer>
                  {!isPatron ? (
                    <RoleGrayText>You can view this content if you own Collab.Land Patron NFTs.</RoleGrayText>
                  ) : (
                    <>
                      <RoleBlackText>Hey Patron NFT Holder! ❤️ 🖤</RoleBlackText>
                      <RoleGrayText>This part is gated by Collab.Land Patron NFTs.</RoleGrayText>
                    </>
                  )}
                </RoleContainer>
                <RoleContainer>
                  {!isMember ? (
                    <RoleGrayText>You can view this content if you own Collab.Land Membership NFTs.</RoleGrayText>
                  ) : (
                    <>
                      <RoleBlackText>Hey Membership NFT Holder!</RoleBlackText>
                      <RoleGrayText>This part is gated by Collab.Land Membership NFTs.</RoleGrayText>
                    </>
                  )}
                </RoleContainer>
                <RoleContainer>
                  <RoleBlackText>Welcome to Collab.Land Fam</RoleBlackText>
                </RoleContainer>
              </RolesContainer>
            </ModalContainer>
          </TokenGatingContainer>
        </BodyContainer>
        <Footer position="fixed">
          <FooterLink href="https://www.collab.land/privacy-policy">Privacy Policy</FooterLink>
          <FooterLink href="https://www.collab.land/terms-of-service">Terms</FooterLink>
        </Footer>
      </DashboardPageContainer>
    </>
  );
};

export default DashboardPage;
