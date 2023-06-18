import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import useUser from "../../lib/useUser";
import { useEffect, useState } from "react";

import Sidebar from "./sidebar";
import { HomeContextProvider } from "../../context/home/context/provider";
import { HomeContext } from "../../context/home/context/context";
import { TEMPORARY_REDIRECT_STATUS } from "next/dist/shared/lib/constants";
import AddProviderDialog from "./components/dialogs/provideradd";
import AddProviderNameDialog from "./components/dialogs/providername";
// import AuthorizeProviderDialog from "./components/dialogs/providerauthorize";
// import SuccessProviderDialog from "./components/dialogs/providersuccess";
import AddPaymentDialog from "pages/billing/components/dialog/paymentadd";

export default function HomeLayout({ children }) {
  const router = useRouter();
  const { user } = useUser({});

  const { myProviders, onUpdateScreen } = useContext(HomeContext);

  useEffect(() => {
    if (user !== undefined && user.isLoggedIn === false) {
      router.replace("/dashboard/login");
    }
  }, [user, router]);

  // const childrenWithProps = React.Children.map(children, child => {
  //     if (React.isValidElement(child)) {
  //         return React.cloneElement(child, { myProviders, onUpdateScreen})
  //     }
  //     return child
  // })

  return (
    <HomeContextProvider>
      <div className="relative min-h-screen md:flex">
        <input type="checkbox" id="menu-open" className="hidden" />
        <header className="bg-gray-800 flex justify-between md:hidden w-full fixed top-0 z-30">
          <p className="p-4 text-white font-bold whitespace-nowrap truncate">
            Navigation
          </p>
          <label
            htmlFor="menu-open"
            id="mobile-menu-button"
            className="m-2 p-2 focus:outline-none text-white hover:bg-gray-700 rounded-md cursor-pointer"
          >
            <svg
              id="menu-open-icon"
              className="h-6 w-6 transition duration-200 ease-in-out"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              id="menu-close-icon"
              className="h-6 w-6 transition duration-200 ease-in-out"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </label>
        </header>
        <Sidebar />
        <main id="content" className="flex-1">
          {children}
        </main>
      </div>
      <AddProviderDialog />
      <AddProviderNameDialog />
      {/* <AuthorizeProviderDialog /> */}
      {/* <SuccessProviderDialog /> */}
      <AddPaymentDialog />
    </HomeContextProvider>
  );
}
