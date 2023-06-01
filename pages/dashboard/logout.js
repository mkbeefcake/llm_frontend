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
    }, [])

    return (
      <div class="flex flex-col justify-center sm:py-12">
        <div class="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <h1 class="font-bold text-center text-2xl mb-5">Neo ChatBot</h1>  
          <div class="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            <div class="px-5 py-7 text-center">
              <label class="font-semibold text-sm text-gray-600 pb-1 block">Logging out .... </label>
            </div>
          </div>
        </div>
      </div>

  )
}
  