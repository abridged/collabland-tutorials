import ClearIcon from '@mui/icons-material/Clear';
import Modal from '../../common/Modal';

const LogoutModal = ({
  logoutModalOn,
  setLogoutModalOn,
  setLoading,
}: {
  logoutModalOn: boolean;
  setLogoutModalOn: (b: boolean) => void;
  setLoading: (l: boolean) => void;
}) => {
  const logout = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 800);
    localStorage.removeItem('my-siwe-addr');
    window.location.href = `/`;
  };

  return (
    <Modal modal={logoutModalOn} setModal={setLogoutModalOn}>
      <div className="bg-cl-gray-400 md:w-5/6 w-full border-2 border-primary rounded-3xl text-white text-base p-2">
        <div className="flex flex-col items-center">
          <div className=" w-full flex flex-row justify-end">
            <button
              className="m-2"
              type="button"
              onClick={() => {
                setLogoutModalOn(false);
              }}
            >
              <ClearIcon fontSize="medium" />
            </button>
          </div>
          <div className="w-full flex flex-col gap-y-4 sm:px-10 px-5">
            <div className="font-bold text-xl">Log out</div>
            <span className="border-gray-100 text-left mb-1 tracking-wide">
              Are you sure you want to log out?
            </span>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {' '}
            <button
              type="button"
              className="my-5 py-1 px-5 sm:text-lg xs:text-xs text-xxs text-white border-2 border-primary rounded-full hover:border-cl-yellow-200 duration-200"
              onClick={() => {
                setLogoutModalOn(false);
              }}
              autoFocus
            >
              Cancel
            </button>
            <button
              type="button"
              className="my-5 py-1 px-5 sm:text-lg xs:text-xs text-xxs text-white bg-red-600 rounded-full hover:bg-red-500 duration-200"
              onClick={() => {
                logout();
              }}
              autoFocus
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LogoutModal;
