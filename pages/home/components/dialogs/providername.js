import React, { useContext, useState } from "react";
import Image from "next/image";
import { HomeContext } from "../../../../context/home/context";

export default function AddProviderNameDialog({}) {
  const {
    selectedProvider,
    addNewProvider,
    setShowAddProviderDialog,
    showProviderNameDialog,
    setShowProviderNameDialog,
  } = useContext(HomeContext);

  const [identiferName, setIdentiferName] = useState("");

  const onActivate = (e) => {
    if (identiferName === "") {
      alert("Please input provider name");
      return;
    }
    addNewProvider(selectedProvider, identiferName);
    setShowProviderNameDialog(false);
  };

  return (
    <div className="relative">
      {showProviderNameDialog && (
        <div className="fixed z-40 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0"
              aria-hidden="true"
              onClick={() => {
                setShowProviderNameDialog(false);
                setShowAddProviderDialog(true);
              }}
            >
              <div className="dialog-overlay absolute inset-0"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            ></span>
            <div
              className="inline-block align-bottom panel rounded-3xl text-left overflow-hidden transform transition-all sm:my-2 sm:align-middle sm:max-w-lg sm:w-full p-8"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-base sm:text-xl font-normal text-white inter-font">
                  {selectedProvider?.provider_description} Name
                </h3>
                <svg
                  className="h-5 w-5 text-white cursor-pointer"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  onClick={() => {
                    setShowProviderNameDialog(false);
                    setShowAddProviderDialog(true);
                  }}
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Image
                    className="inline-block w-10 h-10"
                    style={{ objectFit: "contain" }}
                    id={selectedProvider.provider}
                    src={
                      selectedProvider.provider_icon_url
                        ? selectedProvider.provider_icon_url
                        : "/icons8-bot-64.png"
                    }
                    alt={selectedProvider.provider_description}
                    draggable="false"
                    width={50}
                    height={50}
                  />
                  <input
                    className="rounded-lg p-2 w-fit sm:w-72 text-white inter-font"
                    value={identiferName}
                    onChange={(e) => setIdentiferName(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="button"
                  className="primary-button inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm inter-font"
                  onClick={onActivate}
                >
                  Activate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
