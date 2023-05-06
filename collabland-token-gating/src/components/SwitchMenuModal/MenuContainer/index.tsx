import React from 'react';
import styled from 'styled-components';

const WalletsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: 32px;
`;
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;
const TitleContainer = styled.div`
  display: flex;
  font-size: 24px;
`;
const ElementContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
`;
interface IMenuContainerProps {
  headerTitle: string;
  headerElement?: React.ReactNode;
  children: React.ReactNode;
}
const MenuContainer: React.FunctionComponent<IMenuContainerProps> = ({ headerTitle, headerElement, children }) => {
  return (
    <WalletsContainer>
      <HeaderContainer>
        <TitleContainer>{headerTitle}</TitleContainer>
        {headerElement && <ElementContainer>{headerElement}</ElementContainer>}
      </HeaderContainer>
      {children}
    </WalletsContainer>
  );
};

export default MenuContainer;
