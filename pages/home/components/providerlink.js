import Image from "next/image";

export default function ProviderLink({ provider, count }) {
  return (
    <li className="mb-4">
      <a className="flex cursor-pointer items-center truncate text-white">
        <span className="mr-5 text-lg font-normal">
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
        </span>
        <span className="opacity-[.65]">
          {provider?.short_name} {count > 0 && `(${count})`}
        </span>
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
  );
}
