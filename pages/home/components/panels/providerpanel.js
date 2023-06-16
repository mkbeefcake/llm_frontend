import { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import ProviderCard from "../providercard";

export default function ProviderPanel({
  provider,
  identifiers,
  statusBots,
  index,
}) {
  const [open, setOpen] = useState(index <= 3 ? true : false);

  const handleOpen = () => {
    setOpen(!open);
  };
  const Icon = ({ open }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
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
    <Accordion
      className="bg-input-color rounded-2xl text-white px-6 py-1 mb-5 z-20"
      open={open}
      icon={<Icon open={open} />}
    >
      <AccordionHeader className="font-bold text-lg" onClick={handleOpen}>
        {provider?.provider_description}
      </AccordionHeader>
      <AccordionBody className="pb-0 overflow-visible">
        {identifiers &&
          Object.keys(identifiers).map((identifierName, i) => (
            <ProviderCard
              key={i}
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
      </AccordionBody>
    </Accordion>
  );
}
