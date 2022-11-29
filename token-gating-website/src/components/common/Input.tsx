interface InputProps {
  id: string;
  label?: string;
  helpText?: string;
  handleInput: (e: any) => void;
  handleBlur?: (event: any) => void;
  value: number | string;
  password?: boolean;
  placeHolder?: string;
  maxLength?: number;
}

const Input = ({
  value,
  label,
  id,
  helpText,
  handleInput,
  handleBlur,
  password = false,
  placeHolder = '',
  maxLength,
}: InputProps) => {
  let inputStyles;
  let inputIcon = '';

  return (
    <div>
      {label && (
        <label htmlFor="price" className=" leading-5 font-semibold">
          {label}
        </label>
      )}
      <div className="mt-1 relative shadow-sm">
        <div
          className={`absolute inset-y-0 flex items-center pointer-events-none ${inputStyles}`}
        >
          <span className="text-gray-500 sm:text-md sm:leading-5">
            {inputIcon}
          </span>
        </div>
        <input
          id={id}
          className={`shadow-md bg-white block w-full py-1 outline-none border border-gray-600 rounded pl-3 sm:text-base sm:leading-5 text-gray-800`}
          placeholder={placeHolder}
          onChange={(t) => {
            if (maxLength && maxLength > 0) {
              if (t.target.value.length > maxLength) return;
            }
            handleInput(t.target.value);
          }}
          value={value}
          type={password ? 'password' : ''}
        />
      </div>
    </div>
  );
};

export default Input;
