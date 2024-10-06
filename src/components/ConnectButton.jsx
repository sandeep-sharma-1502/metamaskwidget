// src/ConnectButton.js
import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useModal } from 'connectkit';
import SendTransaction from './Sendtransaction'; // Uncommented to use SendTransaction

function ConnectButton() {
  const { isConnected, chain } = useAccount();
  const { open, setOpen } = useModal();
  const { disconnect }= useDisconnect()



  if (isConnected) {
    return (
      <div>
        <h3 style={{ color: 'green' }}>Connected</h3>
        <SendTransaction /> {/* Render SendTransaction when connected */}
        <button onClick={disconnect} style={{ color: 'red', backgroundColor: 'lightgray', border: '2px solid darkgray' }}>Disconnect</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => setOpen(true)} style={{ border: '2px solid black' }}>connect To wallet</button>
    </div>
  );
}

export default ConnectButton;
