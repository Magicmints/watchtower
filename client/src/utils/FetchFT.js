// import { writeFileSync } from 'fs';
import { mapLimit } from 'async';

// Define your API keys

const apiKey = '';


// Define the URLs for the API calls

// Function to make API calls and save data to JSON
export async function fetchData(walletAddress) {

    const walletTokensUrl = `https://api.shyft.to/sol/v1/wallet/all_tokens?network=mainnet-beta&wallet=${walletAddress}`;
    const tokenInfoUrl = `https://api.shyft.to/sol/v1/token/get_info?network=mainnet-beta`;
    const nftReadSelectedUrl = "https://api.shyft.to/sol/v1/nft/read_selected";
    let modifiedResults = []

    try {
        // Make the first API call
        const response1 = await fetch(walletTokensUrl, {
            method: 'GET',
            headers: {
                'x-api-key': apiKey,
            },
        });

        const walletTokensData = await response1.json();
        // console.log(walletTokensData)


        // Extract mint addresses
        const mintAddresses = walletTokensData.result.map((token) => token.address);

        for (let index = 0; index < mintAddresses.length; index++) {
            const element = mintAddresses[index];
            // console.log(element)

        }
        // Use async to get decimals for each mint address in parallel
        mapLimit(mintAddresses, 10, async (address) => {
            const response2 = await fetch(`${tokenInfoUrl}&token_address=${address}`, {
                method: 'GET',
                headers: {
                    'x-api-key': apiKey,
                },
            });
            const tokenInfo = await response2.json();
            // console.log(tokenInfo); // Add this line to inspect the response


            return { address, decimals: tokenInfo.result.decimals };
        }, (err, decimalsData) => {
            if (err) {
                console.error('Error:', err);
            } else {
                // Filter mint addresses with decimals as zero
                const mintAddressesWithDecimalsZero = decimalsData.filter((data) => data.decimals === 0);

                // Use async to make API calls for metadata in parallel
                mapLimit(mintAddressesWithDecimalsZero, 10, async (data) => {
                    const response3 = await fetch(nftReadSelectedUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-api-key': apiKey,
                        },
                        body: JSON.stringify({
                            "network": "mainnet-beta",
                            "token_addresses": [data.address],
                            "refresh": false,
                            "token_record": true
                        }),
                    });
                    return response3.json();
                }, (err, results) => {
                    if (err) {
                        console.error('Error:', err);
                    } else {
                        const modifiedResults = results.map(result => {
                            if (result.success && result.result && Array.isArray(result.result) && result.result.length > 0) {
                                const nft = result.result[0];
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
                                        files: nft.files || [],
                                        merkle_tree: nft.merkle_tree,
                                    },
                                };
                            }
                            return result;
                        });

                        // Save the modified results to a JSON file
                        // writeFileSync(`${walletAddress}_data_from_fetchft.json`, JSON.stringify(modifiedResults, null, 2));
                        localStorage.setItem(`${walletAddress}_ftData`, JSON.stringify(modifiedResults));

                        // console.log('Data saved to data.json');
                    }
                });
            }
        });
    } catch (error) {
        console.error('Error:', error);
    }

    return modifiedResults;
}

// // Call the fetchData function to start the process
// fetchData('FQuxesCpn3giUaxmwFr98ee9FVMSChUziyVKLYYrFKmW');






