import "../styles/globals.css";

import type { ReactElement, ReactNode } from "react";
import { RecoilRoot } from "recoil";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth";
import "@rainbow-me/rainbowkit/styles.css";

import { SWRConfig } from "swr";
import axios from "axios";

import { WagmiConfig, createClient, configureChains } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

import DefaultLayout from "../layouts/DefaultLayout";
import { bsc, bscChains, bscTest } from "../utils/constants/chains";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

///////////////////////////////////
// Layout
export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  pageProps: any;
};
///////////////////////////////////

///////////////////////////////////
// Wagmi

const { chains, provider, webSocketProvider } = configureChains(
  [bsc, bscTest],
  [
    ...bscChains.map((bscChain) =>
      jsonRpcProvider({
        rpc: (chain) => {
          if (chain.id !== bscChain.id) return null;
          return { http: chain.rpcUrls.default, webSocket: chain.rpcUrls.wss };
        },
      })
    ),
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id !== bscTest.id) return null;
        return { http: chain.rpcUrls.default };
      },
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Altverse Event",
  chains,
});

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

// const GoogleAnalytics = ({ gaId }: { gaId: string }) => (
//   <>
//     <Script
//       src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
//       strategy="afterInteractive"
//     />
//     <Script id="google-analytics" strategy="afterInteractive">
//       {`window.dataLayer = window.dataLayer || [];
// function gtag(){dataLayer.push(arguments);}
// gtag('js', new Date());

// gtag('config', '${gaId}');`}
//     </Script>
//   </>
// );

const TitleHeader = ({}: {}) => (
  <>
    <Head>
      <title>Altverse - Web3 freelance marketplace</title>
    </Head>
  </>
);

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <>
      <TitleHeader />
      <SWRConfig
        value={{
          fetcher: (url: string) => axios.get(url).then(({ data }) => data),
        }}
      >
        <RecoilRoot>
          <WagmiConfig client={client}>
            <SessionProvider session={pageProps.session} refetchInterval={0}>
              <RainbowKitSiweNextAuthProvider
                getSiweMessageOptions={() => ({
                  statement: "Sign in to Altverse Events",
                })}
              >
                <RainbowKitProvider
                  chains={chains}
                  theme={darkTheme({
                    accentColor: "white",
                    accentColorForeground: "#00D7F4",
                  })}
                >
                  {getLayout(<Component {...pageProps} />)}
                  <Toaster />
                  {/* <Snowfall color={"gold"} speed={[0.1, 0.5]} wind={[0, 0]} snowflakeCount={50} />  */}
                </RainbowKitProvider>
              </RainbowKitSiweNextAuthProvider>
            </SessionProvider>
          </WagmiConfig>
        </RecoilRoot>
      </SWRConfig>
      {/* <GoogleAnalytics gaId="G-862KXVFT2K" /> */}
    </>
  );
}

export default MyApp;
