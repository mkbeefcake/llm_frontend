import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import ProviderLink from "./components/providerlink";
import AddProviderDialog from "./components/dialogs/provideradd";
import { HomeContext } from "../../context/home/context/context";
import AddProviderNameDialog from "./components/dialogs/providername";
import { useRouter } from "next/navigation";
  
export default function Sidebar() {

    const [ providers, setProviders ] = useState([])
    const { myProviders, selectedProvider, setShowAddProviderDialog } = useContext(HomeContext);

    const router = useRouter();

    useEffect(() => {
      let myInfo = []
      
      myProviders?.providers?.map((provider, i) => {
        if (myProviders.my_providers && myProviders.my_providers[provider?.provider]) {
          provider.count = Object.keys(myProviders.my_providers[provider?.provider]).length;
        }

        myInfo.push(provider);
      });

      setProviders(myInfo)
    
    }, [myProviders])

    const onLogout = (e) => {
        router.replace('/dashboard/logout');
    }

    return (
        <>
            <nav
                id="sidenav-8"
                class="left-0 h-full -translate-x-full overflow-hidden data-[te-sidenav-hidden='false']:translate-x-0 "
                data-te-sidenav-init
                data-te-sidenav-hidden="false"
                data-te-sidenav-position="absolute"
                data-te-sidenav-accordion="true">
                <a
                    class="mb-3 flex items-center justify-center py-6 outline-none"
                    href="#!"
                    data-te-ripple-init
                    data-te-ripple-color="primary">
                    <Image
                        id="logo"
                        src="/icons8-bot-64.png"
                        alt="Logo"
                        width={50}
                        height={50}
                        draggable="false" />
                    <span></span>
                </a>
                <ul
                    class="relative m-0 list-none px-[0.2rem] pb-12"
                    data-te-sidenav-menu-ref>
                    <li class="relative pt-4">
                        <span
                            class="li-span px-6 py-4 text-gray-600 dark:text-gray-400"
                            >Navigation</span>
                        <a
                            class="mt-4 flex cursor-pointer items-center truncate rounded-[5px] px-6 py-[0.45rem] text-[0.85rem] text-gray-600 outline-none transition duration-300 ease-linear  data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                            data-te-sidenav-link-ref>
                            <span class="mr-4 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
                                <Image
                                    id="dashboard_icon"
                                    src="/dashboard_icon.png"
                                    alt="Dashboard"
                                    width={18}
                                    height={18}
                                    draggable="false" />
                            </span>
                            <span className="li-item">Dashboard</span>
                        </a>
                    </li>
                    <li class="relative">
                        <a
                            class="flex cursor-pointer items-center truncate rounded-[5px] px-6 py-[0.45rem] text-[0.85rem] text-gray-600 outline-none transition duration-300 ease-linear  data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                            data-te-sidenav-link-ref>
                            <span
                            class="mr-4 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
                                <Image
                                    id="billing_icon"
                                    src="/billing_icon.png"
                                    alt="Billing"
                                    width={18}
                                    height={18}
                                    draggable="false" />                            
                            </span>
                            <span className="li-item">Billing</span>
                        </a>
                    </li>
                    <>
                    {
                        providers.map((provider, i) => (
                            <ProviderLink key={i} provider={provider} count={provider.count} isFirst={i} />
                        ))
                    }
                    </>
                    <li class={`relative`}>
                    <a
                        class={`flex cursor-pointer items-center truncate rounded-[5px] px-6 py-[0.45rem] text-[0.85rem] text-gray-600 outline-none transition duration-300 ease-linear  data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10`}
                        data-te-sidenav-link-ref onClick={(e) => setShowAddProviderDialog(true)}>
                        <span class="mr-4 [&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
                            <Image
                                id='addprovider_icon'
                                src="/addprovider_icon.png"
                                alt='addprovider'
                                width={18}
                                height={18}
                                draggable="false" />
                        </span>
                        <span className="li-item">Add provider</span>
                    </a>
                </li>

                </ul>
                <div class="flex items-center" style={{position:"absolute", bottom:0, height:150, paddingLeft: 20,}}>
                    <Image                    
                        className="rounded-full"
                        id="addprovider_icon"
                        src="/icons8-bot-64.png"
                        alt="Profile"
                        width={40}
                        height={40}
                        draggable="false" />
                    <span class="ml-2 font-medium text-gray-900">John Doe</span>
                    <button className="primary-button ml-6 pt-2 pr-4 pb-2 pl-4 font-medium transition-all duration-200 rounded-lg" onClick={onLogout} >Log Out</button>
                </div>
            </nav>
            <AddProviderDialog providers={providers} />
            <AddProviderNameDialog provider={selectedProvider} />
       </>
    )
}