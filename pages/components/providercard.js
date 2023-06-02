import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { useCustomOAuth } from "../../lib/oauth/useOAuth";
import fetchJson from '../../lib/fetchJson'

export default function ProviderCard({ provider, iconUrl }) {

    const router = useRouter();
    const [providerStatus, setProviderStatus] = useState('');

    const { customOAuthHandler, setProviderUri } = useCustomOAuth({
        redirectUri: `${typeof window === 'object' && window.location.origin}/callback/oauth`,
		onSuccess: async (code) => {
			console.log('called me')
		},
		onError: (error) => {
			console.log(error)
		},
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
        const url = process.env.NEXT_PUBLIC_BASE_URL + '/providers/link_provider?provider_name=gmailprovider';
        setProviderUri(url);
        customOAuthHandler();
        // const url = process.env.NEXT_PUBLIC_BASE_URL + '/providers/link_provider?provider_name=' + provider?.provider;
        // window.open(url, '_blank')
    }

    const onDeactivate = async (e) => {
        try {
            const response = await fetchJson(`/api/unlinkProvider?provider=${provider?.provider}`, {
                method: 'Get',
                headers: { 'Content-Type': 'application/json'},
            });
            console.log(`onDeactivate: ${JSON.stringify(response)}`)
        }
        catch(err) {
            console.log(`Unlink provider: ${err}`)
        }
    }

    const onStartAutoBot = (e) => {

    }

    const onStopAutoBot = (e) => {
        
    }

    return (
        <div className="pt-5 pr-0 pb-0 pl-0 mt-5 mr-0 mb-0 ml-0">
            <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
            <div className="flex items-center flex-1 min-w-0">
                <img alt={provider?.provider_description} src={iconUrl} width={10} height={10} className="flex-shrink-0 object-cover rounded-full w-10 h-10"/>
                <div className="mt-0 mr-0 mb-0 ml-4 flex-1 min-w-0">
                <p className="text-lg font-bold text-gray-800 truncate">{provider?.provider_description}</p>
                <p className="text-gray-600 text-md">{providerStatus}</p>
                </div>
            </div>
            <div className="mt-4 mr-0 mb-0 ml-0 pt-0 pr-0 pb-0 pl-14 flex items-center sm:space-x-6 sm:pl-0 sm:justify-end
                sm:mt-0">
                {
                    provider?.isActivated == false && 
                    <button className="bg-blue-600 hover:bg-blue-500 hover:text-gray-100 pt-2 pr-6 pb-2 pl-6 text-lg font-medium text-gray-100 transition-all
                    duration-200 rounded-lg" onClick={onActivate}>Activate</button>
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
                    <button className="bg-blue-600 hover:bg-blue-500 hover:text-gray-100 pt-2 pr-6 pb-2 pl-6 text-lg font-medium text-gray-100 transition-all
                    duration-200 rounded-lg" onClick={onStartAutoBot} >Start Autobot</button>
                }
                {
                    provider?.isStartedBot == true &&
                    <button className="bg-gray-600 hover:bg-gray-500 hover:text-gray-100 pt-2 pr-6 pb-2 pl-6 text-lg font-medium text-gray-100 transition-all
                    duration-200 rounded-lg" onClick={onStopAutoBot} >Stop Autobot</button>
                }
            </div>
            </div>
        </div>
    )

}