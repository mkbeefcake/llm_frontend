import Image from "next/image";
import { useState, useContext } from "react";
import { HomeContext } from "../../../../context/home/context";
import countries from "../../../../lib/country";

export default function AddPaymentDialog({}) {
  const { showAddPaymentMethodDialog, setShowAddPaymentMethodDialog } =
    useContext(HomeContext);

  const [selectedCountry, setSelectedCountry] = useState();

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    onShowCountryDropdown();
  };

  const onShowCountryDropdown = () => {
    document.getElementById("dialog_country_dropdown").classList.toggle("show");
  };

  return (
    <div className="relative">
      {showAddPaymentMethodDialog && (
        <div className="fixed z-40 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen py-4 px-4 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0"
              aria-hidden="true"
              onClick={() => setShowAddPaymentMethodDialog(false)}
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
                <h3 className="text-base sm:text-xl font-normal text-white inter-font">
                  Billing information
                </h3>
                <svg
                  className="h-5 w-5 text-white cursor-pointer"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  onClick={() => setShowAddPaymentMethodDialog(false)}
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <div className="mt-5 sm:mt-10">
                <div className="w-full">
                  <label
                    htmlFor="card_number"
                    className="block mb-1.5 text-white font-medium text-sm inter-font"
                  >
                    Card information
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z" />
                        <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="card_number"
                      className="bg-input-color w-full text-white placeholder:text-white opacity-[.65] text-base font-normal rounded-lg block pr-3 pl-10 py-2 inter-font"
                      placeholder="Card Number"
                    />
                    <Image
                      className="absolute hidden sm:block top-3 right-3"
                      id="hint"
                      src="/hint.png"
                      alt="Hint"
                      width={95}
                      height={95}
                      draggable="false"
                    />
                  </div>
                </div>
                <div className="w-full mt-10">
                  <label
                    htmlFor="name"
                    className="block mb-1.5 text-white font-medium text-sm inter-font"
                  >
                    Name on Card
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="bg-input-color w-full text-white placeholder:text-white opacity-[.65] text-base font-normal rounded-lg block px-3 py-2 inter-font"
                    placeholder="Name"
                  ></input>
                </div>
              </div>
              <p className="mt-5 sm:mt-10 mb-1.5 text-white font-medium text-sm inter-font">
                Billing address
              </p>
              <div>
                <div className="w-full sm:w-auto mb-1.5 relative">
                  <button
                    type="button"
                    className="bg-input-color w-full text-white opacity-[.65] text-base font-normal rounded-lg px-3 py-2 justify-between inline-flex items-center"
                    onClick={onShowCountryDropdown}
                  >
                    <p className="w-[80%] text-left truncate inter-font">
                      {selectedCountry ? selectedCountry : "Country"}
                    </p>
                    <svg
                      className="w-4 h-4 ml-2"
                      aria-hidden="true"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>
                  <div
                    id="dialog_country_dropdown"
                    className="absolute top-[42px] z-10 w-full h-[200px] overflow-y-scroll bg-input-color hidden border-[1.4px] border-[#586171] border-solid rounded-lg shadow"
                  >
                    <ul className="py-1">
                      {countries.map((country, index) => {
                        return (
                          <li
                            key={index}
                            onClick={() => {
                              handleCountryChange(country.name);
                            }}
                          >
                            <div className="flex items-center gap-4 px-4 py-2 hover:bg-gray-600 cursor-pointer">
                              <Image
                                id={country.name}
                                src={`/flag/${country.code.toLowerCase()}.png`}
                                alt={country.name}
                                width={16}
                                height={16}
                                draggable="false"
                              />
                              <p className="text-base text-white opacity-[.65] truncate inter-font">
                                {country.name}
                              </p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <input
                  type="text"
                  id="address1"
                  className="bg-input-color w-full mb-1.5 text-white placeholder:text-white opacity-[.65] text-base font-normal rounded-lg block px-3 py-2 inter-font"
                  placeholder="Address line 1"
                ></input>
                <input
                  type="text"
                  id="address2"
                  className="bg-input-color w-full mb-1.5 text-white placeholder:text-white opacity-[.65] text-base font-normal rounded-lg block px-3 py-2 inter-font"
                  placeholder="Address line 2"
                ></input>
                <div className="flex justify-between items-center gap-3">
                  <input
                    type="text"
                    id="city"
                    className="bg-input-color w-full text-white placeholder:text-white opacity-[.65] text-base font-normal rounded-lg block px-3 py-2 inter-font"
                    placeholder="City"
                  ></input>
                  <input
                    type="text"
                    id="postalcode"
                    className="bg-input-color w-full text-white placeholder:text-white opacity-[.65] text-base font-normal rounded-lg block px-3 py-2 inter-font"
                    placeholder="Postal code"
                  ></input>
                </div>
              </div>
              <div className="mt-5 sm:mt-10">
                <button
                  type="button"
                  className="primary-button w-full rounded-lg border border-transparent shadow-sm px-4 py-2.5 sm:text-base font-medium sm:font-semibold text-white hover:bg-blue-700 text-sm inter-font"
                  // onClick={() => setShowAddProviderDialog(false)}
                >
                  Set up payment method
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
