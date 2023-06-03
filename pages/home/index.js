import { useRouter } from 'next/navigation';
import useUser from '../../lib/useUser'
import { useEffect, useState } from 'react';
import ProviderCard from '../components/providercard';
import fetchJson from '../../lib/fetchJson';

export default function Home() {

  const router = useRouter();
  const { user } = useUser({});

  const [mine, setMine] = useState([]);

  useEffect(() => {    
    if (user === undefined || user.isLoggedIn === false) {
      router.replace('/dashboard/login')
    }  
  }, [user, router])

  useEffect(() => {
    getMyProviders()
  }, [])

  const getMyProviders = async () => {
    try {
      let myInfo = []

      const response = await fetchJson('/api/getMyProviders');
      console.log(`Response: ${JSON.stringify(response)}`);

      response.providers.map((provider, i) => {
       
        provider.isActivated = false;
        provider.isStartedBot = false;

        if (response.my_providers) {
          for (let index = 0; index < response.my_providers.length; index++) {
            if (provider.provider == response.my_providers[index]) {
              provider.isActivated = true;
            }
          }            
        }

        if (response.status_autobot && response.status_autobot[provider.provider] && response.status_autobot[provider.provider] == true) {
          provider.isStartedBot = true;
        }

        myInfo.push(provider);
      });

      setMine(myInfo);
    }
    catch (err) {
      console.log(`Home Screen: ${err}`)
    }
  }

  const onUpdateParent = function() {
    getMyProviders();
  }

  return (
    <div>
      <div className="bg-white pt-12 pr-0 pb-12 pl-0 mt-0 mr-auto mb-0 ml-auto sm:py-16 lg:py-20">
        <div className="pt-0 pr-4 pb-0 pl-4 mt-0 mr-auto mb-0 ml-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="pt-0 pr-4 pb-0 pl-4 mt-0 mr-auto mb-0 ml-auto max-w-4xl sm:px-6 lg:px-8">
            <div className="pt-0 pr-4 pb-0 pl-4 mt-0 mr-auto mb-0 ml-auto sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-xl font-bold text-gray-900">Providers</p>
                <p className="text-sm mt-1 mr-0 mb-0 ml-0 font-semi-bold text-gray-500">Your current automated providers</p>
              </div>
              <div className="mt-4 mr-0 mb-0 ml-0 sm:mt-0">
                <p className="sr-only">Search Position</p>
                <div className="relative">
                  <div className="flex items-center pt-0 pr-0 pb-0 pl-3 absolute inset-y-0 left-0 pointer-events-none">
                    <p>
                      <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewbox="0 0 24 24"
                          stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21
                          21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                    </p>
                  </div>
                  <input placeholder="Search Positions " type="search" className="border block pt-2 pr-0 pb-2 pl-10 w-full py-2
                      pl-10 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"/>
                </div>
              </div>
            </div>
            <div className="shadow-xl mt-8 mr-0 mb-0 ml-0 pt-4 pr-10 pb-4 pl-10 flow-root rounded-lg sm:py-2">
              <div className="pt--10 pr-0 pb-10 pl-0">
                {
                  mine.map((provider, i) => (
                    <ProviderCard key={i} provider={provider} iconUrl="icons8-bot-64.png" onUpdate={onUpdateParent} />
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}