import { promisify } from 'util';
import { writeFileSync } from 'fs';
function transformNFTData(nftData) {
    return nftData.map((nft) => {
        return {
            success: true,
            message: "NFT metadata",
            result: {
                name: nft.name,
                symbol: nft.symbol,
                royalty: nft.royalty,
                image_uri: nft.image_uri,
                cached_image_uri: nft.cached_image_uri,

                animation_url: nft.animation_url,
                cached_animation_url: nft.cached_animation_url,
                metadata_uri: nft.metadata_uri,
                description: nft.description,
                mint: nft.mint,
                owner: nft.owner,
                update_authority: nft.update_authority,
                creators: nft.creators,
                collection: nft.collection,
                attributes: nft.attributes,
                attributes_array: nft.attributes_array,
                is_loaded_metadata: nft.is_loaded_metadata,
                primary_sale_happened: nft.primary_sale_happened,
                is_mutable: nft.is_mutable,
                token_standard: nft.token_standard,
                is_compressed: nft.is_compressed,
                files: nft.files,
                merkle_tree: nft.merkle_tree,
            },
        };
    });
}

// Function to fetch NFTs for a given page from the regular NFT API
async function fetchRegularNFTsForPage(walletAddress, apiKey, page) {
    const response = await fetch(
        `https://api.shyft.to/sol/v2/nft/read_all?network=mainnet-beta&address=${walletAddress}&page=${page}&size=50`,
        {
            method: 'GET',
            headers: {
                'x-api-key': apiKey,
            },
            redirect: 'follow',
        }
    );

    if (response.status !== 200) {
        console.error(`Error fetching regular NFTs for page ${page}:`, response.statusText);
        return [];
    }

    const result = await response.json();
    return result.result ? result.result.nfts : [];
}

// Function to fetch NFTs for a given page from the compressed NFT API
async function fetchCompressedNFTsForPage(walletAddress, apiKey, page) {
    const response = await fetch(
        `https://api.shyft.to/sol/v2/nft/compressed/read_all?network=mainnet-beta&wallet_address=${walletAddress}&page=${page}&size=50`,
        {
            method: 'GET',
            headers: {
                'x-api-key': apiKey,
            },
            redirect: 'follow',
        }
    );

    if (response.status !== 200) {
        console.error(`Error fetching compressed NFTs for page ${page}:`, response.statusText);
        return [];
    }

    const result = await response.json();
    return result.result ? result.result.nfts : [];
}

// Function to fetch all wallet NFTs, including regular and compressed, using batch fetching with concurrency
async function fetchAllWalletNFTs(walletAddress, apiKey) {
    const startTime = Date.now();
    const nftList = [];
    let page = 1;
    let hasMoreRegularNFTs = true;
    let hasMoreCompressedNFTs = true;

    // Utility function to add a delay
    const setTimeoutPromise = promisify(setTimeout);

    while (hasMoreRegularNFTs || hasMoreCompressedNFTs) {
        // Batch fetch multiple pages concurrently (e.g., 5 pages at a time)
        const pagesToFetch = 5;
        const regularPagePromises = [];
        const compressedPagePromises = [];

        for (let i = 0; i < pagesToFetch; i++) {
            if (hasMoreRegularNFTs) {
                regularPagePromises.push(fetchRegularNFTsForPage(walletAddress, apiKey, page));
            }
            if (hasMoreCompressedNFTs) {
                compressedPagePromises.push(fetchCompressedNFTsForPage(walletAddress, apiKey, page));
            }
            page++;
        }

        // Concurrently fetch regular and compressed pages within the batch
        const regularPageResults = await Promise.all(regularPagePromises);
        const compressedPageResults = await Promise.all(compressedPagePromises);

        // Combine results from all regular and compressed pages within the batch
        const concatenatedRegularNFTs = regularPageResults.flat();
        const concatenatedCompressedNFTs = compressedPageResults.flat();

        if (concatenatedRegularNFTs.length === 0) {
            hasMoreRegularNFTs = false; // No more regular NFTs to fetch
        }

        if (concatenatedCompressedNFTs.length === 0) {
            hasMoreCompressedNFTs = false; // No more compressed NFTs to fetch
        }

        nftList.push(...concatenatedRegularNFTs, ...concatenatedCompressedNFTs);

        // Add a delay to avoid overloading the API with too many concurrent requests
        await setTimeoutPromise(0
        ); // Adjust the delay as needed
    }

    const endTime = Date.now();
    const elapsedTime = endTime - startTime;


    return { nftList, elapsedTime };
}

// Usage in your React component
async function fetchAndDisplayNFTs(wallet_address) {
    const walletAddress = wallet_address;
    const apiKey = 'VM6jV28HbK8gyBKL';

    try {
        const { nftList, elapsedTime } = await fetchAllWalletNFTs(walletAddress, apiKey);
        const transformedNFTList = transformNFTData(nftList); // Transform the data

        // Save the transformed data to a JSON file
        writeFileSync('nftsamData.json', JSON.stringify(transformedNFTList, null, 2), 'utf-8');
        console.log('All Wallet NFTs:', nftList);
        console.log('Time taken to fetch data (ms):', elapsedTime);
        // Now you can use nftList to display or work with the combined NFT data in your React component.
    } catch (error) {
        console.error('Error fetching NFTs:', error);
    }
}

// Call the function to fetch and display NFTs
fetchAndDisplayNFTs('FQuxesCpn3giUaxmwFr98ee9FVMSChUziyVKLYYrFKmW');











