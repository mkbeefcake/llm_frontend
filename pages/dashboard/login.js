import { useEffect, useState } from "react";
import fetchJson from "../../lib/fetchJson";
import { useRouter } from 'next/navigation';
import useUser from "../../lib/useUser";
import DashboardLayout from "./layout";

export default function Login() {

  const router = useRouter();
  const { mutateUser, user } = useUser({});

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user && user.isLoggedIn === true) {
      router.replace('/home')
    }

  }, [user, router])

  const onLogin = async (e) => {

    if (email == '' || password == '') {
      alert('Please input email and password')
      return;
    }

    try {
      const _user = await fetchJson('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password })
      });
      mutateUser(_user);
    }
    catch(err) {
      console.log(`[Login Screen]: ${err}`)
    }  
  }

  const onSignup = (e) => {
    router.replace('/dashboard/signup')
  }

  return (
    <div className="flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-2xl mb-5">Log in to your account</h1>  
        <div className="panel shadow w-full rounded-lg divide-y divide-gray-200 px-5">
          <div className="py-7">
            <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
            <input type="text" className="rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" value={email} onChange={e => setEmail(e.target.value)} required/>
            <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
            <input type="password" className="rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" value={password} onChange={e => setPassword(e.target.value)} required/>
          </div>
          <div className="py-5">
            <button type="button" className="mt-5 main-button transition duration-200 focus:shadow-sm focus:ring-4 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block" onClick={onLogin}>
                <span className="inline-block mr-2">Get Started</span>
            </button>
            <div className="grid grid-cols-2 gap-1">
              <div className="text-center sm:text-left whitespace-nowrap">
                <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg main-color">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-top">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                    </svg>
                    <span className="inline-block ml-1">Forgot Password</span>
                </button>
              </div>
              <div className="text-center sm:text-right whitespace-nowrap">
                <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg main-color" onClick={onSignup}>
                    <span className="inline-block ml-1">Sign Up</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

Login.PageLayout = DashboardLayout;