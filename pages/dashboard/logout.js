import { useEffect } from "react"
import fetchJson from "../../lib/fetchJson"
import { useRouter } from "next/navigation"

export default function Logout() {

    const router = useRouter();

    useEffect(()=> {
        const async_task = async() => {
            const response = await fetchJson('/api/logout');
            router.replace('/dashboard/login')
        }
        async_task()
    }, [router])

    return (
      <div className="flex flex-col justify-center sm:py-12">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <h1 className="font-bold text-center text-2xl mb-5">Neo ChatBot</h1>  
          <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            <div className="px-5 py-7 text-center">
              <label className="font-semibold text-sm text-gray-600 pb-1 block">Logging out .... </label>
            </div>
          </div>
        </div>
      </div>

  )
}
  