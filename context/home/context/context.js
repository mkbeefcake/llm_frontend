import { createContext } from "react";

export const HomeContext = createContext({
  showAddProviderDialog: false,
  setShowAddProviderDialog: () => {},
  showProviderNameDialog: false,
  setShowProviderNameDialog: () => {},
  showAddPaymentMethodDialog: false,
  setShowAddPaymentMethodDialog: () => {},
  myProviders: null,
  addNewProvider: () => {},
  onUpdateScreen: () => {},
  selectedProvider: null,
  setSelectedProvider: () => {},
  updateIdentifierInfo: () => {},
  getIdentifierInfo: () => {},
  deleteProvider: () => {},
});
