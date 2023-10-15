import React from 'react';

const NftSummaryComponent = ({ totalNfts, spamCount, scamCount, authenticCount }) => {
    return (
        <div className="bg-gradient-to-r from-blue-400 to-indigo-600 p-5 rounded-lg mb-6 shadow-md">
            <h2 className="text-white text-xl mb-4">Total NFTs Found: {totalNfts}</h2>
            <div className="flex justify-between space-x-4">
                <div className="bg-red-600 text-white px-4 py-1.5 rounded-full font-semibold tracking-wider shadow-sm hover:shadow-md transition-shadow duration-300">

                    Scam: {scamCount}
                </div>
                <div className="bg-yellow-600 text-white px-4 py-1.5 rounded-full font-semibold tracking-wider shadow-sm hover:shadow-md transition-shadow duration-300">
                    Spam: {spamCount}
                </div>
                <div className="bg-green-600 text-white px-4 py-1.5 rounded-full font-semibold tracking-wider shadow-sm hover:shadow-md transition-shadow duration-300">
                    Authentic: {authenticCount}
                </div>
            </div>
        </div>
    );
}

export default NftSummaryComponent;
