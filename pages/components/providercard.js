import { useEffect, useState } from "react"

export default function ProviderCard({ providerName, isActivated = false, isStartedBot = false, iconUrl}) {

    const [providerStatus, setProviderStatus] = useState('');

    useEffect(() => {
        if (isActivated === false) {
            setProviderStatus('Chatbot not activated')
        }
        else if (isActivated === true) {
            setProviderStatus('Chatbot activated')
        }
        
        if (isActivated === true && isStartedBot === true) {
            setProviderStatus('Chatbot is working...')
        }

    }, [isActivated, isStartedBot])

    return (
        <div className="pt-5 pr-0 pb-0 pl-0 mt-5 mr-0 mb-0 ml-0">
            <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
            <div className="flex items-center flex-1 min-w-0">
                <img alt={providerName} src={iconUrl} width={10} height={10} className="flex-shrink-0 object-cover rounded-full w-10 h-10"/>
                <div className="mt-0 mr-0 mb-0 ml-4 flex-1 min-w-0">
                <p className="text-lg font-bold text-gray-800 truncate">{providerName}</p>
                <p className="text-gray-600 text-md">{providerStatus}</p>
                </div>
            </div>
            <div className="mt-4 mr-0 mb-0 ml-0 pt-0 pr-0 pb-0 pl-14 flex items-center sm:space-x-6 sm:pl-0 sm:justify-end
                sm:mt-0">
                {
                    isActivated == false && 
                    <button className="bg-blue-600 hover:bg-blue-500 hover:text-gray-100 pt-2 pr-6 pb-2 pl-6 text-lg font-medium text-gray-100 transition-all
                    duration-200 rounded-lg">Activate</button>
                }
                {
                    isActivated == true && 
                    <button className="bg-gray-600 hover:bg-gray-500 hover:text-gray-100 pt-2 pr-6 pb-2 pl-6 text-lg font-medium text-gray-100 transition-all
                    duration-200 rounded-lg">Deactivate</button>
                }
            </div>
            <div className="mt-4 mr-0 mb-0 ml-0 pt-0 pr-0 pb-0 pl-14 flex items-center sm:space-x-6 sm:pl-0 sm:mt-0">
                {
                    isStartedBot == false &&
                    <button className="bg-blue-600 hover:bg-blue-500 hover:text-gray-100 pt-2 pr-6 pb-2 pl-6 text-lg font-medium text-gray-100 transition-all
                    duration-200 rounded-lg">Start Autobot</button>
                }
                {
                    isStartedBot == true &&
                    <button className="bg-gray-600 hover:bg-gray-500 hover:text-gray-100 pt-2 pr-6 pb-2 pl-6 text-lg font-medium text-gray-100 transition-all
                    duration-200 rounded-lg">Stop Autobot</button>
                }
            </div>
            </div>
        </div>
    )

}