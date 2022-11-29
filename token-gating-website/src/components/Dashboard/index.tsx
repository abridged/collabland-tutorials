import { useEffect, useState } from 'react';
import { connectToSDK, getCollabClient } from 'src/sdk';
import Navbar from '../common/NavBar';
import Button from '../common/Button';
import LogoutModal from './components/LogoutModal';
import './dashboard.css';
import { truncateAddress } from '../../utils';

const PATRON_ROLE = 'collabland-patron';
const MEMBER_ROLE = 'collabland-member';

const Dashboard = () => {
  const addr = localStorage.getItem('my-siwe-addr');
  const [loading, setLoading] = useState<boolean>(false);
  const [logoutModalOn, setLogoutModalOn] = useState<boolean>(false);
  const [isPatron, setIsPatron] = useState<boolean>(false);
  const [isMember, setIsMember] = useState<boolean>(false);
  const [isGuest, setIsGuest] = useState<boolean>(true);

  useEffect(() => {
    if (!addr || addr === '') {
      window.location.href = `/`;
    }
  }, [addr]);

  const checkRoles = async () => {
    setLoading(true);
    if (!addr || addr === '') {
      setLoading(false);
      return;
    }
    try {
      await connectToSDK();
      const res = await getCollabClient().accessControl.checkRoles({
        account: addr,
        rules: [
          {
            chainId: 137,
            minToken: '1',
            contractAddress: '0x1fdf97e5bee48893eef28116973ca81166e4ec02',
            roleId: MEMBER_ROLE,
            type: 'ERC721',
            name: 'MemberNFT Holder',
          },
          {
            chainId: 1,
            minToken: '1',
            contractAddress: '0x1fdf97e5bee48893eef28116973ca81166e4ec02',
            roleId: PATRON_ROLE,
            type: 'ERC721',
            name: 'PatronNFT Holder',
          },
        ],
      });
      for (const role of res.roles) {
        if (role.granted) {
          switch (role.id) {
            case PATRON_ROLE:
              setIsPatron(true);
              break;
            case MEMBER_ROLE:
              setIsMember(true);
              break;
          }
        }
      }
    } catch (e) {
      alert(`Error: ${e.message}`);
      setLoading(false);
    }
    setLoading(false);
  };

  let containerHeight = 600;
  let containerWidth = 1200;

  return (
    <>
      <Navbar>
        <div className="w-full flex flex-row justify-end pr-8">
          <Button handleClick={() => setLogoutModalOn(true)} color="gray">
            Log out
          </Button>
        </div>
      </Navbar>
      <div
        className="mx-auto flex flex-col h-full"
        style={{ maxWidth: '1300px' }}
      >
        <div className="text-cl-yellow-300 lg:text-2xl text-xl mb-2 2xl:ml-16 xl:ml-10 md:ml-16 ml-5">
          Token Gating Website
          <div className="font-light text-base text-cl-gray-100">
            Display contents based on user holdings
          </div>
        </div>
        <div
          className="bg-cl-gray-300 rounded-2xl mx-auto flex flex-row h-full"
          style={{
            width: `${containerWidth}px`,
            height: `${containerHeight}px`,
          }}
        >
          <>
            <div className="flex flex-col w-full p-5">
              <div className="">
                <div className="font-light text-base text-cl-gray-100">
                  This website defined two Collab.Land token gating rules (TGRs)
                </div>
                <div className="grid grid-cols-2 gap-x-10">
                  <div className="text-cl-yellow-200 text-xxs border-2 border-cl-gray-400 rounded-2xl p-2">
                    <pre>
                      {JSON.stringify(
                        {
                          chainId: 137,
                          minToken: '1',
                          contractAddress:
                            '0x1fdf97e5bee48893eef28116973ca81166e4ec02',
                          roleId: MEMBER_ROLE,
                          type: 'ERC721',
                          name: 'MemberNFT Holder',
                        },
                        null,
                        2,
                      )}
                    </pre>
                  </div>
                  <div className="text-cl-yellow-200 text-xxs border-2 border-cl-gray-400 rounded-2xl p-2">
                    <pre>
                      {JSON.stringify(
                        {
                          chainId: 1,
                          minToken: '1',
                          contractAddress:
                            '0x1fdf97e5bee48893eef28116973ca81166e4ec02',
                          roleId: PATRON_ROLE,
                          type: 'ERC721',
                          name: 'PatronNFT Holder',
                        },
                        null,
                        2,
                      )}
                    </pre>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-row justify-center pt-8 pb-3">
                <Button
                  handleClick={() => {
                    checkRoles();
                  }}
                >
                  Check for {truncateAddress(addr)}
                </Button>
              </div>
              {loading ? (
                <div className="m-auto">
                  <svg
                    className="mt-5 animate-spin sm:h-20 h-12 sm:w-20 w-12 rounded-full bg-transparent sm:border-8 border-4 border-transparent"
                    style={{
                      borderRightColor: '#FE9800',
                      borderTopColor: '#FE9800',
                      borderLeftColor: '#2E3139',
                      borderBottomColor: '#2E3139',
                    }}
                    viewBox="0 0 24 24"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-x-3">
                  {isPatron ? (
                    <div className="flex flex-row">
                      <div className="p-8 text-white flex flex-col">
                        <div className="text-white font-semibold mb-5">
                          Hey Patron NFT Holder! ❤️ 🖤
                        </div>
                        <span className="text-cl-gray-100 italic">
                          This part is gated by Collab.Land Patron NFTs.
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 font-light text-base text-cl-gray-100">
                      You can view this content if you own Collab.Land Patron
                      NFTs.
                    </div>
                  )}
                  {isMember ? (
                    <div className="flex flex-row">
                      <div className="p-8 text-white flex flex-col">
                        <div className="text-white font-semibold mb-5">
                          Hey Membership NFT Holder!
                        </div>
                        <span className="text-cl-gray-100 italic">
                          This part is gated by Collab.Land Membership NFTs.
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 font-light text-base text-cl-gray-100">
                      You can view this content if you own Collab.Land
                      Membership NFTs.
                    </div>
                  )}
                  {isGuest && (
                    <div className="flex flex-row">
                      <div className="p-8 text-white flex flex-col">
                        <div className="text-white font-semibold mb-5">
                          Welcome to Collab.Land Fam
                        </div>
                        <span className="text-cl-gray-100 italic">
                          public content
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        </div>
        <LogoutModal
          logoutModalOn={logoutModalOn}
          setLogoutModalOn={setLogoutModalOn}
          setLoading={setLoading}
        />
      </div>
    </>
  );
};

export default Dashboard;
