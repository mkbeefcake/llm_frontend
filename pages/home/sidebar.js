import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { HomeContext } from "../../context/home/context";
import { useRouter } from "next/navigation";
import ProviderLink from "./components/providerlink";

export default function Sidebar() {
  const [providers, setProviders] = useState([]);
  const { myProviders, setShowAddProviderDialog } = useContext(HomeContext);

  const router = useRouter();

  useEffect(() => {
    let myInfo = [];

    myProviders?.providers?.map((provider, i) => {
      if (
        myProviders.my_providers &&
        myProviders.my_providers[provider?.provider]
      ) {
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
      className="bg-sidebar-color w-3/4 max-h-screen overflow-y-auto sm:w-80 flex flex-col justify-between px-11 py-[51px] absolute inset-y-0 left-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out overflow-y-auto z-40"
    >
      <div>
        <div
          className="w-[50px] h-[50px] min-h-[50px] bg-[#635EE3] flex items-center justify-center rounded-full cursor-pointer"
          onClick={() => {
            router.replace("/home");
          }}
        >
          <Image
            id="logo_icon"
            src="/bot_icon.png"
            alt="Logo"
            width={24}
            height={24}
            draggable="false"
          />
        </div>
        <div className="mt-8 sm:mt-[51px]">
          <p className="text-white opacity-[.65] font-normal text-sm inter-font">
            Navigation
          </p>
          <ul className="mt-6">
            <li
              className="mb-4"
              onClick={() => {
                router.replace("/dashboard");
              }}
            >
              <a className="flex cursor-pointer items-center truncate text-white">
                <span className="mr-[23px]">
                  <Image
                    id="dashboard_icon"
                    src="/dashboard_icon.png"
                    alt="Dashboard"
                    width={18}
                    height={18}
                    draggable="false"
                  />
                </span>
                <span className="opacity-[.65] text-lg font-normal inter-font">
                  Dashboard
                </span>
              </a>
            </li>
            <li
              className="mb-4"
              onClick={() => {
                router.replace("/billing");
              }}
            >
              <a className="flex cursor-pointer items-center truncate text-white">
                <Image
                  className="mr-[23px]"
                  id="activity_icon"
                  src="/billing_icon.png"
                  alt="Activity"
                  width={18}
                  height={18}
                  draggable="false"
                />
                <span className="opacity-[.65] text-lg font-normal inter-font">
                  Billing
                </span>
              </a>
            </li>
          </ul>
        </div>
        <div className="mt-10 sm:mt-14">
          <p className="text-white opacity-[.65] font-normal text-sm inter-font">
            Providers
          </p>
          <ul className="mt-6">
            {providers.map((provider, i) => (
              <ProviderLink
                key={i}
                provider={provider}
                count={provider.count}
              />
            ))}
            <li className="mb-4">
              <a
                className="flex cursor-pointer items-center truncate text-white"
                onClick={(e) => setShowAddProviderDialog(true)}
              >
                <Image
                  className="mr-5"
                  id="add_provider_icon"
                  src="/addprovider_icon.png"
                  alt="addProvider"
                  width={24}
                  height={24}
                  draggable="false"
                />
                <span className="text-white text-lg font-normal inter-font">
                  Add Provider
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex items-center">
          <Image
            className="mr-3"
            id="avatar"
            src="/avatar.png"
            alt="Avatar"
            width={39}
            height={39}
            draggable="false"
          />
          <div>
            <span className="block font-normal text-white text-sm truncate max-w-[100px] apple-braille-font">
              User name
            </span>
            <span className="block font-normal text-xs text-[#928E8A] truncate max-w-[100px] apple-braille-font">
              user@gmail.com
            </span>
          </div>
        </div>
        <button
          className="bg-[#313044] text-white font-normal text-xs rounded-lg py-[11px] px-3.5 apple-braille-font"
          onClick={onLogout}
        >
          Log out
        </button>
      </div>
    </div>
  );
}
