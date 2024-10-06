
import { WagmiProvider } from 'wagmi'
import { ConnectKitProvider } from "connectkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ConnectButton from './ConnectButton';
import React, { useEffect, useState } from 'react';

const queryClient = new QueryClient();

function Home({config}) {

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>
          <ConnectButton/>
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default Home;
