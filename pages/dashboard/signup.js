import { useEffect, useState } from "react";
import fetchJson from "../../lib/fetchJson";
import { useRouter } from "next/navigation";
import useUser from "../../lib/useUser";
import DashboardLayout from "./layout";
import Image from "next/image";

export default function Signup() {
  const router = useRouter();
  const { mutateUser, user } = useUser({});

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user && user.isLoggedIn === true) {
      router.replace("/home");
    }
  }, [user, router]);

  const onSignup = async (e) => {
    debugger
    if (email == "" || password == "") {
      alert("Please input at least email and password");
      return;
    }

    try {
      const message = await fetchJson("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      alert(message);
      onLogin();
    } catch (err) {
      console.log(`[Signup Screen]: ${err}`);
    }
  };

  const onLogin = (e) => {
    router.replace("/dashboard/login");
  };
  return (
    <div className="lg:w-1/2 sm:w-2/3 w-11/12 bg-black-gray p-8 rounded-3xl mx-auto mb-10 md:mb-0">
      <div className="flex justify-between items-center">
        <p className="text-white font-normal  text-base sm:text-xl">
          Create an account
        </p>
        <svg
          className="h-5 w-5 text-white cursor-pointer"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </div>
      <div>
        <input
          type="text"
          id="name"
          className="bg-input-color text-white font-normal text-base rounded-lg block w-full px-6 py-2.5 mt-10"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          id="email"
          className="bg-input-color text-white font-normal text-base rounded-lg block w-full px-6 py-2.5 mt-3.5"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          id="password"
          className="bg-input-color text-white font-normal text-base rounded-lg block w-full px-6 py-2.5 mt-3.5"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p className="mt-3.5 text-left text-neutral-400 font-normal text-sm">
          Must be at least 8 characters.
        </p>
        <hr className="my-10 h-px border-t-0 bg-devider-color" />
        <button
          type="button"
          className="primary-button rounded-lg text-center text-white font-semibold text-base w-full py-2.5"
          onClick={onSignup}
        >
          Get Started
        </button>
        <button
          type="button"
          className="bg-white rounded-lg inline-flex items-center justify-center w-full py-2.5 mt-4"
        >
          <Image
            className="w-5 h-5"
            width={0}
            height={0}
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google logo"
          />
          <span className="text-[#344054] font-semibold text-base ml-3">
            Sign up with Google
          </span>
        </button>
        <div className="mt-10 flex justify-center">
          <p className="text-neutral-400 font-normal text-sm">
            Already have an account?
          </p>
          <button
            className="ml-3 text-link-color font-normal text-sm"
            onClick={onLogin}
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}

Signup.PageLayout = DashboardLayout;
