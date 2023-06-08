import '../globals.css'

// import DefaultLayout from './components/layout';
import HomeLayout from './home/layout';
import { SWRConfig } from 'swr'; 
import fetchJSON from '../lib/fetchJson'

export default function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig value={{
      fetcher: fetchJSON,
      onError: (err) => {
        console.error(`[_APP]: SWR ISSUE: ${err}`)
      }
    }}>
      { Component.PageLayout ? (
        <Component.PageLayout>
          <Component {...pageProps} />
        </Component.PageLayout>
      ) : (
        <HomeLayout>
          <Component {...pageProps} />
        </HomeLayout>
      )}

    </SWRConfig>
  );
}