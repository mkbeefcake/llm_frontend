import { useEffect, useState } from "react";
import { HomeContext } from "./context";
import fetchJson from "../../lib/fetchJson";
import { useCustomOAuth } from "../../lib/oauth/useOAuth";
import Nango from '@nangohq/frontend'

export const HomeContextProvider = ({ children }) => {
  const nango = new Nango({ publicKey: `fe21a641-ea29-45ac-8d9e-0295cea675a2` })

  const [showAddProviderDialog, setShowAddProviderDialog] = useState(false);
  const [showProviderNameDialog, setShowProviderNameDialog] = useState(false);
  const [showAddPaymentMethodDialog, setShowAddPaymentMethodDialog] =
    useState(false);
  const [myProviders, setMyProviders] = useState();
  const [selectedProvider, setSelectedProvider] = useState();
  const [showLoadingDialog, setShowLoadingDialog] = useState(false);

  const { customOAuthHandler } = useCustomOAuth({
    onSuccess: async (data) => {

      if (data == undefined) {
        alert('User cancelled the authentcation')
        onUpdateScreen();
        return;
      }

      try {
        const res = await fetchJson("/api/updateProviderInfo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            provider: data.provider,
            identifier: localStorage.getItem("identifier"),
            social_info: {
              access_token: data.access_token,
              refresh_token: data.refresh_token,
              option: data.option,
            },
          }),
        });

        console.log(`[HomeProvider] : ${JSON.stringify(res)}`);
        onUpdateScreen();
      } catch (err) {
        console.log(`[HomeProvider]: ${err}`);
      }
    },
  });

  useEffect(() => {
    getMyProviders();
  }, []);

  const addNewProvider = (provider, identifierName) => {
    localStorage.setItem("identifier", identifierName);

    if (provider?.provider_type === 'base') {
      // Link base type provider 
      const redirectUri = `${typeof window === "object" && window.location.origin}/callback/oauth`;
      const url = (process.env.NEXT_PUBLIC_BASE_URL ?? "https://chat-automation-387710-yix5m2x4pq-uc.a.run.app") + `/providers/link_provider?provider_name=${provider?.provider}&redirect_url=${redirectUri}`;
      customOAuthHandler(url);
    }
    else if (provider?.provider_type === 'nango') {
      // Link nango type provider
      nango.auth(provider?.provider_unique_key, identifierName)
        .then(async result => {
          try {
            const res = await fetchJson("/api/updateProviderInfo", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                provider: provider?.provider,
                identifier: localStorage.getItem("identifier"),
                social_info: result,
              }),
            });
    
            console.log(`[HomeProvider] : ${JSON.stringify(res)}`);
            onUpdateScreen();
          } catch (err) {
            console.log(`[HomeProvider]: ${err}`);
            onUpdateScreen();
          }
        })
        .catch(err => {
          alert(`Error: ${JSON.stringify(err)}`)
          onUpdateScreen();
        })
    }
    else {
      alert(`Unknown Provider Type`)
    }
  };

  const deleteProvider = async (provider, identifierName) => {
    try {
      const res = await fetchJson(
        `/api/unlinkProvider?provider=${provider?.provider}&identifier=${identifierName}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: "",
        }
      );

      console.log(`[HomeProvider] : ${JSON.stringify(res)}`);
      onUpdateScreen();
    } catch (err) {
      console.log(`[HomeProvider]: ${err}`);
    }
  };

  const updateIdentifierInfo = async (
    providerName,
    identifierName,
    socialInfo
  ) => {
    try {
      const res = await fetchJson("/api/updateProviderInfo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: providerName,
          identifier: identifierName,
          social_info: socialInfo,
        }),
      });

      console.log(`[HomeProvider] : ${JSON.stringify(res)}`);
      onUpdateScreen();
    } catch (err) {
      console.log(`[HomeProvider]: ${err}`);
    }
  };

  const getMyProviders = async () => {
    try {
      const response = await fetchJson("/api/getMyProviders");
      setMyProviders(response);
    } catch (err) {
      console.log(`[HomeContext]: ${err}`);
    }
  };

  const onUpdateScreen = async () => {
    await getMyProviders();
    setShowLoadingDialog(false)
  };

  const getIdentifierInfo = (providerName, identifierName) => {
    return myProviders.my_providers[providerName][identifierName];
  };

  const value = {
    showAddProviderDialog,
    setShowAddProviderDialog,
    showProviderNameDialog,
    setShowProviderNameDialog,
    showAddPaymentMethodDialog,
    setShowAddPaymentMethodDialog,
    myProviders,
    addNewProvider,
    onUpdateScreen,
    selectedProvider,
    setSelectedProvider,
    updateIdentifierInfo,
    getIdentifierInfo,
    deleteProvider,
    showLoadingDialog,
    setShowLoadingDialog,
  };

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};
