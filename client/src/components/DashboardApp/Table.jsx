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
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-x-auto p-4">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                        </th>
                        <th>Name</th>
                        <th>Symbol</th>
                        <th>Image</th>
                        <th>Mint</th>
                        <th>Is Compressed</th>
                        <th>Token Standard</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {nfts.map((nft, index) => (
                        <React.Fragment key={index}>
                            <tr className="hover:bg-gray-100 cursor-pointer">
                                <td>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </td>
                                <td>{nft.name}</td>
                                <td>{nft.symbol}</td>
                                <td>
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={nft.image_uri} alt={nft.name} />
                                    </div>
                                </td>
                                <td>{nft.mint}</td>
                                <td>{nft.is_compressed ? "Yes" : "No"}</td>
                                <td>{nft.token_standard}</td>
                                <td>
                                    <button className="btn btn-ghost btn-xs" onClick={() => showDetailsFor === index ? setShowDetailsFor(null) : setShowDetailsFor(index)}
                                    >Details</button>
                                </td>
                            </tr>
                            {showDetailsFor === index && (

                                <tr>
                                    <td colSpan="8" className="p-4">
                                        {/* This will be hidden initially and can be toggled on the button click */}
                                        <div className="space-y-2">
                                            <p><strong>Description:</strong> {nft.description}</p>
                                            <p><strong>Owner:</strong> {nft.owner}</p>
                                            <p><strong>Update Authority:</strong> {nft.update_authority}</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
