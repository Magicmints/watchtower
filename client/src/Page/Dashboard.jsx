import React, { useState, useEffect } from 'react';
import WalletComponent from '../components/DashboardApp/WalletComponent';
import Table from '../components/DashboardApp/Table';
import { PublicKey } from '@solana/web3.js'

import nftsData from '../components/DashboardApp/nftsamData.json'; // adj
const Dashboard = () => {
    const successfulNfts = nftsData.filter(entry => entry.success).map(entry => entry.result);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-blue-200-gradient space-y-8">
            <WalletComponent />
            <Table nfts={successfulNfts} />
        </div>
    );
};

export default Dashboard;
