import { useContext, useEffect, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import Image from "next/image";
import HomeLayout from "./layout";
import ProviderPanel from "./components/panels/providerpanel";
import { HomeContext } from "../../context/home/context/context";

const homeGradientStyle = {
  background:
    "conic-gradient(from -30.05deg at 50% 50%, #4D4A8B 0deg, #63419F 116.25deg, #4D4A8B 360deg)",
  filter: "blur(100px)",
};

export default function Home() {
  const [providers, setProviders] = useState([]);
  const { myProviders } = useContext(HomeContext);

  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  useEffect(() => {
    let myInfo = [];

    myProviders?.providers?.map((provider, i) => {
      let identifiers = {};
      let statusBots = {};
      if (myProviders.my_providers[provider?.provider]) {
        identifiers = myProviders.my_providers[provider?.provider];
      }

      if (myProviders.status_autobot[provider?.provider]) {
        statusBots = myProviders.status_autobot[provider?.provider];
      }

      myInfo.push({ provider, identifiers, statusBots });
    });

    setProviders(myInfo);
  }, [myProviders]);

  const Icon = ({ id, open }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${
          id === open ? "rotate-180" : ""
        } h-5 w-5 transition-transform`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  return (
    <div className="w-full h-screen relative overflow-auto content-center bg-background-color">
      <div
        className="absolute w-[43vw] h-[43vw] top-[-5vw] right-[42vw] opacity-[.15] z-10"
        style={homeGradientStyle}
      ></div>
      <div className="px-3 pt-24 sm:px-20 sm:pt-32">
        <div className="flex flex-wrap gap-2 justify-between items-center mb-2">
          <div>
            <p className="text-white text-2xl font-bold">Providers</p>
            <p className="text-white text-sm font-normal opacity-[.65] mt-1">
              Your current automated providers
            </p>
          </div>
          <div className="flex flex-wrap gap-2 justify-start lg:justify-end">
            <div className="relative w-[260px]">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-300 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="provider-search"
                className="bg-transparent border border-solid border-gray-300 text-gray-300 text-sm rounded-lg block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <button className="py-2 px-8 ml-0 lg:ml-4 whitespace-nowrap text-base font-semibold text-white primary-button rounded-lg">
              Add Provider
            </button>
          </div>
        </div>
        <Accordion
          className="bg-input-color rounded-2xl text-white px-6 py-1 mb-5 z-20"
          open={open === 1}
          icon={<Icon id={1} open={open} />}
        >
          <AccordionHeader
            className="font-bold text-lg"
            onClick={() => handleOpen(1)}
          >
            LinkedIn Provider
          </AccordionHeader>
          <AccordionBody className="pb-0">
            <div className="flex flex-wrap gap-2 mb-6 items-center justify-between">
              <div className="flex items-center">
                <Image
                  id="avatar"
                  src="/avatar1.png"
                  alt="Avatar"
                  className="mr-3"
                  width={38}
                  height={38}
                  draggable="false"
                />
                <div className="text-white">
                  <span className="block font-normal text-sm truncate">
                    Olivia Rhye
                  </span>
                  <span className="block font-normal text-xs opacity-[.65] truncate w-[130px] md:w-[90px] lg:w-[125px] xl:w-[385px]">
                    This is the rule user input in the text box. This is the
                    rule user input in the text box.
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-end">
                <div className="flex cursor-pointer items-center text-[#8B7FFA] text-base font-semibold">
                  <Image
                    id="edit_icon"
                    src="/edit_icon.png"
                    alt="Edit"
                    className="mr-2.5"
                    width={24}
                    height={24}
                    draggable="false"
                  />
                  <span className="whitespace-nowrap">Add rules</span>
                </div>
                <div className="ml-9 mr-8">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="w-10 h-6 bg-background-color rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-link-color"></div>
                    <span className="ml-3 text-base font-medium text-white">
                      Active
                    </span>
                  </label>
                </div>
                <span className="w-[30px] px-2 py-1 hover:bg-gray-600 rounded-full text-center cursor-pointer">
                  <Image
                    id="action_icon"
                    src="/action_icon.png"
                    alt="Action"
                    className="w-1 mx-auto"
                    width={0}
                    height={0}
                    draggable="false"
                  />
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-6 items-center justify-between">
              <div className="flex items-center">
                <Image
                  id="avatar"
                  src="/avatar1.png"
                  alt="Avatar"
                  className="mr-3"
                  width={38}
                  height={38}
                  draggable="false"
                />
                <div className="text-white">
                  <div className="flex gap-1">
                    <span className="block font-normal text-sm truncate">
                      Olivia Rhye
                    </span>
                    <span className="bg-[#5448B7] text-white opacity-[.75] text-xs font-medium ml-2 px-2 py-0.5 rounded-full">
                      Sales
                    </span>
                  </div>
                  <span className="block font-normal text-xs opacity-[.65] truncate w-[130px] md:w-[90px] lg:w-[125px] xl:w-[380px]">
                    This is the rule user input in the text box. This is the
                    rule user input in the text box.
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-end">
                <div className="flex cursor-pointer items-center text-[#8B7FFA] text-base font-semibold">
                  <Image
                    id="edit_icon"
                    src="/edit_icon.png"
                    alt="Edit"
                    className="mr-2.5"
                    width={24}
                    height={24}
                    draggable="false"
                  />
                  <span className="whitespace-nowrap">Add rules</span>
                </div>
                <div className="ml-9 mr-8">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="w-10 h-6 bg-background-color rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-link-color"></div>
                    <span className="ml-3 text-base font-medium text-white">
                      Active
                    </span>
                  </label>
                </div>
                <span className="w-[30px] px-2 py-1 hover:bg-gray-600 rounded-full text-center cursor-pointer">
                  <Image
                    id="action_icon"
                    src="/action_icon.png"
                    alt="Action"
                    className="w-1 mx-auto"
                    width={0}
                    height={0}
                    draggable="false"
                  />
                </span>
              </div>
            </div>
          </AccordionBody>
        </Accordion>
        <Accordion
          className="bg-input-color rounded-2xl text-white px-6 py-1 mb-5 z-20"
          open={open === 2}
          icon={<Icon id={2} open={open} />}
        >
          <AccordionHeader
            className="font-bold text-lg"
            onClick={() => handleOpen(2)}
          >
            Gmail Provider
          </AccordionHeader>
          <AccordionBody className="pb-0">
            <div className="flex flex-wrap gap-2 mb-6 items-center justify-between">
              <div className="flex items-center">
                <Image
                  id="avatar"
                  src="/avatar1.png"
                  alt="Avatar"
                  className="mr-3"
                  width={38}
                  height={38}
                  draggable="false"
                />
                <div className="text-white">
                  <span className="block font-normal text-sm truncate">
                    Olivia Rhye
                  </span>
                  <span className="block font-normal text-xs opacity-[.65] truncate w-[130px] md:w-[90px] lg:w-[125px] xl:w-[380px]">
                    This is the rule user input in the text box. This is the
                    rule user input in the text box.
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-end">
                <div className="flex cursor-pointer items-center text-[#8B7FFA] text-base font-semibold">
                  <Image
                    id="edit_icon"
                    src="/edit_icon.png"
                    alt="Edit"
                    className="mr-2.5"
                    width={24}
                    height={24}
                    draggable="false"
                  />
                  <span className="whitespace-nowrap">Add rules</span>
                </div>
                <div className="ml-9 mr-8">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="w-10 h-6 bg-background-color rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-link-color"></div>
                    <span className="ml-3 text-base font-medium text-white">
                      Active
                    </span>
                  </label>
                </div>
                <span className="w-[30px] px-2 py-1 hover:bg-gray-600 rounded-full text-center cursor-pointer">
                  <Image
                    id="action_icon"
                    src="/action_icon.png"
                    alt="Action"
                    className="w-1 mx-auto"
                    width={0}
                    height={0}
                    draggable="false"
                  />
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-6 items-center justify-between">
              <div className="flex items-center">
                <Image
                  id="avatar"
                  src="/avatar1.png"
                  alt="Avatar"
                  className="mr-3"
                  width={38}
                  height={38}
                  draggable="false"
                />
                <div className="text-white">
                  <div className="flex gap-1">
                    <span className="block font-normal text-sm truncate">
                      Olivia Rhye
                    </span>
                    <span className="bg-[#5448B7] text-white opacity-[.75] text-xs font-medium ml-2 px-2 py-0.5 rounded-full">
                      Sales
                    </span>
                  </div>
                  <span className="block font-normal text-xs opacity-[.65] truncate w-[130px] md:w-[90px] lg:w-[125px] xl:w-[380px]">
                    This is the rule user input in the text box. This is the
                    rule user input in the text box.
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-end">
                <div className="flex cursor-pointer items-center text-[#8B7FFA] text-base font-semibold">
                  <Image
                    id="edit_icon"
                    src="/edit_icon.png"
                    alt="Edit"
                    className="mr-2.5"
                    width={24}
                    height={24}
                    draggable="false"
                  />
                  <span className="whitespace-nowrap">Add rules</span>
                </div>
                <div className="ml-9 mr-8">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="w-10 h-6 bg-background-color rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-link-color"></div>
                    <span className="ml-3 text-base font-medium text-white">
                      Inactive
                    </span>
                  </label>
                </div>
                <span className="w-[30px] px-2 py-1 hover:bg-gray-600 rounded-full text-center cursor-pointer">
                  <Image
                    id="action_icon"
                    src="/action_icon.png"
                    alt="Action"
                    className="w-1 mx-auto"
                    width={0}
                    height={0}
                    draggable="false"
                  />
                </span>
              </div>
            </div>
          </AccordionBody>
        </Accordion>
      </div>
    </div>
  );
}

Home.PageLayout = HomeLayout;
