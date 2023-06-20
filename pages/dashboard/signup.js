import { useEffect, useState } from "react";
import fetchJson from "../../lib/fetchJson";
import { useRouter } from "next/navigation";
import useUser from "../../lib/useUser";
import DashboardLayout from "./layout";
import Image from "next/image";
import { getAuth, signInWithPopup, GoogleAuthProvider, getIdToken } from 'firebase/auth'

export default function Signup() {
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const router = useRouter();
  const { mutateUser, user } = useUser({});

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user && user.isLoggedIn === true) {
      router.replace("/home");
    }
  }, [user, router]);

  const onSignup = async (e) => {
    if (email == "" || password == "") {
      alert("Please input at least email and password");
      return;
    }

    setIsLoading(true);
    try {
      const message = await fetchJson("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      alert(message);

      const _user = await fetchJson("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      mutateUser(_user);  

    } catch (err) {
      console.log(`[Signup Screen]: ${err}`);
      alert(`Error: Couldn't create an account`)
    }
    setIsLoading(false);
  };

  const onLogin = (e) => {
    router.replace("/dashboard/login");
  };

  const onGoogleLogin = async (e) => {
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        const user = result.user;
        const idToken = await getIdToken(user);

        try {
          debugger
          const _user = await fetchJson("/api/loginWithToken", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: idToken }),
          });
          mutateUser(_user);    
        }
        catch (err) {
          console.log(`[Login Screen]: ${err}`)
          alert(`Error: Couldn't create an account with google login`)
        }

      })
      .catch((err) => {
        alert(`Error: ${err.message}`);
      })
  }

  return (
    <div className="lg:w-1/2 sm:w-2/3 w-11/12 bg-black-gray p-8 rounded-3xl mx-auto mb-10 md:mb-0">
      <div className="flex justify-between items-center">
        <p className="text-white font-normal  text-base sm:text-xl apple-braille-font">
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
          className="bg-input-color text-white placeholder:text-white font-normal text-base rounded-lg block w-full px-6 py-2.5 mt-10 inter-font"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          id="email"
          className="bg-input-color text-white placeholder:text-white font-normal text-base rounded-lg block w-full px-6 py-2.5 mt-3.5 inter-font"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          id="password"
          className="bg-input-color text-white placeholder:text-white font-normal text-base rounded-lg block w-full px-6 py-2.5 mt-3.5 inter-font"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p className="mt-3.5 text-left text-[#9FA4AB] font-normal text-sm inter-font">
          Must be at least 8 characters.
        </p>
        <hr className="my-10 h-px border-t-0 bg-devider-color" />
        <button
          type="button"
          className="primary-button rounded-lg text-center text-white font-semibold text-base w-full py-2.5 inter-font"
          onClick={onSignup}
        >
          <div className="flex justify-center">
            { 
              isLoading && 
              <svg class="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>          
            }
            Get Started
          </div>
        </button>
        <button
          type="button"
          className="bg-white rounded-lg inline-flex items-center justify-center w-full py-2.5 mt-4"
          onClick={onGoogleLogin}
        >
          <Image
            className="w-5 h-5"
            width={0}
            height={0}
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google logo"
          />
          <span className="text-[#344054] font-semibold text-base ml-3 inter-font">
            Sign up with Google
          </span>
        </button>
        <div className="mt-10 flex justify-center">
          <p className="text-[#A7A7A7] font-normal text-sm inter-font">
            Already have an account?
          </p>
          <button
            className="ml-3 text-link-color font-normal text-sm inter-font"
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
