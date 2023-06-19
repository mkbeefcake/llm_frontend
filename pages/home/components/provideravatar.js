import Image from "next/image";
import { useContext } from "react";
import { HomeContext } from "../../../context/home/context";

export default function ProviderAvatar({ provider, index }) {
  const {
    setShowAddProviderDialog,
    setShowProviderNameDialog,
    setSelectedProvider,
  } = useContext(HomeContext);

  const onAddProvider = (e) => {
    setSelectedProvider(provider);
    setShowAddProviderDialog(false);
    setShowProviderNameDialog(true);
  };

  return (
    <div
      className={`mb-10 w-16 mr-2 ${index % 4 === 0 ? "sm:mr-0" : "sm:mr-12"}`}
    >
      <button
        type="button"
        className="rounded-full w-16 h-16 mb-2 flex justify-center items-center active:shadow-lg bg-input-color"
        onClick={onAddProvider}
      >
        <Image
          id={provider?.provider}
          src={
            provider?.provider_icon_url
              ? provider?.provider_icon_url
              : "/icons8-bot-64.png"
          }
          alt={provider?.provider_description}
          width={24}
          height={24}
          draggable="false"
        />
      </button>
      <p className="text-xs font-normal text-white opacity-[.65] text-center inter-font">
        {provider?.short_name}
      </p>
    </div>
  );
}
