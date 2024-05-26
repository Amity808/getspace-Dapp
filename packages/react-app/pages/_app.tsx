import {
    RainbowKitProvider,
    connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import "react-toastify/dist/ReactToastify.css";
import { injectedWallet } from "@rainbow-me/rainbowkit/wallets";
import "@rainbow-me/rainbowkit/styles.css";
import { ToastContainer } from 'react-toastify';
import type { AppProps } from "next/app";
import { http, WagmiProvider, createConfig } from "wagmi";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { celo, celoAlfajores } from "wagmi/chains";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const connectors = connectorsForWallets(
    [
        {
            groupName: "Recommended",
            wallets: [injectedWallet],
        },
    ],
    {
        appName: "Celo Composer",
        projectId: "044601f65212332475a09bc14ceb3c34",
    }
);

const config = createConfig({
    connectors,
    chains: [celo, celoAlfajores],
    transports: {
        [celoAlfajores.id]: http(),
        [celo.id]: http(),
    },
});

const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}

export default App;
