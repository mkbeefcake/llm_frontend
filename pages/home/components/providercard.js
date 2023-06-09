import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { useCustomOAuth } from "../../../lib/oauth/useOAuth";
import fetchJson from '../../../lib/fetchJson'
import { HomeContext } from "../context/context";

export default function ProviderCard({ identifierName, provider, identifier, iconUrl, statusBot }) {

    const router = useRouter();
    const { onUpdateScreen } = useContext(HomeContext)

    const onStartAutoBot = async (e) => {
        try {
            const response = await fetchJson(`/api/startautobot`, {
                method: 'Post',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    'provider': provider?.provider,
                    'identifierName': identifierName,
                    'interval': 600
                })
            });
            console.log(`onStartAutoBot: ${JSON.stringify(response)}`)
            onUpdateScreen();
        }
        catch(err) {
            console.log(`onStartAutoBot: ${err}`)
        }
    }

    const onStopAutoBot = async (e) => {
        try {
            const response = await fetchJson(`/api/stopautobot`, {
                method: 'Post',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    'provider': provider?.provider,
                    'identifierName': identifierName,
                })
            });
            console.log(`onStopAutoBot: ${JSON.stringify(response)}`)
            onUpdateScreen();
        }
        catch(err) {
            console.log(`onStartAutoBot: ${err}`)
        }        
    }

    const onStatusChange = (e) => {        
        if (statusBot == true) {
            onStopAutoBot();
            statusBot = false;
        }
        else {
            onStartAutoBot();
            statusBot = true;
        }
    }

    return (
        <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5 mt-4">
            <div className="flex items-center flex-1 min-w-0">
                <img alt={provider?.provider_description} src={iconUrl} className="flex-shrink-0 object-cover w-10 h-10" style={{objectFit:'contain'}}/>
                <div className="mt-0 mr-0 mb-0 ml-4 flex-1 min-w-0">
                <p className="text-lg font-bold white truncate">{identifierName}</p>
                <p className="text-gray-400 text-md"> <a className="main-color"> Add rules </a> / 3 rules added</p>
                </div>
            </div>
            <div className="mt-4 mr-0 mb-0 ml-0 pt-0 pr-0 pb-0 pl-14 flex items-center sm:space-x-6 sm:pl-0 sm:mt-0">
                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" onChange={onStatusChange} class="sr-only peer" checked={statusBot}/>
                    <div class="w-11 h-6 bg-gray-600 
                        peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-purple-300 
                        dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 
                        peer-checked:after:translate-x-full peer-checked:after:border-white 
                        after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                        after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
                        dark:border-gray-600 peer-checked:bg-purple-800"></div>
                    <span class="ml-3 text-sm font-medium text-white-900">{statusBot == true ? 'Active' : 'Inactive'}</span>
                </label>                
            </div>
        </div>
    )

}