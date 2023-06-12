import { useContext, useEffect, useState } from 'react';
import HomeLayout from './layout';
import ProviderPanel from './components/panels/providerpanel';
import { HomeContext } from '../../context/home/context/context'

export default function Home() {

  const [providers, setProviders] = useState([])
  const { myProviders } = useContext(HomeContext);

  useEffect(() => {
    let myInfo = []
    
    myProviders?.providers?.map((provider, i) => {
      let identifiers = {}
      let statusBots = {}
      if (myProviders.my_providers[provider?.provider]) {
        identifiers = myProviders.my_providers[provider?.provider];
      }

      if (myProviders.status_autobot[provider?.provider]) {
        statusBots = myProviders.status_autobot[provider?.provider]
      }

      myInfo.push({provider, identifiers, statusBots});
    });

    setProviders(myInfo);

  }, [myProviders])

  return (
    <div>
      <div className="pt-12 pr-0 pb-12 pl-0 mt-0 mr-auto mb-0 ml-auto sm:py-16 lg:py-20">
        <div className="pt-0 pr-4 pb-0 pl-4 mt-0 mr-auto mb-0 ml-auto max-w-8xl sm:px-6 lg:px-8">
          <div className="pt-0 pr-4 pb-0 pl-4 mt-0 mr-auto mb-0 ml-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="pt-0 pr-4 pb-0 pl-4 mt-0 mr-auto mb-0 ml-auto sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-xl font-bold text-gray-200">Providers</p>
                <p className="text-sm mt-1 mr-0 mb-0 ml-0 font-semi-bold text-gray-400">Your current automated providers</p>
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
                  {/* <input placeholder="Search Positions " type="search" className="block pt-2 pr-0 pb-2 pl-10 w-full py-2
                      pl-10 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"/> */}
                </div>
              </div>
            </div>
            <div className="pt-10 pr-0 pb-10 pl-0">
              {
                providers.map(({provider, identifiers, statusBots}, i) => (
                  <ProviderPanel key={i} provider={provider} identifiers={identifiers} statusBots={statusBots}/>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Home.PageLayout = HomeLayout