import { http, createConfig } from '@wagmi/core';
import * as Wagmichains from 'wagmi/chains';
import { useState, useMemo } from 'react';
import Home from './components/Home';
import './App.css';

function App() {
  const networks = ['mainnet', 'sepolia','holesky'];
  const [activeNetwork, setActiveNetwork] = useState(networks[0]);

  const config = useMemo(() => {
    const selectedChain = Wagmichains[activeNetwork];
    return createConfig({
      chains: [selectedChain],
      transports: {
        [selectedChain.id]: http(),
      },
    });
  }, [activeNetwork]);

  const handleNetworkChange = (event) => {
    setActiveNetwork(event.target.value);
  };

  return (
    <div>
      <h2>Select Network</h2>
      <select onChange={handleNetworkChange} value={activeNetwork}>
        {networks.map((network) => (
          <option key={network} value={network}>
            {network}
          </option>
        ))}
      </select>
      {activeNetwork && <p>Active Network: {activeNetwork}</p>}
      <Home config={config} />
    </div>
  );
}

export default App;
