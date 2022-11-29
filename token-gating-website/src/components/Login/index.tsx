import { ethers } from 'ethers';
import Button from '../common/Button';
import Navbar from '../common/NavBar';
import Handshake from 'src/assets/images/handshake.png';
import LoginView from 'src/assets/images/collabland-view-transparent.png';
import './login.css';

const Login = () => {
  const signInWithEthereum = async () => {
    // make sure we enable wallets like MetaMask
    await window.ethereum.enable();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const addr = await signer.getAddress();
    console.log(addr);
    localStorage.setItem('my-siwe-addr', addr);
    window.location.href = `/view`;
  };
  return (
    <>
      <Navbar>
        <div className="w-full flex flex-row justify-end pr-8">
          <Button handleClick={signInWithEthereum}>
            <img
              className="h-8 w-10 rounded-full mr-1"
              alt="cl"
              src={Handshake}
            />
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
