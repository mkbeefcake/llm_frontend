import Link from "next/link";

export default function DashboardLayout({ children }) {
    return (
      <div className="w-full min-h-screen grid grid-cols-1 content-center">
        <div className="flex flex-row items-center justify-content">
            <div className="flex flex-col items-center ml-20 lg:items-start w-full max-w-xl lg:w-1/2 text-center lg:text-left z-30">
                <h2 style={{ color: '#9C98FF' }} className="font-black text-2xl sm:text-4xl leading-tight relative mb-4 xl:mb-8">ChatAutomation</h2>
                <h1 className="text-white-900 font-black text-3xl sm:text-6xl leading-tight relative mb-4 xl:mb-8">Here is the slogan</h1>
                <p className="text-base sm:text-lg xl:text-xl text-gray-300 mb-8 pr-0 lg:pr-20">Here is the web tool description. Here is the web tool description</p>
                <Link href="/dashboard/login" className="primary-button mt-0 sm:mt-1 px-8 py-4 rounded-md fold-bold text-base shadow-xl text-white border-t w-auto font-bold relative self-start inline-block lg:mx-0 mx-auto">Log in</Link>
            </div>
            <div className="flex flex-col items-center h-full w-full lg:w-1/2 ms:pl-10 relative z-50">
              { children }
            </div>
        </div>
      </div>
    )
  }
  