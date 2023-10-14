



import React, { useState } from 'react';

import '../../Page/m.css'

const Table = ({ nfts }) => {

    const [showDetailsFor, setShowDetailsFor] = useState(0);




    const getNFTWeight = (nft) => {
        if (nft.confidence_score < 0.009) return 1; // Scam
        if (nft.predicted === "spam") return 2; // Spam
        return 3; // Authentic
    };

    function getImageUri(nft) {
        return nft.image_uri || nft.cached_image_uri || nft.animation_url || nft.cached_animation_url;
    }

    function shortenLink(link) {
        if (link.length <= 7) {
            return link; // return the link as is if it's already short
        }
        return `${link.substring(0, 5)}...${link.slice(-5)}`;
    }



    const sortedNfts = [...nfts].sort((a, b) => getNFTWeight(a) - getNFTWeight(b));

    return (
        <div className="w-full max-w-7xl rounded-xl shadow-lg overflow-x-auto bg-primary">
            <div className="max-h-[600px] overflow-y-auto">
                {nfts.length > 0 && (
                    <table className="w-full table">
                        <thead className='sticky top-0 bg-purple-800 z-10'>
                            <tr className='border-slate-600'>
                                <th></th>
                                <th className='text-white text-center  text-sm'>Name</th>
                                <th className='text-white text-center  text-sm'>Symbol</th>
                                <th className='text-white text-center  text-sm'>Mint</th>
                                <th className='text-white  text-center text-sm'>Is Compressed</th>
                                <th className='text-white  text-center text-sm'>Predicted</th>
                                <th className='text-white  text-center text-sm'>Authencity Score</th>
                                {/* <th></th> */}
                            </tr>
                        </thead>
                        <tbody className=''>
                            {sortedNfts.map((nft, index) => (
                                <React.Fragment key={index}>
                                    <tr className={`cursor-pointer border-slate-600 ${showDetailsFor === index ? 'bg-base-200' : 'bg-primary'
                                        } text-primary-content hover:bg-base-200 rounded-lg`} onClick={() => showDetailsFor === index ? setShowDetailsFor(null) : setShowDetailsFor(index)}>
                                        <td>
                                            <label>
                                                <input type="checkbox" className="checkbox checkbox-primary" onClick={(e) => e.stopPropagation()} />
                                            </label>
                                        </td>
                                        <td>
                                            <div className="flex items-center space-x-3 p-2">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-16 h-16 transform scale-125 scale-on-hover">
                                                        <img src={getImageUri(nft)} alt={nft.name} />
                                                    </div>








                                                </div>
                                                <div>
                                                    <div className="font-bold">{nft.name}</div>
                                                    <div className="text-sm opacity-50">{nft.token_standard}</div>
                                                </div>
                                            </div>
                                        </td>
                                        {/* ----------------------------------------- */}
                                        <td>{nft.symbol || "None"}</td>
                                        <td className='badge-sm badge mt-10 text-white'>
                                            <a
                                                className="hover-enlarge"
                                                href={`https://solscan.io/account/${nft.mint}`}
                                                target='_blank'
                                                rel='noopener noreferrer'
                                                style={{ textDecoration: 'none', color: 'inherit' }}
                                            >
                                                {shortenLink(nft.mint)} ↗
                                            </a>
                                        </td>








                                        <td>{nft.is_compressed ? "Yes" : "No"}</td>
                                        <td>
                                            {nft.predicted ?
                                                <div className={`badge gap-2 p-3 ${nft.confidence_score < 0.009 ? "badge-error" : nft.predicted === "spam" ? "badge-warning" : "badge-success"}`}>
                                                    {nft.confidence_score < 0.009 ? "Scam" : nft.predicted}
                                                </div>
                                                :
                                                <><span className="badge badge-xs badge-success"></span> Analysing</>
                                            }
                                        </td>



                                        {/* <td>{parseFloat(nft.confidence_score).toFixed(3)}%   <progress className="progress progress-secondary  w-32" value={100 - nft.confidence_score} max="100"></progress></td> */}
                                        <td>
                                            {nft.confidence_score !== undefined ? `${parseFloat(nft.confidence_score).toFixed(3)}%` : 'Loading...'}
                                            <progress className="progress progress-secondary w-32" value={nft.confidence_score} max="100"></progress>
                                        </td>
                                    </tr>
                                    {showDetailsFor === index && (

                                        <tr>
                                            <td colSpan="8" className="p-4 bg-base-200 rounded-b-lg rounded-br-xl">
                                                {/* <hr /> */}
                                                <div className="space-y-2 py-2">
                                                    <p><strong>Owner:</strong> <span className='badge badge-neutral'>{nft.owner}</span></p>
                                                    <p className='pt-3'><strong>Update Authority:</strong> <span className='badge badge-neutral'>{nft.update_authority}</span></p>
                                                    <p className='pt-3'><strong>Description:</strong> {nft.description}</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Table;
