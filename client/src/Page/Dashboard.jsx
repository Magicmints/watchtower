



import React, { useState, useEffect } from 'react';
import WalletComponent from '../components/DashboardApp/WalletComponent';
import Table from '../components/DashboardApp/Table';
import './m.css'
const Dashboard = () => {
    const [nftData, setNftData] = useState([]);
    const [hasDataBeenSent, setHasDataBeenSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [nftCount, setNftCount] = useState(0);
    const [fetched, setFetched] = useState(false);


    function NftLoader({ loading, count }) {
        if (!loading) return null;

        return (
            <div className="nft-loader">
                <div className="text">Hold on! We're fetching your NFTs...</div>
                <div className="count">{count} NFTs fetched</div>
                <div className="spinner"></div>
            </div>
        );
    }


    const prepareNftDataForApi = (nftData) => {
        return nftData.map((nft) => {
            return {
                "success": true,
                "message": "NFT metadata",
                "result": nft
            };
        });
    };


    const sendNftDataToApi = async (nftData) => {
        const preparedData = prepareNftDataForApi(nftData);
        const apiUrl = 'https://ue7qflb8vf.execute-api.us-east-1.amazonaws.com/predict';

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(preparedData)
        });

        if (response.ok) {
            const results = await response.json();
            console.log(results);
            return results;
        } else {
            console.error(`Failed to fetch API: ${response.statusText}`);
            return null;
        }
    };

    const handleSendData = async () => {
        const results = await sendNftDataToApi(nftData);
        if (results) {
            const updatedNfts = nftData.map(nft => {
                const result = results.find(r => r["Mint Address"] === nft.mint);
                if (result) {
                    nft.predicted = result["Predicted Label"];
                    nft.confidence_score = result["Model Confidence"] * 100;  // Assuming model confidence is between 0 and 1
                }
                return nft;
            });
            setNftData(updatedNfts);
            setHasDataBeenSent(true);  // Mark data as sent
            console.log("Calling sendNftDataToApi...");

        }
    };


    useEffect(() => {
        console.log("Inside useEffect monitoring nftData");
        if (nftData.length > 0 && !hasDataBeenSent) {
            handleSendData();
        }
    }, [nftData]);




    const fetchNFTData = async (endpoint, walletAddress, page = 1) => {


        let addressParam;
        if (endpoint.includes('compressed')) {
            addressParam = `wallet_address=${walletAddress}`;
        } else {
            addressParam = `address=${walletAddress}`;
        }

        const API_KEY = "VM6jV28HbK8gyBKL";  // Use your API key here
        const headers = new Headers();
        headers.append("x-api-key", API_KEY);

        const response = await fetch(`${endpoint}?network=mainnet-beta&${addressParam}&page=${page}&size=50&refresh=refresh`, {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        });
        return await response.json();
    };

    const handleWalletAddressChange = async (walletAddress) => {
        if (!walletAddress) return;
        setLoading(true);
        console.log("Fetching data for address:", walletAddress);
        let allNfts = [];
        let page = 1;


        // Fetch NFTs
        while (true) {
            const nftData = await fetchNFTData("https://api.shyft.to/sol/v2/nft/read_all", walletAddress, page);
            if (!nftData.success || nftData.result.nfts.length === 0) break;
            allNfts.push(...nftData.result.nfts);
            // Update the NFT count here for standard NFTs
            setNftCount(prevCount => prevCount + nftData.result.nfts.length);

            page++;
        }
        page = 1;  // Reset page counter for next API

        // Fetch cNFTs
        while (true) {
            const cNftData = await fetchNFTData("https://api.shyft.to/sol/v2/nft/compressed/read_all", walletAddress, page);
            if (!cNftData.success || cNftData.result.nfts.length === 0) break;
            allNfts.push(...cNftData.result.nfts);

            // Update the NFT count here for cNFTs
            setNftCount(prevCount => prevCount + cNftData.result.nfts.length);

            page++;
        }
        // Set the consolidated data to state
        setNftData(prevData => [...prevData, ...allNfts]);
        console.log("NFT Data updated:", allNfts);
        setLoading(false);
        setFetched(true);

    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-blue-200-gradient space-y-8 py-4 px-2 md:px-8">
            <NftLoader loading={loading} count={nftCount} />
            <WalletComponent onWalletAddressChange={handleWalletAddressChange} />
            {!loading && fetched && (
                <div className="w-full max-w-7xl mt-4 p-4 rounded-lg shadow-md bg-white">
                    {nftData.length > 0 ? <Table nfts={nftData} /> : <p className="text-center text-xl text-gray-700">No NFTs found</p>}
                </div>
            )}
        </div>
    );



};

export default Dashboard;


