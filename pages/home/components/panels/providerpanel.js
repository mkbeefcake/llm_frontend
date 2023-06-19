import { useState, useEffect } from "react";
import ProviderCard from "../providercard";

export default function ProviderPanel({
  provider,
  identifiers,
  statusBots,
  index,
  defaultOpen,
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(defaultOpen);
  }, [defaultOpen]);

  const handleProvidersAccordion = () => {
    setOpen(!open);
    document
      .getElementById(`providers_accordion_icon_${index}`)
      .classList.toggle("rotate-[-180deg]");
  };

  return (
    <div className="bg-input-color rounded-2xl px-6 py-1 pb-5 mb-5">
      <button
        type="button"
        className="text-white font-bold text-lg py-4 w-full justify-between inline-flex items-center"
        onClick={handleProvidersAccordion}
      >
        <p className="w-[80%] text-left truncate">
          {provider?.provider_description}
        </p>
        <svg
          id={`providers_accordion_icon_${index}`}
          className={`w-4 h-4 ml-2 transition-transform duration-200 ease-in-out ${
            open ? "rotate-[-180deg]" : "rotate-0"
          }`}
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {open && (
        <div>
          {identifiers &&
            Object.keys(identifiers).map((identifierName, i) => (
              <ProviderCard
                key={i}
                index={i}
                identifierName={identifierName}
                provider={provider}
                identifier={identifiers[identifierName]}
                statusBot={statusBots[identifierName]}
                iconUrl={
                  provider.provider_icon_url
                    ? provider.provider_icon_url
                    : "/icons8-bot-64.png"
                }
              />
            ))}
        </div>
      )}
    </div>
  );
}
