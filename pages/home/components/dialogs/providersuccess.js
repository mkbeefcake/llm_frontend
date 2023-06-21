import React from "react";
import Image from "next/image";

export default function SuccessProviderDialog({}) {
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
                    src="/icons8-bot-64.png"
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
                    src="/gmail.svg"
                    alt="gmailicon"
                    width={24}
                    height={24}
                    draggable="false"
                  />
                </div>
              </div>
              <div className="flex justify-center items-center gap-3.5 mt-10">
                <h3 className="text-center text-xl font-semibold text-white inter-font">
                  Success to connect !
                </h3>
                <Image
                  id="checked"
                  src="/check_verified_icon.png"
                  alt="checkedicon"
                  className="h-5"
                  width={20}
                  height={0}
                  draggable="false"
                />
              </div>
              <div className="mt-10">
                <div className="flex justify-between items-center mb-1.5">
                  <p className="font-normal text-[15px] text-white opacity-[.65] inter-font">
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
                  <p className="font-normal text-[15px] text-white opacity-[.65] ml-[9px] inter-font">
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
                  <p className="font-normal text-[15px] text-white opacity-[.65] ml-[9px] inter-font">
                    Product marketing emailing
                  </p>
                </div>
                <div className="flex items-center">
                  <Image
                    id="dot"
                    src="/dot_icon.png"
                    alt="doticon"
                    width={8}
                    height={8}
                    draggable="false"
                  />
                  <p className="font-normal text-[15px] text-white opacity-[.65] ml-[9px] inter-font">
                    XXXXX
                  </p>
                </div>
              </div>
              <div className="mt-10 flex gap-3 justify-between">
                <button
                  type="button"
                  className="primary-button w-full rounded-lg border border-transparent shadow-sm px-4 py-2.5 text-sm font-medium sm:font-semibold text-white hover:bg-blue-700 sm:text-base inter-font"
                >
                  Activate now
                </button>
                <button
                  type="button"
                  className="bg-input-color w-full rounded-lg border border-transparent shadow-sm px-4 py-2.5 text-sm font-medium sm:font-semibold text-white sm:text-base inter-font"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
