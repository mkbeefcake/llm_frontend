import Image from "next/image";

export default function ProviderLink({ provider, count }) {
  return (
    <li className="mb-4">
      <a className="flex cursor-pointer items-center truncate text-white">
        <Image
          className="mr-5"
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
        <span className="opacity-[.65] text-lg font-normal">
          {provider?.short_name} {count > 0 && `(${count})`}
        </span>
        <Image
          className="ml-2.5"
          id="check_verified_icon"
          src="/check_verified_icon.png"
          alt="checkVerified"
          width={15}
          height={15}
          draggable="false"
        />
      </a>
    </li>
  );
}
