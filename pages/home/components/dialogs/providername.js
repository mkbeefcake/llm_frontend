import React, { useContext, useState } from 'react';
import ProviderAvatar from '../provideravatar';
import Image from 'next/image';
import { HomeContext } from '../../context/context';

export default function AddProviderNameDialog({ provider }) {

  const { setShowAddProviderDialog, addNewProvider,
    showProviderNameDialog, setShowProviderNameDialog 
  } = useContext(HomeContext);

  const [identiferName, setIdentiferName] = useState('');

  const onActivate = (e) => {
    if (identiferName === '') {
      alert('Please input provider name')
      return;      
    }
    
    addNewProvider(provider, identiferName);
    setShowProviderNameDialog(false);
  }

  return (
    <div className="relative">
      {showProviderNameDialog && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
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
              className="inline-block align-bottom panel rounded-lg text-left overflow-hidden transform transition-all sm:my-2 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div>
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-white-900"
                      id="modal-headline"
                    >
                      {provider?.provider_description} Name
                    </h3>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center">
                      <Image 
                        className="inline-block w-10 h-10" 
                        style={{objectFit:'contain'}}
                        id={provider.provider}
                        src={provider.provider_icon_url ? provider.provider_icon_url : "/icons8-bot-64.png"}
                        alt={provider.provider_description}
                        draggable="false"            
                        width={50}
                        height={50}/>
                      <input className='m-4 rounded-lg p-2 min-w-sm' value={identiferName} onChange={(e) => setIdentiferName(e.target.value)} required/>
                      <button
                        type="button"
                        className="main-button inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                        onClick={onActivate}
                      >
                        Activate
                      </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
