import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Datepicker from "react-tailwindcss-datepicker";
import Chart from "chart.js";
import HomeLayout from "layout/layout";
import { HomeContext } from "../../context/home/context/context";

const homeGradientStyle = {
  background:
    "conic-gradient(from -30.05deg at 50% 50%, #4D4A8B 0deg, #63419F 116.25deg, #4D4A8B 360deg)",
  filter: "blur(100px)",
};

export default function Home() {
  const [providers, setProviders] = useState([]);
  const { myProviders, setShowAddProviderDialog } = useContext(HomeContext);
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });

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

  useEffect(() => {
    let myInfo = [];

    myProviders?.providers?.map((provider, i) => {
      let identifiers = {};
      let statusBots = {};
      if (myProviders.my_providers[provider?.provider]) {
        identifiers = myProviders.my_providers[provider?.provider];
      }

      if (myProviders.status_autobot[provider?.provider]) {
        statusBots = myProviders.status_autobot[provider?.provider];
      }

      myInfo.push({ provider, identifiers, statusBots });
    });

    setProviders(myInfo);
  }, [myProviders]);

  return (
    <div className="w-full h-screen relative overflow-auto content-center bg-background-color">
      <div
        className="absolute w-[43vw] h-[43vw] top-[-5vw] right-[42vw] opacity-[.15] z-10"
        style={homeGradientStyle}
      ></div>
      <div className="px-3 pb-5 pt-24 sm:px-20 sm:pt-28">
        <div className="flex flex-wrap gap-2 justify-between items-center mb-7 relative z-20">
          <div>
            <p className="text-white text-2xl font-bold">Dashboard</p>
            <p className="text-white text-sm font-normal opacity-[.65] mt-1">
              Analytics about all automated providers
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 items-center mt-7 relative z-20">
          <div>
            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="text-white bg-transparent border-[1.4px] border-[#586171] border-solid font-normal opacity-[.65] rounded-lg text-lg px-6 py-2.5 text-center inline-flex items-center"
              type="button"
            >
              All Providers
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
              id="dropdown"
              className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Settings
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="text-white bg-transparent border-[1.4px] border-[#586171] border-solid font-normal opacity-[.65] rounded-lg text-lg px-6 py-2.5 text-center inline-flex items-center"
              type="button"
            >
              All Accounts
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
              id="dropdown"
              className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Settings
                  </a>
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
          <div>
            <p className="text-lg font-bold text-white">Revunue</p>
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
          <div className="w-px h-[43px] bg-[#818181] mx-[5vw] xl:mx-[114px]"></div>
          <div className="text-center">
            <p className="text-lg font-bold text-white">Messages</p>
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
          <div className="w-px h-[43px] bg-[#818181] mx-[5vw] xl:mx-[114px]"></div>
          <div>
            <p className="text-lg font-bold text-white">Activated Providers</p>
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
            <div className="flex flex-wrap gap-1 justify-between items-center">
              <p className="text-white text-base sm:text-lg font-bold">
                Messages by
              </p>
              <div>
                <button
                  id="dropdownDefaultButton"
                  data-dropdown-toggle="dropdown"
                  className="text-[#7E79FF] bg-transparent font-normal text-base sm:text-lg text-center inline-flex items-center"
                  type="button"
                >
                  Providers
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
                  id="dropdown"
                  className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Settings
                      </a>
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

Home.PageLayout = HomeLayout;
