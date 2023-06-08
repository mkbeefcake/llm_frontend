import DashboardLayout from "./layout";

export default function Signup() {
    return (
      <div className="flex flex-col justify-center sm:py-12">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <h1 className="font-bold text-center text-2xl mb-5">Create an account</h1>  
          <div className="panel min-w-[50%] shadow w-full rounded-lg divide-y divide-gray-200 px-5">
            <div className="py-7">
              <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
              <input type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" required/>
              <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
              <input type="password" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" required/>
              <label className="font-semibold text-sm text-gray-600 pb-1 block">Confirm Password</label>
              <input type="password" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" required/>
            </div>
            <div className="py-5">
              <button type="button" className="mt-5 main-button transition duration-200 focus:shadow-sm focus:ring-4 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                  <span className="inline-block mr-2">Get Started</span>
              </button>
              <div className="grid grid-cols-2 gap-1 place-items-center">
                <div className="text-center sm:text-left whitespace-nowrap">
                  <label className="font-semibold text-sm text-gray-600 pb-1 block">Already have an account?</label>
                </div>
                <div className="text-center sm:text-right whitespace-nowrap">
                  <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg main-color">
                      <span className="inline-block ml-1">Sign in</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
  )
}

Signup.PageLayout = DashboardLayout;