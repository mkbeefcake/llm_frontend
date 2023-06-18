import { useEffect, useState } from "react";
import Image from "next/image";
import Datepicker from "react-tailwindcss-datepicker";
import Chart from "chart.js";

const homeGradientStyle = {
  background:
    "conic-gradient(from -30.05deg at 50% 50%, #4D4A8B 0deg, #63419F 116.25deg, #4D4A8B 360deg)",
  filter: "blur(100px)",
};

export default function Dashboard() {
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });

  const [selectedProvider, setSelectedProvider] = useState("All Providers");
  const [selectedAccount, setSelectedAccount] = useState("All Accounts");
  const [selectedType, setSelectedType] = useState("Providers");

  const handleProviderChange = (provider) => {
    setSelectedProvider(provider);
    onShowProvidersDropdown();
  };

  const handleAccountChange = (account) => {
    setSelectedAccount(account);
    onShowAccountsDropdown();
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    onShowTypeDropdown();
  };

  const handleValueChange = (newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    var config = {
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: new Date().getFullYear(),
            backgroundColor: "#3182ce",
            borderColor: "#3182ce",
            data: [65, 78, 66, 44, 56, 67, 75],
            fill: false,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Sales Charts",
          fontColor: "white",
        },
        legend: {
          labels: {
            fontColor: "white",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Month",
                fontColor: "white",
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(0, 0, 0, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    var ctx = document.getElementById("line-chart").getContext("2d");
    window.myLine = new Chart(ctx, config);
  }, []);

  const onShowProvidersDropdown = () => {
    document.getElementById("providers_dropdown").classList.toggle("show");
    document
      .getElementById("providers_dropdown_icon")
      .classList.toggle("rotate-[-180deg]");
  };

  const onShowAccountsDropdown = () => {
    document.getElementById("accounts_dropdown").classList.toggle("show");
    document
      .getElementById("accounts_dropdown_icon")
      .classList.toggle("rotate-[-180deg]");
  };

  const onShowTypeDropdown = () => {
    document.getElementById("type_dropdown").classList.toggle("show");
    document
      .getElementById("type_dropdown_icon")
      .classList.toggle("rotate-[-180deg]");
  };

  return (
    <div className="w-full h-screen relative overflow-auto content-center bg-background-color">
      <div
        className="absolute w-[43vw] h-[43vw] top-[-5vw] right-[42vw] opacity-[.15] z-10"
        style={homeGradientStyle}
      ></div>
      <div className="px-3 pb-[57px] pt-24 sm:px-20 sm:pt-28 relative z-20">
        <div className="flex flex-wrap gap-2 justify-between items-center mb-7">
          <div>
            <p className="text-white text-2xl font-bold">Dashboard</p>
            <p className="text-white text-sm font-normal opacity-[.65] mt-1">
              Analytics about all automated providers
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 items-center mt-7">
          <div className="w-full sm:w-[195px] relative">
            <button
              type="button"
              className="text-white w-full bg-transparent border-[1.4px] border-[#586171] border-solid font-normal opacity-[.65] rounded-lg text-lg px-6 py-2.5 justify-between inline-flex items-center"
              onClick={onShowProvidersDropdown}
            >
              <p className="w-[80%] text-left truncate">{selectedProvider}</p>
              <svg
                id="providers_dropdown_icon"
                className="w-4 h-4 ml-2 transition-transform duration-200 ease-in-out"
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
              id="providers_dropdown"
              className="relative top-0.5 sm:absolute sm:top-[52px] z-20 w-full bg-input-color hidden border-[1.4px] border-[#586171] border-solid rounded-lg shadow"
            >
              <ul className="py-1">
                <li
                  onClick={() => {
                    handleProviderChange("All Providers");
                  }}
                >
                  <div className="flex items-center gap-4 px-4 py-2 hover:bg-gray-600 cursor-pointer">
                    <Image
                      id="bot"
                      src="/bot_icon.png"
                      alt="bot"
                      width={16}
                      height={16}
                      draggable="false"
                    />
                    <p className="text-base text-white opacity-[.65] truncate">
                      All Providers
                    </p>
                  </div>
                </li>
                <li
                  onClick={() => {
                    handleProviderChange("Gmail");
                  }}
                >
                  <div className="flex items-center gap-4 px-4 py-2 hover:bg-gray-600 cursor-pointer">
                    <Image
                      id="gmail"
                      src="/gmail_icon.png"
                      alt="Gmail"
                      width={16}
                      height={16}
                      draggable="false"
                    />
                    <p className="text-base text-white opacity-[.65] truncate">
                      Gmail
                    </p>
                  </div>
                </li>
                <li
                  onClick={() => {
                    handleProviderChange("Twitter");
                  }}
                >
                  <div className="flex items-center gap-4 px-4 py-2 hover:bg-gray-600 cursor-pointer">
                    <Image
                      id="twitter"
                      src="/twitter_icon.png"
                      alt="Twitter"
                      width={16}
                      height={16}
                      draggable="false"
                    />
                    <p className="text-base text-white opacity-[.65] truncate">
                      Twitter
                    </p>
                  </div>
                </li>
                <li
                  onClick={() => {
                    handleProviderChange("Facebook");
                  }}
                >
                  <div className="flex items-center gap-4 px-4 py-2 hover:bg-gray-600 cursor-pointer">
                    <Image
                      id="facebook"
                      src="/facebook_icon.png"
                      alt="Facebook"
                      width={16}
                      height={16}
                      draggable="false"
                    />
                    <p className="text-base text-white opacity-[.65] truncate">
                      Facebook
                    </p>
                  </div>
                </li>
                <li
                  onClick={() => {
                    handleProviderChange("LinkedIn");
                  }}
                >
                  <div className="flex items-center gap-4 px-4 py-2 hover:bg-gray-600 cursor-pointer">
                    <Image
                      id="linkedin"
                      src="/linkedin_icon.png"
                      alt="LinkedIn"
                      width={16}
                      height={16}
                      draggable="false"
                    />
                    <p className="text-base text-white opacity-[.65] truncate">
                      LinkedIn
                    </p>
                  </div>
                </li>
                <li
                  onClick={() => {
                    handleProviderChange("Whatsapp");
                  }}
                >
                  <div className="flex items-center gap-4 px-4 py-2 hover:bg-gray-600 cursor-pointer">
                    <Image
                      id="whatsapp"
                      src="/whatsapp.png"
                      alt="Whatsapp"
                      width={16}
                      height={16}
                      draggable="false"
                    />
                    <p className="text-base text-white opacity-[.65] truncate">
                      Whatsapp
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full sm:w-[195px] relative">
            <button
              type="button"
              className="text-white w-full bg-transparent border-[1.4px] border-[#586171] border-solid font-normal opacity-[.65] rounded-lg text-lg px-6 py-2.5 justify-between inline-flex items-center"
              onClick={onShowAccountsDropdown}
            >
              <p className="w-[80%] text-left truncate">{selectedAccount}</p>
              <svg
                id="accounts_dropdown_icon"
                className="w-4 h-4 ml-2 transition-transform duration-200 ease-in-out"
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
              id="accounts_dropdown"
              className="relative top-0.5 sm:absolute sm:top-[52px] z-20 w-full bg-input-color hidden border-[1.4px] border-[#586171] border-solid rounded-lg shadow"
            >
              <ul className="py-2">
                <li
                  onClick={() => {
                    handleAccountChange("All Accounts");
                  }}
                >
                  <div className="flex items-center gap-4 px-4 py-2 hover:bg-gray-600 cursor-pointer">
                    <Image
                      id="bot"
                      src="/bot_icon.png"
                      alt="bot"
                      width={16}
                      height={16}
                      draggable="false"
                    />
                    <p className="text-base text-white opacity-[.65] truncate">
                      All Accounts
                    </p>
                  </div>
                </li>
                <li
                  onClick={() => {
                    handleAccountChange("user@gmail.com");
                  }}
                >
                  <div className="flex items-center gap-4 px-4 py-2 hover:bg-gray-600 cursor-pointer">
                    <Image
                      id="avatar"
                      src="/avatar.png"
                      alt="Avatar"
                      width={16}
                      height={16}
                      draggable="false"
                    />
                    <p className="text-base text-white opacity-[.65] truncate">
                      user@gmail.com
                    </p>
                  </div>
                </li>
                <li
                  onClick={() => {
                    handleAccountChange("OliviaRhye@Gmail.com");
                  }}
                >
                  <div className="flex items-center gap-4 px-4 py-2 hover:bg-gray-600 cursor-pointer">
                    <Image
                      id="avatar1"
                      src="/avatar1.png"
                      alt="Avatar1"
                      width={16}
                      height={16}
                      draggable="false"
                    />
                    <p className="text-base text-white opacity-[.65] truncate">
                      OliviaRhye@Gmail.com
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <Datepicker
            containerClassName="relative w-fit border-[1.4px] border-[#586171] border-solid rounded-lg"
            inputClassName="bg-transparent text-white placeholder:text-white font-normal opacity-[.65] rounded-lg text-lg px-6 py-2.5"
            placeholder={"Select date"}
            showShortcuts={true}
            value={value}
            onChange={handleValueChange}
          />
        </div>
        <div className="flex flex-wrap gap-2 items-center mt-5 rounded-2xl bg-input-color px-[54px] py-[45px]">
          <div className="mr-4 sm:mr-0">
            <p className="text-lg font-bold text-white mb-2">Revunue</p>
            <div className="flex gap-4 items-center">
              <p className="text-lg font-normal text-white opacity-[.65]">
                35$
              </p>
              <Image
                id="increase"
                src="/increase.png"
                alt="Increase"
                width={16}
                height={16}
                draggable="false"
              />
            </div>
          </div>
          <div className="w-px hidden sm:block h-[43px] bg-[#818181] mx-[5vw] xl:mx-[114px]"></div>
          <div className="text-center mr-4 sm:mr-0">
            <p className="text-lg font-bold text-white mb-2">Messages</p>
            <div className="flex gap-4 items-center">
              <p className="text-lg font-normal text-white opacity-[.65]">
                337
              </p>
              <Image
                id="decrease"
                src="/decrease.png"
                alt="Increase"
                width={16}
                height={16}
                draggable="false"
              />
            </div>
          </div>
          <div className="w-px hidden sm:block h-[43px] bg-[#818181] mx-[5vw] xl:mx-[114px]"></div>
          <div className="mr-4 sm:mr-0">
            <p className="text-lg font-bold text-white mb-2">
              Activated Providers
            </p>
            <div className="flex gap-4 items-center">
              <p className="text-lg font-normal text-white opacity-[.65]">7</p>
              <Image
                id="increase"
                src="/increase.png"
                alt="Increase"
                width={16}
                height={16}
                draggable="false"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row flex-wrap lg:flex-nowrap justify-between gap-5 items-center mt-5">
          <div className="base-1 lg:basis-2/3 w-full lg:w-auto rounded-2xl bg-input-color px-7 pt-12 pb-1">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
              <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full max-w-full flex-grow flex-1">
                    <h2 className="text-white text-lg font-bold">
                      Revenue over time
                    </h2>
                  </div>
                </div>
              </div>
              <div className="p-4 flex-auto">
                <div className="relative min-h-[200px] sm:min-h-[260px]">
                  <canvas id="line-chart"></canvas>
                </div>
              </div>
            </div>
          </div>
          <div className="base-1 lg:basis-1/3 w-full lg:w-auto rounded-2xl bg-input-color min-h-[420px] p-[33px]">
            <div className="flex flex-wrap gap-1.5 items-center">
              <p className="text-white text-base sm:text-lg font-bold">
                Messages by
              </p>
              <div className="relative">
                <div
                  className="text-[#7E79FF] bg-transparent cursor-pointer font-normal text-base sm:text-lg text-center inline-flex items-center"
                  onClick={onShowTypeDropdown}
                >
                  {selectedType}
                  <svg
                    id="type_dropdown_icon"
                    className="w-4 h-4 ml-2 transition-transform duration-200 ease-in-out"
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
                </div>
                <div
                  id="type_dropdown"
                  className="absolute top-[30px] z-20 w-full min-w-[150px] bg-input-color hidden border-[1.4px] border-[#586171] border-solid rounded-lg shadow"
                >
                  <ul className="py-2">
                    <li
                      onClick={() => {
                        handleTypeChange("Providers");
                      }}
                    >
                      <div className="px-4 py-2 hover:bg-gray-600 cursor-pointer">
                        <p className="text-base text-white opacity-[.65] truncate">
                          Providers
                        </p>
                      </div>
                    </li>
                    <li
                      onClick={() => {
                        handleTypeChange("Account");
                      }}
                    >
                      <div className="px-4 py-2 hover:bg-gray-600 cursor-pointer">
                        <p className="text-base text-white opacity-[.65] truncate">
                          Account
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-[25px]">
              <div className="flex justify-between items-center">
                <p className="text-[15px] font-normal text-white">LinkedIn</p>
                <p className="text-[15px] font-normal text-white opacity-[.65]">
                  +40% / 52
                </p>
              </div>
              <div className="w-full bg-[#28313F] rounded-full h-[7px] mt-[7px]">
                <div
                  className="bg-link-color h-[7px] rounded-full"
                  style={{ width: "80%" }}
                ></div>
              </div>
            </div>
            <div className="mt-[26px]">
              <div className="flex justify-between items-center">
                <p className="text-[15px] font-normal text-white">Gmail</p>
                <p className="text-[15px] font-normal text-white opacity-[.65]">
                  +25% / 22
                </p>
              </div>
              <div className="w-full bg-[#28313F] rounded-full h-[7px] mt-[7px]">
                <div
                  className="bg-link-color h-[7px] rounded-full"
                  style={{ width: "49%" }}
                ></div>
              </div>
            </div>
            <div className="mt-[26px]">
              <div className="flex justify-between items-center">
                <p className="text-[15px] font-normal text-white">Twitter</p>
                <p className="text-[15px] font-normal text-white opacity-[.65]">
                  +15% / 9
                </p>
              </div>
              <div className="w-full bg-[#28313F] rounded-full h-[7px] mt-[7px]">
                <div
                  className="bg-link-color h-[7px] rounded-full"
                  style={{ width: "24%" }}
                ></div>
              </div>
            </div>
            <div className="mt-[26px]">
              <div className="flex justify-between items-center">
                <p className="text-[15px] font-normal text-white">Facebook</p>
                <p className="text-[15px] font-normal text-white opacity-[.65]">
                  -5% / 9
                </p>
              </div>
              <div className="w-full bg-[#28313F] rounded-full h-[7px] mt-[7px]">
                <div
                  className="bg-link-color h-[7px] rounded-full"
                  style={{ width: "8%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
