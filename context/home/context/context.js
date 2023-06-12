import { createContext } from "react";

export const HomeContext = createContext({
    showAddProviderDialog: false,
    setShowAddProviderDialog: () => {},
    showProviderNameDialog: false,
    setShowProviderNameDialog: () => {},
    myProviders: null,    
    addNewProvider: () => {},
    onUpdateScreen: () => {},
    selectedProvider: null,
    setSelectedProvider: () => {},
    updateIdentifierInfo: () => {},
    getIdentifierInfo: () => {},
    deleteProvider: () => {}
})