import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import SelectedTodosContext from "@/context/selected-todos-context";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

import "@/styles/globals.css";
import type { AppProps } from "next/app";

import Header from "@/features/header/Header";

export default function App({ Component, pageProps }: AppProps) {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <QueryClientProvider client={queryClient}>
      <SelectedTodosContext.Provider value={{ selected, setSelected }}>
        <Header />
        <Component {...pageProps} />
      </SelectedTodosContext.Provider>
    </QueryClientProvider>
  );
}
