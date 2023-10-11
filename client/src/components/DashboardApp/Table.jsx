// import React from 'react';

// const Table = ({ nfts }) => {
//     return (
//         <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-x-auto p-4">
//             <table className="table">
//                 <thead>
//                     <tr>
//                         <th>
//                             <label>
//                                 <input type="checkbox" className="checkbox" />
//                             </label>
//                         </th>
//                         <th>Name</th>
//                         <th>Job</th>
//                         <th>Favorite Color</th>
//                         <th>NFTs</th>
//                         <th></th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {/* This is just an example row. Modify as necessary */}
//                     <tr>
//                         <th>
//                             <label>
//                                 <input type="checkbox" className="checkbox" />
//                             </label>
//                         </th>
//                         <td>
//                             <div className="flex items-center space-x-3">
//                                 <div className="avatar">
//                                     <div className="mask mask-squircle w-12 h-12">
//                                         <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <div className="font-bold">Hart Hagerty</div>
//                                     <div className="text-sm opacity-50">United States</div>
//                                 </div>
//                             </div>
//                         </td>
//                         <td>Zemlak, Daniel and Leannon</td>
//                         <td>Purple</td>
//                         <td>
//                             {nfts.length > 0 ? (
//                                 nfts.map((nft, index) => <div key={index}>{nft}</div>)
//                             ) : (
//                                 "No NFTs"
//                             )}
//                         </td>
//                         <th>
//                             <button className="btn btn-ghost btn-xs">details</button>
//                         </th>
//                     </tr>
//                     {/* ... Add more rows as needed ... */}
//                 </tbody>
//                 <tfoot>
//                     <tr>
//                         <th></th>
//                         <th>Name</th>
//                         <th>Job</th>
//                         <th>Favorite Color</th>
//                         <th>NFTs</th>
//                         <th></th>
//                     </tr>
//                 </tfoot>
//             </table>
//         </div>
//     );
// };

// export default Table;







import React, { useState } from 'react';


const Table = ({ nfts }) => {

    const [showDetailsFor, setShowDetailsFor] = useState(null);

    return (
        <div className="w-full max-w-7xl rounded-xl shadow-lg overflow-x-auto bg-primary">
            <div className="max-h-[600px] overflow-y-auto">
                <table className="w-full table">
                    <thead className='sticky top-0 bg-purple-300 z-10'>
                        <tr className='border-slate-600'>
                            <th></th>
                            <th className='text-white text-sm'>Name</th>
                            <th className='text-white text-sm'>Symbol</th>
                            <th className='text-white text-sm'>Mint</th>
                            <th className='text-white text-sm'>Is Compressed</th>
                            <th className='text-white text-sm'>Predicted</th>
                            <th className='text-white text-sm'>Confidence Score</th>
                            {/* <th></th> */}
                        </tr>
                    </thead>
                    <tbody className=''>
                        {nfts.map((nft, index) => (
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
                                                <div className="mask mask-squircle w-16 h-16 transform scale-125 hover:scale-150 transition-transform">
                                                    <img src={nft.image_uri} alt={nft.name} />
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
                                        <a href={`https://solscan.io/account/${nft.mint}`} target='_blank' rel='noopener noreferrer'>
                                            {nft.mint}
                                        </a>
                                    </td>

                                    <td>{nft.is_compressed ? "Yes" : "No"}</td>
                                    <td>{nft.predicted ? <div className="badge badge-primary gap-2 p-3"> {nft.predicted}</div> : <><span className="badge badge-xs badge-success"></span> Analysing</>}</td>
                                    <td>{nft.confidence_score}%   <progress className="progress progress-secondary  w-32" value={nft.confidence_score} max="100"></progress></td>
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
            </div>
        </div>
    );
};

export default Table;
