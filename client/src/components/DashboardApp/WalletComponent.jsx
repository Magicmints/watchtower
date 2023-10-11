import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'



const WalletComponent = () => {


    return (

        // <div className="min-h-screen flex items-center justify-center  bg-gray-gradient">



        <div className="relative bg-white p-10 rounded-xl shadow-lg w-96">
            <h1 className="text-center mb-6 font-semibold text-2xl">Connect Wallet</h1>
            <input
                className="w-full p-3 mb-4 border rounded-md outline-none"
                type="text"
                placeholder="Enter your wallet address"
            />
            <div className='flex items-center justify-center'>

                <WalletMultiButton />
            </div>
        </div>


    );
};

export default WalletComponent;
