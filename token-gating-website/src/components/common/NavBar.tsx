import React from 'react';
import { useMediaQuery } from '@material-ui/core';
import CL_Logo from 'src/assets/images/collabland-logo.png';
// import DiscordIcon from './../../assets/images/discord-icon.svg';

const NavBar = ({ children }: { children?: React.ReactNode }) => {
  const tablet = useMediaQuery('(max-width:1279px)');
  const mobile = useMediaQuery('(max-width:676px)');

  return (
    <div className="bg-cl-gray-400 xl:py-4 w-full">
      <nav className="flex flex-row items-center bg-cl-gray-300 xl:rounded-full 2xl:mx-16 xl:mx-10 2xl:py-3 xl:py-2 xl:px-3 lg:py-2 py-1">
        <div className="flex flex-row items-center sm:m-3 m-2">
          {mobile ? (
            <img
              src={CL_Logo}
              alt="Collab.Land"
              style={{ width: '100px', height: '25px', marginRight: '8px' }}
            />
          ) : tablet ? (
            <img
              src={CL_Logo}
              alt="Collab.Land"
              style={{ width: '180px', height: '30px', marginRight: '8px' }}
            />
          ) : (
            <img
              src={CL_Logo}
              alt="Collab.Land"
              style={{ width: '200px', height: '35px' }}
            />
          )}
        </div>
        {children}
      </nav>
    </div>
  );
};

export default NavBar;
