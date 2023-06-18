import React, { useContext, useEffect, useState } from "react";
import ProviderAvatar from "../provideravatar";
import { HomeContext } from "../../../../context/home/context/context";

export default function AddProviderDialog({}) {
  const { myProviders, showAddProviderDialog, setShowAddProviderDialog } =
    useContext(HomeContext);
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    let myInfo = [];
    myProviders?.providers?.map((provider, i) => {
      if (myProviders.my_providers[provider?.provider]) {
        provider.count = Object.keys(
          myProviders.my_providers[provider?.provider]
        ).length;
      }

      myInfo.push(provider);
    });

    setProviders(myInfo);
  }, [myProviders]);

  return (
    <div className="relative">
      {showAddProviderDialog && (
        <div className="fixed z-40 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0"
              aria-hidden="true"
              onClick={() => setShowAddProviderDialog(false)}
            >
              <div className="dialog-overlay absolute inset-0"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            ></span>
            <div
              className="inline-block align-bottom panel rounded-3xl text-left overflow-hidden transform transition-all sm:my-2 sm:align-middle w-[465px] p-8"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-base sm:text-xl font-normal text-white">
                  Connect with provider
                </h3>
                <svg
                  className="h-5 w-5 text-white cursor-pointer"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  onClick={() => setShowAddProviderDialog(false)}
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <div className="mt-5 sm:mt-10 flex flex-wrap">
                {providers.map((provider, i) => (
                  <ProviderAvatar key={i} provider={provider} index={i + 1} />
                ))}
              </div>
              <div className="sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="primary-button w-full rounded-lg border border-transparent shadow-sm px-4 py-2.5 sm:text-base font-medium sm:font-semibold text-white hover:bg-blue-700 text-sm"
                  onClick={() => setShowAddProviderDialog(false)}
                >
                  Verify my account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
