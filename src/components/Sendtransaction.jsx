import React, { useState, useEffect } from 'react';
import { useEstimateGas, useSendTransaction } from 'wagmi';
import { parseEther } from 'viem';

const Sendtransaction = () => {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { failureReason, data } = useEstimateGas({
    to: address,
    value: amount ? parseEther(amount) : undefined, // Ensure value is undefined if amount is empty
  });

  const { sendTransaction } = useSendTransaction();

  useEffect(() => {
    if (address && amount) {
      console.log('Address:', address);
      console.log('Amount:', amount);
      console.log('Estimated Gas:', data); // Log the estimated gas
    }
  }, [address, amount, data]);

  useEffect(() => {
    if (failureReason?.cause?.cause?.code === -32000) {
      setErrorMessage(failureReason?.cause?.cause?.details);
    } else {
      setErrorMessage(''); // Clear error message if the error code is not -32000
    }
  }, [failureReason]);

  return (
    <form>
      <div>
        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>
      </div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Show error message if it exists */}
      <button
        type="button"
        disabled={!Boolean(data)}
        style={{ color: 'black', margin: '10px', backgroundColor: 'lightblue' }} // Added background color
        onClick={() => {
          if (data) {
            sendTransaction({
              gas: data,
              to: address, // Use the address from the input
              value: parseEther(amount), // Use the amount from the input
            });
          }
        }}
      >
        Send transaction
      </button>
    </form>
  );
};

export default Sendtransaction;