import Image from "next/image";
import Link from "next/link";

export default function ProviderLink({ provider, count }) {
  return (
    <li className="mb-4">
      <Link
        className="flex cursor-pointer items-center truncate text-white"
        href={`/home/${provider?.provider}`}
      >
        <span className="mr-5">
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
        <span className="opacity-[.65] text-lg font-normal inter-font">
          {provider?.short_name} {count > 0 && `(${count})`}
        </span>
        <span className="ml-2.5">
          <Image
            id="check_verified_icon"
            src="/check_verified_icon.png"
            alt="checkVerified"
            width={15}
            height={15}
            draggable="false"
          />
        </span>
      </Link>
    </li>
  );
}
