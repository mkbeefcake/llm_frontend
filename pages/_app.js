import './globals.css'

import DefaultLayout from './components/layout';
 
export default function MyApp({ Component, pageProps }) {
  return (
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
  );
}