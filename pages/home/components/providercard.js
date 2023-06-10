import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { useCustomOAuth } from "../../../lib/oauth/useOAuth";
import fetchJson from '../../../lib/fetchJson'
import { HomeContext } from "../context/context";
import Image from "next/image";

export default function ProviderCard({ identifierName, provider, identifier, iconUrl, statusBot }) {

    const router = useRouter();
    const { onUpdateScreen, updateIdentifierInfo } = useContext(HomeContext)
    const [showRules, setShowRules] = useState(false);
    const [rules, setRules] = useState('');

    useEffect(() => {
        setRules(identifier['rules']);
    }, [identifier])

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

    const onAddRule = (e) => {
        setShowRules(!showRules);
    }

    const onSaveRule = async (e) => {
        debugger    
        let myIdentifierInfo = identifier;
        myIdentifierInfo['rules'] = rules;
        await updateIdentifierInfo(provider?.provider, identifierName, myIdentifierInfo);
        setShowRules(false);
    }

    return (
        <div>
            <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5 mt-4">
                <div className="flex items-center flex-1 min-w-0">
                    <img alt={provider?.provider_description} src={iconUrl} className="flex-shrink-0 object-cover w-10 h-10" style={{objectFit:'contain'}}/>
                    <div className="mt-0 mr-0 mb-0 ml-4 flex-1 min-w-0">
                    <p className="text-lg font-bold white truncate">{identifierName}</p>
                    <p className="text-gray-400 text-md" 
                        style={{overflow: "hidden",  textOverflow: "ellipsis", whiteSpace:"nowrap", maxWidth:"280px"}}>{identifier['rules'] ?? 'No rules have been added yet'}</p>
                    </div>
                </div>
                <div className="mt-4 mr-0 mb-0 ml-0 pt-0 pr-0 pb-0 pl-14 flex items-center sm:space-x-6 sm:pl-0 sm:mt-0">
                    <label class="relative inline-flex items-center cursor-pointer" onClick={onAddRule} >                    
                        <Image src="/pencil_icon.svg" width={16} height={16} />
                        <span class="ml-3 secondary-color text-sm font-medium text-white-900">Add Rules</span>
                    </label>                

                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" onChange={onStatusChange} class="sr-only peer" checked={statusBot}/>
                        <div class="w-11 h-6 bg-gray-600 
                            peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-purple-300 
                            dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 
                            peer-checked:after:translate-x-full peer-checked:after:border-white 
                            after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                            after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
                            dark:border-gray-600 peer-checked:bg-third-color"></div>
                        <span class="ml-3 text-sm font-medium text-white-900" style={{width:'50px'}}>{statusBot == true ? 'Active' : 'Inactive'}</span>
                    </label>                

                    <button id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" class="inline-flex items-center p-2 text-sm font-medium text-center rounded-lg" type="button"> 
                        <svg width="4" height="18" viewBox="0 0 4 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 10C2.55228 10 3 9.55228 3 9C3 8.44772 2.55228 8 2 8C1.44772 8 1 8.44772 1 9C1 9.55228 1.44772 10 2 10Z" stroke="white" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M2 3C2.55228 3 3 2.55228 3 2C3 1.44772 2.55228 1 2 1C1.44772 1 1 1.44772 1 2C1 2.55228 1.44772 3 2 3Z" stroke="white" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M2 17C2.55228 17 3 16.5523 3 16C3 15.4477 2.55228 15 2 15C1.44772 15 1 15.4477 1 16C1 16.5523 1.44772 17 2 17Z" stroke="white" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>

                    <div id="dropdownDots" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
                        <li>
                            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                        </li>
                        <li>
                            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                        </li>
                        <li>
                            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                        </li>
                        </ul>
                        <div class="py-2">
                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Separated link</a>
                        </div>
                    </div>
                </div>
            </div>
            {
                showRules && 
                <div className="sm:flex sm:justify-between sm:space-x-5 mt-4">
                    <div class="w-full mb-4 border-0 rounded-lg bg-textarea-color">
                        <div class="px-4 py-2 bg-textarea-color rounded-t-lg">
                            <textarea id="comment" rows="4" class="w-full px-0 text-sm bg-textarea-color text-gray-400 border-0 " 
                                placeholder="Rules: You can define the bot's option..." value={rules} onChange={e => setRules(e.target.value)}  required></textarea>
                        </div>
                        <div class="flex items-center justify-between px-3 py-2 border-t border-t-gray-400">
                            <button type="submit" class="inline-flex items-center py-2.5 px-4 text-xs 
                                font-medium text-center text-white secondary-button rounded-lg " onClick={onSaveRule}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )

}