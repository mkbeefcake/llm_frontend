import './globals.css'

import DefaultLayout from './components/layout';
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
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </SWRConfig>
  );
}