import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  modal?: boolean;
  setModal?: (s: boolean) => void;
}

const Modal = ({children, modal, setModal}: Props) => {
  return (
    <div
      className={clsx(
        `fixed inset-0 overflow-y-auto z-10`,
        modal ? "" : "hidden",
      )}
      aria-labelledby="modal-title"
      role="dialog"
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-80 transition-opacity"
          aria-hidden="true"
        ></div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block overflow-hidden transform transition-all sm:my-8 align-middle sm:max-w-xl sm:w-full h-full">
          {/* <div className='inline-block align-bottom overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full h-full'></div> */}
          <div className="flex flex-row justify-center w-full">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
