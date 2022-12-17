import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import 'react-toastify/dist/ReactToastify.css';
import { store } from '../Features/store';
import { Provider } from 'react-redux';

import { ToastContainer } from 'react-toastify';
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <ToastContainer />
    </Provider>
  );
}
