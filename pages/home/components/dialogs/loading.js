import { useContext } from "react"
import { HomeContext } from "../../../../context/home/context"

export default function LoadingDialog() {
  const { showLoadingDialog } = useContext(HomeContext)

  return (
    <div className="relative">
      { 
        showLoadingDialog && 
          <div className="fixed z-40 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              ></span>
              <div
                className="inline-block align-bottom bg-gray-900 rounded-xl text-left overflow-hidden transform transition-all sm:my-2 sm:align-middle w-[200px] p-4"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div className="flex justify-center text-white">
                  <svg class="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                  </svg>          
                  Loading....
                </div>              
              </div>
              
            </div>
          </div>
      }
    </div>
  )

}