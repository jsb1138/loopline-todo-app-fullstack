import { Provider } from "react-redux";
import { store } from "@/redux/store";

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { saveState } from "@/utils/local-storage";

import Header from "@/features/header/Header";

store.subscribe(() => {
  saveState(store.getState());
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Header />
      <Component {...pageProps} />
    </Provider>
  );
}
