import Image from "next/image";
import { useState, useContext } from "react";
import { HomeContext } from "../../context/home/context";
import InvoiceCard from "./components/invoicecard";
import countries from "../../lib/country";

const homeGradientStyle = {
  background:
    "conic-gradient(from -30.05deg at 50% 50%, #4D4A8B 0deg, #63419F 116.25deg, #4D4A8B 360deg)",
  filter: "blur(100px)",
};

export default function Billing() {
  const { setShowAddPaymentMethodDialog } = useContext(HomeContext);
  const [selectedCountry, setSelectedCountry] = useState();

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    onShowCountryDropdown();
  };

  const onShowCountryDropdown = () => {
    document.getElementById("country_dropdown").classList.toggle("show");
  };

  return (
    <div className="w-full h-screen relative overflow-auto content-center bg-background-color">
      <div
        className="absolute w-[43vw] h-[43vw] top-[-5vw] right-[42vw] opacity-[.15] z-10"
        style={homeGradientStyle}
      ></div>
      <div className="px-3 pt-24 pb-8 sm:px-20 sm:pt-28 relative z-20">
        <div className="flex flex-wrap gap-2 justify-between items-center">
          <div>
            <p className="text-white text-2xl font-bold inter-font">
              Billing information
            </p>
            <p className="text-white text-sm font-normal opacity-[.65] mt-1 inter-font">
              You have not set up a payment plan yet.
            </p>
          </div>
        </div>
        <button
          type="button"
          className="primary-button relative z-20 mt-[27px] px-[21.5px] py-2.5 rounded-lg text-white text-base font-semibold inter-font"
          onClick={() => setShowAddPaymentMethodDialog(true)}
        >
          Set up payment method
        </button>
        <div className="mt-11 flex flex-wrap gap-3 items-center">
          <div className="w-full sm:w-auto">
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
                className="bg-input-color w-full sm:w-[394px] text-white placeholder:text-white opacity-[.65] text-base font-normal rounded-lg block pr-3 pl-10 py-2 inter-font"
                placeholder="Card Number"
              />
            </div>
          </div>
          <div className="w-full sm:w-auto">
            <label
              htmlFor="name"
              className="block mb-1.5 text-white font-medium text-sm inter-font"
            >
              Name on Card
            </label>
            <input
              type="text"
              id="name"
              className="bg-input-color w-full sm:w-[394px] text-white placeholder:text-white opacity-[.65] text-base font-normal rounded-lg block px-3 py-2 inter-font"
              placeholder="Name"
            ></input>
          </div>
        </div>
        <p className="mt-11 mb-1.5 text-white font-medium text-sm inter-font">
          Billing address
        </p>
        <div className="flex flex-wrap gap-3 items-center">
          <div className="w-full sm:w-auto relative">
            <button
              type="button"
              className="bg-input-color w-full sm:w-[212px] text-white opacity-[.65] text-base font-normal rounded-lg px-3 py-2 justify-between inline-flex items-center"
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
              id="country_dropdown"
              className="relative top-0.5 sm:absolute sm:top-[42px] z-10 w-full h-[200px] overflow-y-scroll bg-input-color hidden border-[1.4px] border-[#586171] border-solid rounded-lg shadow"
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
            id="city"
            className="bg-input-color w-full sm:w-[394px] text-white placeholder:text-white opacity-[.65] text-base font-normal rounded-lg block px-3 py-2 inter-font"
            placeholder="City"
          ></input>
          <input
            type="text"
            id="postalcode"
            className="bg-input-color w-full sm:w-[394px] text-white placeholder:text-white opacity-[.65] text-base font-normal rounded-lg block px-3 py-2 inter-font"
            placeholder="Postal code"
          ></input>
        </div>
        <div className="flex flex-wrap gap-3 items-center mt-3">
          <input
            type="text"
            id="address1"
            className="bg-input-color w-full sm:w-[394px] xl:w-[508px] text-white placeholder:text-white opacity-[.65] text-base font-normal rounded-lg block px-3 py-2 inter-font"
            placeholder="Address line 1"
          ></input>
          <input
            type="text"
            id="address2"
            className="bg-input-color w-full sm:w-[394px] xl:w-[508px] text-white placeholder:text-white opacity-[.65] text-base font-normal rounded-lg block px-3 py-2 inter-font"
            placeholder="Address line 2"
          ></input>
        </div>
        <div className="mt-10 sm:mt-[86px]">
          <p className="text-white text-2xl font-bold inter-font">
            Billing history
          </p>
          <p className="text-white text-sm font-normal opacity-[.65] mt-1 inter-font">
            35 invoices found.
          </p>
          <div className="mt-[27px]">
            {[1, 2].map((invoice) => {
              return <InvoiceCard key={invoice} id={invoice} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
