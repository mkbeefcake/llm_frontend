import React from "react";
import Image from "next/image";

export default function AuthorizeProviderDialog({}) {
  return (
    <div className="relative">
      {false && (
        <div className="fixed z-40 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0"
              aria-hidden="true"
              onClick={() => console.log("close dialog")}
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
              <div className="flex gap-5 justify-center items-center">
                <div className="rounded-full w-[50px] h-[50px] flex justify-center items-center active:shadow-lg bg-[#635EE3]">
                  <Image
                    id="avartar"
                    src="/bot_icon.png"
                    alt="boticon"
                    width={24}
                    height={24}
                    draggable="false"
                  />
                </div>
                <Image
                  id="switchicon"
                  src="/switch_icon.png"
                  alt="switchicon"
                  width={15}
                  height={15}
                  draggable="false"
                />
                <div className="rounded-full w-[50px] h-[50px] flex justify-center items-center active:shadow-lg bg-input-color">
                  <Image
                    id="gmail"
                    src="/gmail_icon.png"
                    alt="gmailicon"
                    width={24}
                    height={24}
                    draggable="false"
                  />
                </div>
              </div>
              <h3 className="mt-10 text-center text-xl font-normal text-gray-400">
                Authorize <span className="text-white">Gmail</span> account
              </h3>
              <div className="mt-10">
                <div className="flex justify-between items-center">
                  <p className="font-normal text-[15px] text-white opacity-[.65]">
                    This will allow Autobot to automate:
                  </p>
                  <Image
                    id="info"
                    src="/info_circle_icon.png"
                    alt="infoicon"
                    width={19}
                    height={19}
                    draggable="false"
                  />
                </div>
                <div className="flex items-center mb-1.5">
                  <Image
                    id="dot"
                    src="/dot_icon.png"
                    alt="doticon"
                    width={8}
                    height={8}
                    draggable="false"
                  />
                  <p className="font-normal text-[15px] text-white opacity-[.65] ml-2">
                    Product sell optimizing
                  </p>
                </div>
                <div className="flex items-center mb-1.5">
                  <Image
                    id="dot"
                    src="/dot_icon.png"
                    alt="doticon"
                    width={8}
                    height={8}
                    draggable="false"
                  />
                  <p className="font-normal text-[15px] text-white opacity-[.65] ml-2">
                    Product marketing emailing
                  </p>
                </div>
                <div className="flex items-center mb-1.5">
                  <Image
                    id="dot"
                    src="/dot_icon.png"
                    alt="doticon"
                    width={8}
                    height={8}
                    draggable="false"
                  />
                  <p className="font-normal text-[15px] text-white opacity-[.65] ml-2">
                    XXXXX
                  </p>
                </div>
              </div>
              <div className="mt-10 flex gap-3 justify-between">
                <button
                  type="button"
                  className="primary-button w-full rounded-lg border border-transparent shadow-sm px-4 py-2 text-sm font-medium sm:font-semibold text-white hover:bg-blue-700 sm:text-base"
                >
                  Authorize
                </button>
                <button
                  type="button"
                  className="bg-input-color w-full rounded-lg border border-transparent shadow-sm px-4 py-2 text-sm font-medium sm:font-semibold text-white sm:text-base"
                >
                  Cancel
                </button>
              </div>
              <p className="mt-2 font-normal text-xs text-white opacity-[.5]">
                This will bring you to www.gmail.com
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
