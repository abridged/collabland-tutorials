import { CloseIcon } from '@collabland/core-ui';
import { IPopupModalProps } from './type';
import React from 'react';
import { device } from '../utils';
import styled from 'styled-components';

const PopupModalContainer = styled.div`
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 11;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #1b1b1b;
`;
const ModalContainer = styled.div<{ width: string; height: string }>`
  display: flex;
  flex-direction: column;
  min-height: 10vh;
  height: ${(props) => props.height};
  min-width: 30vw;
  width: ${(props) => props.width};
  @media screen and ${device.desktop} {
    padding: 12px 24px;
  }
  @media screen and ${device.mobile} {
    max-width: 92vw;
    padding: 8px;
  }

  background-color: #fff;
  border-radius: 12px;
`;

const HeaderContainer = styled.div`
  display: flex;
  padding-bottom: 12px;
`;

const Title = styled.div`
  flex-grow: 1;
  height: 24px;
  line-height: 24px;
  font-weight: bold;
  font-size: 20px;
  color: #333;
`;
const CloseArrowWrapper = styled.div`
  svg {
    cursor: pointer;
  }
`;

const PopupModal: React.FunctionComponent<IPopupModalProps> = ({
  children,
  title,
  width,
  height,
  handelClose,
}: IPopupModalProps) => {
  return (
    <PopupModalContainer>
      <ModalContainer width={width || 'auto'} height={height || 'auto'}>
        <HeaderContainer>
          <Title>{title}</Title>
          <CloseArrowWrapper onClick={handelClose}>
            <CloseIcon width="24px" height="24px" />
          </CloseArrowWrapper>
        </HeaderContainer>
        {children}
      </ModalContainer>
    </PopupModalContainer>
  );
};

export { PopupModal };
