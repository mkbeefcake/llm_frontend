import { useEffect } from "react";
import fetchJson from "../../lib/fetchJson";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    const async_task = async () => {
      const response = await fetchJson("/api/logout");
      await new Promise(f => setTimeout(f, 2000));
      router.replace("/home");
    };
    async_task();
  }, [router]);

  return (
    <div className="flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <div className="shadow w-full rounded-lg divide-y divide-gray-200 bg-black-gray">
          <div className="px-5 py-7 text-center">
            <label className="font-semibold text-sm text-gray-600 pb-1 block inter-font">
              Logging out ....{" "}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
