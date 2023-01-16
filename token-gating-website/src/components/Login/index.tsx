import Button from '../common/Button';
import Navbar from '../common/NavBar';
import LoginView from 'src/assets/images/collabland-mascot.png';
import './login.css';

const Login = () => {
  const signInWithEthereum = async () => {
    // make sure we enable wallets like MetaMask
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        localStorage.setItem('my-siwe-addr', accounts[0]);
        window.location.href = `/view`;
      } catch (error) {
        if (error.code === 4001) {
          // User rejected request
          alert('User rejected request');
        }
      }
    } else {
      alert('window.ethereum not available');
    }
  };
  return (
    <>
      <Navbar>
        <div className="w-full flex flex-row justify-end pr-8">
          <Button handleClick={signInWithEthereum}>
            Sign in with Ethereum
          </Button>
        </div>
      </Navbar>
      <div
        className="mx-auto flex flex-col h-full"
        style={{ maxWidth: '1300px' }}
      >
        <div className="2xl:ml-16 xl:ml-10 ml-20">
          <div className="lg:text-2xl text-xl my-5 text-cl-yellow-300">
            Token gating site
            <div className="font-light text-base text-cl-gray-100">
              Display contents based on user holdings
            </div>
          </div>
          <div className="w-full mx-auto">
            <img
              className="responsiveImg mx-auto rounded-2xl"
              src={LoginView}
              height="350px"
              width="100%"
              alt="view"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
