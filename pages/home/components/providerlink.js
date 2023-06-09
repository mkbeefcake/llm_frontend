import Image from "next/image";
import { useEffect } from "react";

export default function ProviderLink({ provider, count, isFirst }) {

    return (
        <li class={`${isFirst == 0 && 'pt-4'} relative`}>
            { isFirst == 0 &&
                <span
                    class="li-span px-6 py-4 text-[0.6rem] font-bold text-gray-600 dark:text-gray-400"
                    >Providers</span>
            }
            <a
                class={`${isFirst == 0 && 'mt-4'} flex cursor-pointer items-center truncate rounded-[5px] px-6 py-[0.45rem] text-[0.85rem] text-gray-600 outline-none transition duration-300 ease-linear  data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10`}
                data-te-sidenav-link-ref>
                <span class="mr-4 [&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
                    <Image
                        id={provider.provider}
                        src={provider.provider_icon_url ? provider.provider_icon_url : "/icons8-bot-64.png"}
                        alt={provider.provider_description}
                        width={18}
                        height={18}
                        draggable="false" />
                </span>
                <span className="li-item">{provider.short_name} {count > 0 && `(${count})`}</span>
            </a>
        </li>
    )
}