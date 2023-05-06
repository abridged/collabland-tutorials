import { device } from '@/components/utils';
import React from 'react';
import styled from 'styled-components';

const SwitchMenuModalContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 16px;
`;

const Menus = styled.div`
  display: flex;
  flex-direction: column;
  > * {
    &:first-child {
      border-top-left-radius: 16px;
    }
  }
`;
const Menu = styled.div<{ active: boolean }>`
  display: flex;
  background-color: rgba(255, 255, 255, 0.8);
  width: 240px;
  height: 72px;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid #e9e9f4;
  cursor: pointer;
  color: ${(props) => (props.active ? '#1b1b1b' : '#777')};
  font-weight: ${(props) => (props.active ? '700' : '400')};
  @media screen and ${device.desktop} {
    width: 240px;
    height: 72px;
  }
  @media screen and ${device.mobile} {
    width: 80px;
    height: 32px;
    word-wrap: break-word;
  }
`;
const Containers = styled.div`
  display: flex;
  border-left: 2px solid #e9e9f4;
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
  background-color: rgba(255, 255, 255, 0.8);
  flex-grow: 1;
  // @media screen and ${device.desktop} {
  //   overflow-x: scroll;
  // }
  @media screen and ${device.mobile} {
    overflow-x: scroll;
  }
`;
interface IMenuModal {
  tabName: string;
  container: React.ReactNode;
}
interface ISwitchMenuModalProps {
  menuModals: IMenuModal[];
}
const SwitchMenuModal: React.FunctionComponent<ISwitchMenuModalProps> = ({ menuModals }) => {
  const [currentMenu, setCurrentMenu] = React.useState<string>(menuModals[0].tabName);
  return (
    <SwitchMenuModalContainer>
      <Menus>
        {menuModals.map((menuModal) => (
          <Menu
            key={menuModal.tabName}
            active={menuModal.tabName === currentMenu}
            onClick={() => {
              setCurrentMenu(menuModal.tabName);
            }}
          >
            {menuModal.tabName}
          </Menu>
        ))}
      </Menus>
      <Containers>{menuModals.find((menuModal) => menuModal.tabName === currentMenu)?.container}</Containers>
    </SwitchMenuModalContainer>
  );
};

export default SwitchMenuModal;
