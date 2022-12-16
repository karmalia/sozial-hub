import '../styles/globals.scss';
import type { AppProps } from 'next/app';

import { store } from '../Features/store';
import { Provider } from 'react-redux';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
