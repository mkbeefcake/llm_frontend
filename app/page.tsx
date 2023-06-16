import Image from "next/image";
import Link from "next/link";

const smallGradientStyle = {
  background:
    "conic-gradient(from -30.05deg at 50% 50%, #4D4A8B 0deg, #63419F 116.25deg, #4D4A8B 360deg)",
  filter: "blur(100px)",
};

const bigGradientStyle = {
  background:
    "conic-gradient(from 179.95deg at 50% 50%, #43416B 0deg, #BF8796 247.5deg, #43416B 360deg)",
  filter: "blur(200px)",
};

export default function Home() {
  return (
    <div className="w-full h-screen grid grid-cols-1 relative overflow-hidden content-center bg-background-color">
      <div
        className="absolute w-[36vw] h-[36vw] top-[6.6vw] left-[15vw] opacity-[.35] z-10"
        style={smallGradientStyle}
      ></div>
      <div
        className="absolute w-[56vw] h-[56vw] top-[17vw] left-[23vw] opacity-75 z-10"
        style={bigGradientStyle}
      ></div>
      <div className="flex flex-wrap md:flex-nowrap items-center justify-content z-20">
        <div className="basis-[100%] md:basis-1/3 md:ml-[10vw] text-center md:text-left">
          <h2 className="font-normal text-base mb-3 text-[#9C98FF]">
            ChatAutomation
          </h2>
          <h1 className="text-white font-normal text-xl sm:text-[32px] mb-1.5">
            Here is the slogan
          </h1>
          <p className="text-white font-normal text-base mx-3 sm:mx-0">
            Here is the web tool description. Here is the web tool description
          </p>
          <Link
            href="/dashboard/login"
            className="primary-button block w-[132px] my-8 mx-auto md:mx-0 px-10 py-3.5 rounded-lg text-center text-white font-normal text-base"
          >
            Log in
          </Link>
        </div>
        <div className="basis-[100%] md:basis-2/3 text-center md:text-left">
          <Image
            src="homepage.svg"
            className="w-[72vw] mt-2 md:ml-[8vw] rounded-xl sm:rounded-3xl mx-auto"
            width={0}
            height={0}
            alt="mainpage screen"
          />
        </div>
      </div>
    </div>
  );
}
