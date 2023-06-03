import DefaultLayout from '../components/layout'
 
export default function Page() {
  return (
    <div className="flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-2xl mb-5">Neo ChatBot</h1>  
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <div className="px-5 py-7 text-center">
            <label className="font-semibold text-sm text-gray-600 pb-1 block">This is Landing page for Neo Chatbot</label>
          </div>
        </div>
      </div>
    </div>
  )
}
 
Page.getLayout = function getLayout(page) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}