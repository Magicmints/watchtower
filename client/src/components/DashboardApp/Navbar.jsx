import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const Navbar = () => {
    return (
        <div className="flex justify-between items-center p-4 bg-blue-500 text-white">
            {/* Logo on the Left */}
            <div className="text-2xl font-bold">Watchtower</div>

            {/* Wallet Connect Button on the Right */}
            <div className="wallet-connect">
                <WalletMultiButton />
            </div>
        </div>
    );
};

export default Navbar;
