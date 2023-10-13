import { useState, useEffect } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react';


const WalletComponent = ({ onWalletAddressChange }) => {

    const [walletAddress, setWalletAddress] = useState('');
    const { publicKey } = useWallet();
    useEffect(() => {
        if (publicKey) {
            console.log("useEffect in WalletComponent called with:", publicKey);
            const connectedWalletAddress = publicKey.toBase58();
            setWalletAddress(connectedWalletAddress);
            onWalletAddressChange(connectedWalletAddress);
        }
    }, [publicKey]);

    useEffect(() => {
        if (walletAddress) {
            onWalletAddressChange(walletAddress);
        }
    }, [walletAddress]);
    return (

        // <div className="min-h-screen flex items-center justify-center  bg-gray-gradient">



        <div className="relative bg-white p-10 rounded-xl shadow-lg w-96">
            <h1 className="text-center mb-6 font-semibold text-2xl">Enter Your Wallet Address</h1>
            <input
                className="w-full p-3 mb-4 border rounded-md outline-none"
                type="text"
                placeholder="Enter your wallet address"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
            />
            <p className="text-center mb-6 font-semibold text-2xl">OR</p>
            <div className="flex items-center justify-center space-x-4"> {/* Add space-x-4 to add spacing between buttons */}
                <WalletMultiButton />
                <button
                    onClick={() => window.location.reload()}
                    className="btn btn-outline btn-primary"
                >
                    Reset
                </button>
            </div>
        </div>


    );
};

export default WalletComponent;
