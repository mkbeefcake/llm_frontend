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
                        'refresh_token': data.refresh_token,
                        'option': data.option,
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
      const url = process.env.NEXT_PUBLIC_BASE_URL ?? "https://chat-automation-387710-yix5m2x4pq-uc.a.run.app" + `/providers/link_provider?provider_name=${provider?.provider}&${redirectUri}`;
      customOAuthHandler(url);
    }

    const deleteProvider = async (provider, identifierName) => {
      try {
        const res = await fetchJson(`/api/unlinkProvider?provider=${provider?.provider}&identifier=${identifierName}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: ""
        });

        console.log(`[HomeProvider] : ${JSON.stringify(res)}`)
        onUpdateScreen();
    }
    catch(err) {
        console.log(`[HomeProvider]: ${err}`)
    }          

    }

    const updateIdentifierInfo = async (providerName, identifierName, socialInfo) => {
      try {
        const res = await fetchJson('/api/updateProviderInfo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ 
                'provider': providerName, 
                'identifier': identifierName,
                'social_info': socialInfo 
            })
        });

        console.log(`[HomeProvider] : ${JSON.stringify(res)}`)
        onUpdateScreen();
      }
      catch(err) {
          console.log(`[HomeProvider]: ${err}`)
      }          
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
  
    const getIdentifierInfo = (providerName, identifierName) => {
      return myProviders.my_providers[providerName][identifierName];
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
        setSelectedProvider,
        updateIdentifierInfo,
        getIdentifierInfo,
        deleteProvider
    }

    return (
        <HomeContext.Provider value={value}>
            {children}
        </HomeContext.Provider>
    )
}