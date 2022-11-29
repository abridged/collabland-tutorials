import React from 'react';
import HelpIcon from '@mui/icons-material/Help';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

const HelpTooltip = ({
  title,
  placement = 'right',
  children,
}: {
  title: string;
  placement?: 'right' | 'bottom' | 'left' | 'top';
  children?: React.ReactElement;
}) => {
  const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} className="text-cl-gray-100 text-xs mx-1" />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 125,
    },
  });

  return (
    <CustomWidthTooltip
      placement={placement}
      title={title}
      // arrow
      className="text-white text-xs mx-1"
    >
      {children ? children : <HelpIcon fontSize="inherit" />}
    </CustomWidthTooltip>
  );
};

export default HelpTooltip;
