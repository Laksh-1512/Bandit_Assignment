import React, { useState } from 'react';


const MainContainer = () => {
  const [RecipientAddress, setRecipientAddress] = useState("");
  const [MyAddress, setMyAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const handleConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setMyAddress(accounts[0]);
      } catch (error) {
        setError('Could not connect your Account');
      }
    } else {
      setError('Download MetaMask chrome extension');
    }
  };

  const handleTransfer = async () => {
    if (!MyAddress) {
      setError('Connect your wallet first');
      return;
    }
    if(!amount){
      setError('Enter amount');
      return;
    }
    setError("");
    const parameter = [
      {
        from: MyAddress,
        to: RecipientAddress,
        gasLimit: Number(80000).toString(16),
        gasPrice: Number(1000000).toString(16), //faster processing
        value: Number(amount).toString(16),
      },
    ];

    try {
      await window.ethereum.request({ method: "eth_sendTransaction", params: parameter });
    } catch (error) {
      setError(error.message || 'An error occurred while transferring funds.');
    }
  };

  return (
    <div className='w-full h-[44rem] relative'>
      <div className='absolute inset-0 bg-black opacity-50'></div>
      <img className='w-full h-full object-cover' src="https://w0.peakpx.com/wallpaper/689/545/HD-wallpaper-light-black-blue-colors-dark-gradient-gray-green-plain-purple-solid-thumbnail.jpg" alt="Background" />
      <div className='absolute inset-0 flex flex-col items-center justify-center space-y-6'>
        <h1 className='text-white text-4xl -mt-5 mb-3'>Seamless Transaction through Metamask</h1>
        <form className='bg-transparent p-4 text-white border border-white shadow-md rounded-lg w-[20rem] flex justify-between items-center' onSubmit={(e) => e.preventDefault()}>
          <h1 className='mb-2 mr-5 mt-2'>Connect Your Wallet</h1>
          <button type="button" className='bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 rounded-lg  w-[6rem]' onClick={handleConnection}>Connect</button>
        </form>
        
        <form className='bg-transparent border border-white text-white p-10 shadow-md rounded-lg w-[32rem]' onSubmit={(e) => e.preventDefault()}>
          {error && <div className="text-red-500 mt-2 font-semibold text-center">{error}</div>}
          <h1 className='mb-4 font-bold text-3xl'>Transaction</h1>
          <input
            type="text"
            placeholder="Recipient Address"
            className='m-2 p-2 border border-gray-400 rounded-lg w-full text-black'
            onChange={(e) => setRecipientAddress(e.target.value)}
          />
          <input
            placeholder="Amount in Wei"
            type="text"
            className='m-2 p-2 border border-gray-400 rounded-lg w-full text-black'
            onChange={(e) => setAmount(e.target.value)}
          />
          <button type="submit" className='mt-4 ml-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 rounded-lg  w-[6rem]' onClick={handleTransfer}>Submit</button>
          <h1>Your Address: {MyAddress}</h1>
        </form>
      </div>
    </div>
  );
}

export default MainContainer;
