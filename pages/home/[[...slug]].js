import { useContext, useEffect, useState } from "react";
import HomeLayout from "./layout";
import ProviderPanel from "./components/panels/providerpanel";
import { HomeContext } from "../../context/home/context";
import { useRouter } from "next/router";

const homeGradientStyle = {
  background:
    "conic-gradient(from -30.05deg at 50% 50%, #4D4A8B 0deg, #63419F 116.25deg, #4D4A8B 360deg)",
  filter: "blur(100px)",
};

export default function Home() {
  const router = useRouter();
  const [providers, setProviders] = useState([]);
  const { myProviders, setShowAddProviderDialog } = useContext(HomeContext);

  const query = router.query;
  console.log(`Query: ${query.slug}`);

  useEffect(() => {
    let myInfo = [];

    myProviders?.providers?.map((provider, i) => {
      let identifiers = {};
      let statusBots = {};
      if (
        myProviders.my_providers &&
        myProviders.my_providers[provider?.provider]
      ) {
        identifiers = myProviders.my_providers[provider?.provider];
        provider.count = Object.keys(
          myProviders.my_providers[provider?.provider]
        ).length;
      }

      if (myProviders.status_autobot[provider?.provider]) {
        statusBots = myProviders.status_autobot[provider?.provider];
      }

      if (provider.count)
        myInfo.push({ provider, identifiers, statusBots });
    });

    setProviders(myInfo);
  }, [myProviders]);

  return (
    <div className="w-full h-screen relative overflow-auto content-center bg-background-color">
      <div
        className="absolute w-[43vw] h-[43vw] top-[-5vw] right-[42vw] opacity-[.15] z-10"
        style={homeGradientStyle}
      ></div>
      <div className="px-3 pt-24 sm:px-20 sm:pt-28 relative z-20">
        <div className="flex flex-wrap gap-2 justify-between items-center mb-7">
          <div>
            <p className="text-white text-2xl font-bold inter-font">
              Providers
            </p>
            <p className="text-white text-sm font-normal opacity-[.65] mt-1 inter-font">
              Your current automated providers
            </p>
          </div>
          <div className="flex flex-wrap gap-4 items-center justify-start lg:justify-end z-20">
            <div className="relative w-[258px]">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-[#586171] dark:text-gray-400"
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
                className="bg-transparent h-[44px] border-[1.4px] border-solid border-[#586171] text-gray-300 text-sm rounded-lg block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:text-white inter-font"
              />
            </div>
            <button
              className="py-2.5 px-8 whitespace-nowrap text-base font-semibold text-white bg-link-color rounded-lg inter-font"
              onClick={(e) => setShowAddProviderDialog(true)}
            >
              Add Provider
            </button>
          </div>
        </div>
        {providers.map(({ provider, identifiers, statusBots }, i) => (
          <ProviderPanel
            key={i}
            provider={provider}
            identifiers={identifiers}
            statusBots={statusBots}
            index={i}
            defaultOpen={provider?.provider == query?.slug}
          />
        ))}
      </div>
    </div>
  );
}

Home.PageLayout = HomeLayout;
