import { useState, useEffect } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react';





const WalletComponent = ({ onWalletAddressChange, hasStartedFetching }) => {
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

    const handleSearch = () => {
        if (walletAddress) {
            onWalletAddressChange(walletAddress);
        }
    };

    return (
        <div className="relative bg-white p-10 rounded-xl shadow-lg w-96">
            <h1 className="text-center mb-6 font-semibold text-2xl">Enter Your Wallet Address</h1>
            <input
                className="w-full p-3 mb-4 border rounded-md outline-none"
                type="text"
                placeholder="Enter your wallet address"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
            />
            <button className="w-full p-3 mb-4 bg-blue-500 text-white rounded-md" onClick={handleSearch}>Search</button>
            <p className="text-center mb-6 font-semibold text-2xl">OR</p>
            <div className="flex items-center justify-center space-x-4">
                <WalletMultiButton />
                {hasStartedFetching && (  // Only render Reset button if loading is true
                    <button
                        onClick={() => window.location.reload()}
                        className="btn btn-outline btn-primary"
                    >
                        Reset
                    </button>
                )}
            </div>
        </div>
    );
};

export default WalletComponent;
