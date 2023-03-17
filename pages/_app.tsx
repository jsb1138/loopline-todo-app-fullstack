import { Provider } from "react-redux";
import { store } from "@/redux/store";
// import { PersistGate } from "redux-persist/integration/react";
// import { persistStore } from "redux-persist";

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { saveState } from "@/utils/local-storage";

import Header from "@/features/header/Header";

store.subscribe(() => {
  saveState(store.getState());
});

// let persistor = persistStore(store);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      {/* <PersistGate
        loading={<div className="w100 h100 cf">LOADING...</div>}
        persistor={persistor}
      > */}
      <Header />
      <Component {...pageProps} />
      {/* </PersistGate> */}
    </Provider>
  );
}
