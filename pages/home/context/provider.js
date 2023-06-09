import { useEffect, useState } from "react";
import { HomeContext } from "./context";
import fetchJson from '../../../lib/fetchJson';
import { useCustomOAuth } from "../../../lib/oauth/useOAuth";

export const HomeContextProvider = ({ children }) => {

    const [showAddProviderDialog, setShowAddProviderDialog] = useState(false);
    const [showProviderNameDialog, setShowProviderNameDialog] = useState(false);
    const [myProviders, setMyProviders] = useState();
    const [selectedProvider, setSelectedProvider] = useState();

    const { customOAuthHandler } = useCustomOAuth({
      onSuccess: async (data) => {
        try {
            const res = await fetchJson('/api/updateProviderInfo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ 
                    'provider': data.provider, 
                    'identifier': localStorage.getItem('identifier'),
                    'social_info': { 
                        'access_token': data.access_token,
                        'refresh_token': data.refresh_token
                    } 
                })
            });

            console.log(`[HomeProvider] : ${JSON.stringify(res)}`)
            onUpdateScreen();
        }
        catch(err) {
            console.log(`[HomeProvider]: ${err}`)
        }          
      }
    })
  
    useEffect(() => {
      getMyProviders()
    }, [])

    const addNewProvider = (provider, identifierName) => {
      localStorage.setItem('identifier', identifierName);

      const redirectUri = `${typeof window === 'object' && window.location.origin}/callback/oauth`;
      const url = process.env.NEXT_PUBLIC_BASE_URL + `/providers/link_provider?provider_name=${provider?.provider}&${redirectUri}`;
      customOAuthHandler(url);
    }

    const getMyProviders = async () => {
      try {  
        const response = await fetchJson('/api/getMyProviders');
        console.log(`[HomeContext]: ${JSON.stringify(response)}`);
        setMyProviders(response);
      }
      catch (err) {
        console.log(`[HomeContext]: ${err}`)
      }
    }
  
    const onUpdateScreen = () => {
        getMyProviders()
    }
  

    const value = {
        showAddProviderDialog,
        setShowAddProviderDialog,
        showProviderNameDialog,
        setShowProviderNameDialog,
        myProviders,
        addNewProvider,
        onUpdateScreen,    
        selectedProvider,
        setSelectedProvider
    }

    return (
        <HomeContext.Provider value={value}>
            {children}
        </HomeContext.Provider>
    )
}