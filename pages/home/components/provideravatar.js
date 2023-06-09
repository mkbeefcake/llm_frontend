import Image from "next/image";

export  default function ProviderAvatar({ provider}) {
    return (
        <div className="flex flex-col items-center p-4 ">
        <Image 
            className="inline-block w-10 h-10" 
            style={{objectFit:'contain'}}
            id={provider.provider}
            src={provider.provider_icon_url ? provider.provider_icon_url : "/icons8-bot-64.png"}
            alt={provider.provider_description}
            draggable="false"            
            width={50}
            height={50}/>
            <p className="mt-2 text-md">{provider.short_name}</p>
        </div>
    )
}