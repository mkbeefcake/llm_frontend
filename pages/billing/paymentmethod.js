import Image from "next/image";
import PaymentMethodCard from "./components/paymentmethodcard";

const homeGradientStyle = {
  background:
    "conic-gradient(from -30.05deg at 50% 50%, #4D4A8B 0deg, #63419F 116.25deg, #4D4A8B 360deg)",
  filter: "blur(100px)",
};

export default function Payment() {
  return (
    <div className="w-full h-screen relative overflow-auto content-center bg-background-color">
      <div
        className="absolute w-[43vw] h-[43vw] top-[-5vw] right-[42vw] opacity-[.15] z-10"
        style={homeGradientStyle}
      ></div>
      <div className="px-3 pt-24 pb-8 sm:px-20 sm:pt-28">
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
        >
          Add new payment method
        </button>
        <div className="mt-[27px] grid grid-cols-1 xl:grid-cols-2 gap-4 justify-between items-center">
          {["mastercard", "apple-pay", "paypal"].map((paymentmethod, index) => {
            return <PaymentMethodCard key={index} info={paymentmethod} />;
          })}
        </div>
        <div className="mt-10 sm:mt-[86px] relative z-20">
          <p className="text-white text-2xl font-bold inter-font">
            Billing history
          </p>
          <p className="text-white text-sm font-normal opacity-[.65] mt-1 inter-font">
            35 invoices found.
          </p>
          <div className="mt-[27px]">
            <div className="flex flex-wrap justify-between gap-2 items-center bg-input-color rounded-2xl mb-[18px] px-[26px] py-[22px]">
              <div className="flex items-center">
                <Image
                  id="invoice"
                  src="/invoice.svg"
                  alt="Invoice"
                  width={53}
                  height={53}
                  draggable="false"
                />
                <div className="ml-[23px]">
                  <p className="text-white text-lg font-bold mb-px inter-font">
                    InvoiceID 000001
                  </p>
                  <p className="text-white text-lg font-normal opacity-[.65] inter-font">
                    03/23/2023 Tuesday, 20:24
                  </p>
                </div>
              </div>
              <div className="flex justify-between w-full lg:w-auto lg:justify-end items-center">
                <button
                  type="button"
                  className="bg-[#59606A] rounded-lg px-[35px] py-2.5 mr-[29px] font-semibold text-base text-white inter-font"
                >
                  See detail
                </button>
                <div className="dropdown">
                  <button
                    id={`dropdownMenuIconButton`}
                    className="dropbtn w-5 text-center rounded-md hover:bg-gray-600"
                    type="button"
                  >
                    <svg
                      className="mx-auto"
                      width="4"
                      height="18"
                      viewBox="0 0 4 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 10C2.55228 10 3 9.55228 3 9C3 8.44772 2.55228 8 2 8C1.44772 8 1 8.44772 1 9C1 9.55228 1.44772 10 2 10Z"
                        stroke="white"
                        strokeOpacity="0.5"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 3C2.55228 3 3 2.55228 3 2C3 1.44772 2.55228 1 2 1C1.44772 1 1 1.44772 1 2C1 2.55228 1.44772 3 2 3Z"
                        stroke="white"
                        strokeOpacity="0.5"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 17C2.55228 17 3 16.5523 3 16C3 15.4477 2.55228 15 2 15C1.44772 15 1 15.4477 1 16C1 16.5523 1.44772 17 2 17Z"
                        stroke="white"
                        strokeOpacity="0.5"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <div
                    id={`myDropdown`}
                    className="overflow-hidden dropdown-content top-0 right-0 w-24"
                  >
                    <span className="absolute top-[9px] right-1 w-5 rounded-md py-1 px-2 text-center hover:bg-gray-600">
                      <svg
                        className="mx-auto"
                        width="4"
                        height="18"
                        viewBox="0 0 4 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 10C2.55228 10 3 9.55228 3 9C3 8.44772 2.55228 8 2 8C1.44772 8 1 8.44772 1 9C1 9.55228 1.44772 10 2 10Z"
                          stroke="white"
                          strokeOpacity="0.5"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M2 3C2.55228 3 3 2.55228 3 2C3 1.44772 2.55228 1 2 1C1.44772 1 1 1.44772 1 2C1 2.55228 1.44772 3 2 3Z"
                          stroke="white"
                          strokeOpacity="0.5"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M2 17C2.55228 17 3 16.5523 3 16C3 15.4477 2.55228 15 2 15C1.44772 15 1 15.4477 1 16C1 16.5523 1.44772 17 2 17Z"
                          stroke="white"
                          strokeOpacity="0.5"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <button className="block text-white text-base font-normal inter-font">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-between gap-2 items-center bg-input-color rounded-2xl mb-[18px] px-[26px] py-[22px]">
              <div className="flex items-center">
                <Image
                  id="invoice"
                  src="/invoice.svg"
                  alt="Invoice"
                  width={53}
                  height={53}
                  draggable="false"
                />
                <div className="ml-[23px]">
                  <p className="text-white text-lg font-bold mb-px inter-font">
                    InvoiceID 000002
                  </p>
                  <p className="text-white text-lg font-normal opacity-[.65] inter-font">
                    03/23/2023 Tuesday, 20:24
                  </p>
                </div>
              </div>
              <div className="flex justify-between w-full lg:w-auto lg:justify-end items-center">
                <button
                  type="button"
                  className="bg-[#59606A] rounded-lg px-[35px] py-2.5 mr-[29px] font-semibold text-base text-white inter-font"
                >
                  See detail
                </button>
                <div className="dropdown">
                  <button
                    id={`dropdownMenuIconButton`}
                    className="dropbtn w-5 text-center rounded-md hover:bg-gray-600"
                    type="button"
                  >
                    <svg
                      className="mx-auto"
                      width="4"
                      height="18"
                      viewBox="0 0 4 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 10C2.55228 10 3 9.55228 3 9C3 8.44772 2.55228 8 2 8C1.44772 8 1 8.44772 1 9C1 9.55228 1.44772 10 2 10Z"
                        stroke="white"
                        strokeOpacity="0.5"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 3C2.55228 3 3 2.55228 3 2C3 1.44772 2.55228 1 2 1C1.44772 1 1 1.44772 1 2C1 2.55228 1.44772 3 2 3Z"
                        stroke="white"
                        strokeOpacity="0.5"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 17C2.55228 17 3 16.5523 3 16C3 15.4477 2.55228 15 2 15C1.44772 15 1 15.4477 1 16C1 16.5523 1.44772 17 2 17Z"
                        stroke="white"
                        strokeOpacity="0.5"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <div
                    id={`myDropdown`}
                    className="overflow-hidden dropdown-content top-0 right-0 w-24"
                  >
                    <span className="absolute top-[9px] right-1 w-5 rounded-md py-1 px-2 text-center hover:bg-gray-600">
                      <svg
                        className="mx-auto"
                        width="4"
                        height="18"
                        viewBox="0 0 4 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 10C2.55228 10 3 9.55228 3 9C3 8.44772 2.55228 8 2 8C1.44772 8 1 8.44772 1 9C1 9.55228 1.44772 10 2 10Z"
                          stroke="white"
                          strokeOpacity="0.5"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M2 3C2.55228 3 3 2.55228 3 2C3 1.44772 2.55228 1 2 1C1.44772 1 1 1.44772 1 2C1 2.55228 1.44772 3 2 3Z"
                          stroke="white"
                          strokeOpacity="0.5"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M2 17C2.55228 17 3 16.5523 3 16C3 15.4477 2.55228 15 2 15C1.44772 15 1 15.4477 1 16C1 16.5523 1.44772 17 2 17Z"
                          stroke="white"
                          strokeOpacity="0.5"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <button className="block text-white text-base font-normal inter-font">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
