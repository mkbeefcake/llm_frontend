import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { HomeContext } from "../../context/home/context/context";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const [providers, setProviders] = useState([]);
  const { myProviders, selectedProvider, setShowAddProviderDialog } =
    useContext(HomeContext);

  const router = useRouter();

  useEffect(() => {
    let myInfo = [];

    myProviders?.providers?.map((provider, i) => {
      if (myProviders.my_providers[provider?.provider]) {
        provider.count = Object.keys(
          myProviders.my_providers[provider?.provider]
        ).length;
      }

      myInfo.push(provider);
    });

    setProviders(myInfo);
  }, [myProviders]);

  const onLogout = (e) => {
    router.replace("/dashboard/logout");
  };

  return (
    <div
      id="sidebar"
      className="bg-sidebar-color w-3/4 sm:w-80 flex flex-col justify-between px-11 py-12 absolute inset-y-0 left-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out overflow-y-auto z-30"
    >
      <div>
        <div className="w-[50px] h-[50px] min-h-[50px] bg-[#635EE3] rounded-full"></div>
        <div className="mt-8 sm:mt-12">
          <p className="text-white opacity-[.65] font-normal text-sm">
            Navigation
          </p>
          <ul className="mt-7">
            <li className="mb-4">
              <a className="flex cursor-pointer items-center truncate text-white">
                <span className="mr-6 text-lg font-normal">
                  <Image
                    id="dashboard_icon"
                    src="/dashboard_icon.png"
                    alt="Dashboard"
                    width={18}
                    height={18}
                    draggable="false"
                  />
                </span>
                <span className="opacity-[.65]">Dashboard</span>
              </a>
            </li>
            <li className="mb-4">
              <a className="flex cursor-pointer items-center truncate text-white">
                <span className="mr-6 text-lg font-normal">
                  <Image
                    id="activity_icon"
                    src="/activity_icon.png"
                    alt="Activity"
                    width={18}
                    height={18}
                    draggable="false"
                  />
                </span>
                <span className="opacity-[.65]">Activity</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="mt-10 sm:mt-16">
          <p className="text-white opacity-[.65] font-normal text-sm">
            Providers
          </p>
          <ul className="mt-7">
            <li className="mb-4">
              <a className="flex cursor-pointer items-center truncate text-white">
                <span className="mr-5 text-lg font-normal">
                  <Image
                    id="linkedin_icon"
                    src="/linkedin_icon.png"
                    alt="LinkedIn"
                    width={24}
                    height={24}
                    draggable="false"
                  />
                </span>
                <span className="opacity-[.65]">LinkedIn</span>
                <span className="ml-2 text-lg font-normal">
                  <Image
                    id="check_verified_icon"
                    src="/check_verified_icon.png"
                    alt="checkVerified"
                    width={18}
                    height={18}
                    draggable="false"
                  />
                </span>
              </a>
            </li>
            <li className="mb-4">
              <a className="flex cursor-pointer items-center truncate text-white">
                <span className="mr-5 text-lg font-normal">
                  <Image
                    id="gmail_icon"
                    src="/gmail_icon.png"
                    alt="Gmail"
                    width={24}
                    height={24}
                    draggable="false"
                  />
                </span>
                <span className="opacity-[.65]">Gmail</span>
                <span className="ml-2 text-lg font-normal">
                  <Image
                    id="check_verified_icon"
                    src="/check_verified_icon.png"
                    alt="checkVerified"
                    width={18}
                    height={18}
                    draggable="false"
                  />
                </span>
              </a>
            </li>
            <li className="mb-4">
              <a className="flex cursor-pointer items-center truncate text-white">
                <span className="mr-5 text-lg font-normal">
                  <Image
                    id="twitter_icon"
                    src="/twitter_icon.png"
                    alt="Twitter"
                    width={24}
                    height={24}
                    draggable="false"
                  />
                </span>
                <span className="opacity-[.65]">Twitter</span>
                <span className="ml-2 text-lg font-normal">
                  <Image
                    id="check_verified_icon"
                    src="/check_verified_icon.png"
                    alt="checkVerified"
                    width={18}
                    height={18}
                    draggable="false"
                  />
                </span>
              </a>
            </li>
            <li className="mb-4">
              <a className="flex cursor-pointer items-center truncate text-white">
                <span className="mr-5 text-lg font-normal">
                  <Image
                    id="facebook_icon"
                    src="/facebook_icon.png"
                    alt="Facebook"
                    width={24}
                    height={24}
                    draggable="false"
                  />
                </span>
                <span className="opacity-[.65]">Facebook</span>
                <span className="ml-2 text-lg font-normal">
                  <Image
                    id="dashboard_icon"
                    src="/check_verified_icon.png"
                    alt="checkVerified"
                    width={18}
                    height={18}
                    draggable="false"
                  />
                </span>
              </a>
            </li>
            <li className="mb-4">
              <a
                className="flex cursor-pointer items-center truncate text-white"
                onClick={(e) => setShowAddProviderDialog(true)}
              >
                <span className="mr-5 text-lg font-normal">
                  <Image
                    id="add_provider_icon"
                    src="/add_icon.png"
                    alt="addProvider"
                    width={24}
                    height={24}
                    draggable="false"
                  />
                </span>
                <span>Add Provider</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex items-center">
          <span className="mr-3 text-lg font-normal">
            <Image
              id="avatar"
              src="/avatar.png"
              alt="Avatar"
              width={39}
              height={39}
              draggable="false"
            />
          </span>
          <div className="text-white">
            <span className="block font-normal text-sm truncate max-w-[100px]">
              User name
            </span>
            <span className="block font-normal text-xs opacity-[.65] truncate max-w-[100px]">
              user@gmail.com
            </span>
          </div>
        </div>
        <button
          className="bg-[#313044] text-white font-normal text-xs rounded-lg py-3 px-3.5"
          onClick={onLogout}
        >
          Log out
        </button>
      </div>
    </div>
  );
}
