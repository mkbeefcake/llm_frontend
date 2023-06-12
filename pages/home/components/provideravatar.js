import Image from "next/image";
import fetchJson from '../../../lib/fetchJson'
import AddProviderNameDialog from "./dialogs/providername";
import { useContext, useState } from "react";
import { HomeContext } from "../../../context/home/context/context";

export default function ProviderAvatar({ provider }) {

    const {setShowAddProviderDialog,  setShowProviderNameDialog, setSelectedProvider} = useContext(HomeContext)

    const onAddProvider = (e) => {
        setSelectedProvider(provider);
        setShowAddProviderDialog(false)
        setShowProviderNameDialog(true)
    }

    return (
        <div className="flex flex-col items-center p-4" onClick={onAddProvider} >
            <Image 
                className="inline-block w-10 h-10" 
                style={{objectFit:'contain'}}
                id={provider?.provider}
                src={provider?.provider_icon_url ? provider?.provider_icon_url : "/icons8-bot-64.png"}
                alt={provider?.provider_description}
                draggable="false"            
                width={50}
                height={50}/>
            <p className="mt-2 text-md">{provider?.short_name}</p>
        </div>
    )
}