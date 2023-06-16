import { useContext, useEffect, useState } from "react";
import HomeLayout from "layout/layout";
import { HomeContext } from "../../context/home/context/context";

const homeGradientStyle = {
  background:
    "conic-gradient(from -30.05deg at 50% 50%, #4D4A8B 0deg, #63419F 116.25deg, #4D4A8B 360deg)",
  filter: "blur(100px)",
};

export default function Home() {
  const [providers, setProviders] = useState([]);
  const { myProviders, setShowAddProviderDialog } = useContext(HomeContext);

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

  return (
    <div className="w-full h-screen relative overflow-auto content-center bg-background-color">
      <div
        className="absolute w-[43vw] h-[43vw] top-[-5vw] right-[42vw] opacity-[.15] z-10"
        style={homeGradientStyle}
      ></div>
      <div className="px-3 pt-24 sm:px-20 sm:pt-28">
        <div className="flex flex-wrap gap-2 justify-between items-center mb-7">
          <div>
            <p className="text-white text-2xl font-bold">Billing information</p>
            <p className="text-white text-sm font-normal opacity-[.65] mt-1">
              You have not set up a payment plan yet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

Home.PageLayout = HomeLayout;
