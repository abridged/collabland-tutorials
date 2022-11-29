import clsx from 'clsx';

const Button = ({
  handleClick,
  children,
  filled = false,
  color = 'yellow',
  disabled = false,
  fullRounded = true,
}: {
  handleClick: any;
  children: React.ReactNode;
  filled?: boolean;
  color?: string;
  disabled?: boolean;
  fullRounded?: boolean;
}) => {
  let filledColor = '';
  let notFilledBorder = '';
  if (disabled) {
    filledColor = 'border-cl-gray-100 border-2 bg-cl-gray-100';
    filled = true;
  } else {
    switch (color) {
      case 'yellow':
        filledColor =
          'border-primary border-2 bg-primary hover:bg-cl-yellow-200 hover:border-cl-yellow-200';
        notFilledBorder = 'border-primary border-2 hover:border-cl-yellow-200';
        break;
      case 'red':
        filledColor =
          'border-red-600 border-2 bg-red-600 hover:bg-red-500 hover:border-red-500';
        notFilledBorder = 'border-red-600 border-2 hover:border-red-500';
        break;
      case 'grey':
        filledColor =
          'border-gray-100 border-opacity-80 border-2 bg-cl-gray-100 bg-opacity-80 hover:bg-opacity-100 hover:border-opacity-100';
        notFilledBorder =
          'border-gray-100 border-opacity-80 border-2 hover:border-opacity-100';
        break;
      default: //yellow
        filledColor =
          'border-primary border-2 bg-primary hover:bg-cl-yellow-200 hover:border-cl-yellow-200';
        notFilledBorder = 'border-primary border-2 hover:border-cl-yellow-200';
    }
  }
  return (
    <button
      className={clsx(
        'flex flex-row items-center justify-center text-white sm:text-base xs:text-base text-sm lg:px-10 sm:px-5 xs:px-3 px-2 xs:py-2 py-1 duration-100 ',
        filled ? filledColor : notFilledBorder,
        disabled ? 'cursor-not-allowed' : 'hover:shadow-md',
        fullRounded ? 'rounded-full' : 'rounded-2xl',
      )}
      type="button"
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
