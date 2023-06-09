import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { useCustomOAuth } from "../../../lib/oauth/useOAuth";
import fetchJson from '../../../lib/fetchJson'

export default function ProviderCard({ provider, iconUrl, onUpdate }) {

    const router = useRouter();
    const [providerStatus, setProviderStatus] = useState('');

    const { customOAuthHandler } = useCustomOAuth({
		onSuccess: async (data) => {
			console.log(`Response : ${JSON.stringify(data)}`)
            try {
                const res = await fetchJson('/api/updateProviderInfo', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json'},
                    body: JSON.stringify({ 
                        'provider': data.provider, 
                        'social_info': { 
                            'access_token': data.access_token,
                            'refresh_token': data.refresh_token
                        } 
                    })
                });

                console.log(`res : ${JSON.stringify(res)}`)
                onUpdate();
            }
            catch(err) {
                console.log(`Login Screen: ${err}`)
            }          
        }
    })

    useEffect(() => {
        if (provider.isActivated === false) {
            setProviderStatus('Chatbot not activated')
        }
        else if (provider.isActivated === true) {
            setProviderStatus('Chatbot activated')
        }
        
        if (provider.isActivated === true && provider.isStartedBot === true) {
            setProviderStatus('Chatbot is working...')
        }

    }, [provider])

    const onActivate = (e) => {
        const redirectUri = `${typeof window === 'object' && window.location.origin}/callback/oauth`;
        const url = process.env.NEXT_PUBLIC_BASE_URL + `/providers/link_provider?provider_name=${provider?.provider}&${redirectUri}`;
        customOAuthHandler(url);
    }

    const onDeactivate = async (e) => {
        try {
            const response = await fetchJson(`/api/unlinkProvider?provider=${provider?.provider}`, {
                method: 'Get',
                headers: { 'Content-Type': 'application/json'},
            });
            console.log(`onDeactivate: ${JSON.stringify(response)}`)
            onUpdate();
        }
        catch(err) {
            console.log(`Unlink provider: ${err}`)
        }
    }

    const onStartAutoBot = async (e) => {
        try {
            const response = await fetchJson(`/api/startautobot`, {
                method: 'Post',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    'provider': provider?.provider,
                    'interval': 60
                })
            });
            console.log(`onStartAutoBot: ${JSON.stringify(response)}`)
            onUpdate();
        }
        catch(err) {
            console.log(`Unlink provider: ${err}`)
        }
    }

    const onStopAutoBot = async (e) => {
        try {
            const response = await fetchJson(`/api/stopautobot`, {
                method: 'Post',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    'provider': provider?.provider
                })
            });
            console.log(`onStopAutoBot: ${JSON.stringify(response)}`)
            onUpdate();
        }
        catch(err) {
            console.log(`Unlink provider: ${err}`)
        }        
    }

    return (
        <div className="panel flow-root rounded-lg pt-5 pr-10 pb-5 pl-10 m-5">
            <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
            <div className="flex items-center flex-1 min-w-0">
                <img alt={provider?.provider_description} src={iconUrl} width={10} height={10} className="flex-shrink-0 object-cover rounded-full w-10 h-10"/>
                <div className="mt-0 mr-0 mb-0 ml-4 flex-1 min-w-0">
                <p className="text-lg font-bold white truncate">{provider?.provider_description}</p>
                <p className="text-gray-400 text-md"> <a className="main-color"> Add rules </a> / 3 rules added</p>
                </div>
            </div>
            <div className="mt-4 mr-0 mb-0 ml-0 pt-0 pr-0 pb-0 pl-14 flex items-center sm:space-x-6 sm:pl-0 sm:justify-end
                sm:mt-0">
                {
                    provider?.isActivated == false && 
                    <button className="main-button pt-2 pr-6 pb-2 pl-6 text-lg font-medium transition-all duration-200 rounded-lg" onClick={onActivate}>Activate</button>
                }
                {
                    provider?.isActivated == true && 
                    <button className="bg-gray-600 hover:bg-gray-500 hover:text-gray-100 pt-2 pr-6 pb-2 pl-6 text-lg font-medium text-gray-100 transition-all
                    duration-200 rounded-lg" onClick={onDeactivate} >Deactivate</button>
                }
            </div>
            <div className="mt-4 mr-0 mb-0 ml-0 pt-0 pr-0 pb-0 pl-14 flex items-center sm:space-x-6 sm:pl-0 sm:mt-0">
                {
                    provider?.isStartedBot == false &&
                    <button className="main-button pt-2 pr-6 pb-2 pl-6 text-lg font-medium transition-all
                    duration-200 rounded-lg" onClick={onStartAutoBot} disabled={!provider?.isActivated}>Start Autobot</button>
                }
                {
                    provider?.isStartedBot == true &&
                    <button className="bg-gray-600 hover:bg-gray-500 hover:text-gray-100 pt-2 pr-6 pb-2 pl-6 text-lg font-medium text-gray-100 transition-all
                    duration-200 rounded-lg" onClick={onStopAutoBot} disabled={!provider?.isActivated}>In-progress</button>
                }
            </div>
            </div>
        </div>
    )

}