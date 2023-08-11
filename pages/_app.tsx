import { SWRConfig } from "swr";
import "../global.css";
import Header from "../components/header";

export default function App({ Component, pageProps }: any) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
        refreshInterval: 2000,
      }}
    >
      <div className="w-full max-w-xl mx-auto">
        <Header />
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}
