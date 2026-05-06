import { useState, useEffect, useMemo } from 'react';

// Helpers
import { nucColors } from 'assets/javascript/sequenceViewerHelper';

// Stylesheets
import 'assets/styles/tables.css'

import PagingButtonsSlim from 'components/buttons/PagingButtonsSlim';

const InsertionDetails = ({ insertions }) => {

    console.log(insertions)

    const [data, setData] = useState(insertions ? insertions[0].split(";") : null)

    // const filteredData = 

    const [search, setSearch] = useState('');
    const [startRecord, setStartRecord] = useState('');
    const [endRecord, setEndRecord] = useState('');
    const [currentItems, setCurrentItems] = useState([]);

    const handlePageChange = (items) => {
        setCurrentItems(items[0]);
        setStartRecord(items[1]);
        setEndRecord(items[2]);
    };

    
    return (
        <div >
            <div >
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <div
                                style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px"
                                }}
                            >
                <h4 className='title-sub'>Insertions</h4>
                </div>
                
                </div>
            </div>

            <table className="table table-striped table-bordered table-font-12">
                <thead>
                    <tr>
                        <th colSpan={3}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                             
                            {/* Top row: search + paging */}
                            <div
                                style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px"
                                }}
                            >
                                <div style={{ position: "relative", flex: 1 }}>
                                <span className="size-12-font" style={{ fontWeight: "normal" }}>
                                Insertions {startRecord} to {endRecord} of {data.length}
                                </span>
                            </div>

                                {/* Paging buttons */}
                                <div style={{ whiteSpace: "nowrap" }}>
                                <PagingButtonsSlim
                                    data={data}
                                    onPageChange={handlePageChange}
                                />
                                </div>
                            </div>

                            {/* Bottom row: sequence info */}
                           

                            </div>
                        </th>
                        </tr>
                        <tr>
                            <th>Nucleotide Position</th>
                            <th>Insertions</th>
                        </tr>
                </thead>

                <tbody>
                    {currentItems.map((item, rowIndex) => {
                        console.log(item)
                        const k = item.split(":")
                        return (
                            <tr>
                                <td>{k[0]}</td>
                                <td>
                                    <div className='blocks'>
                                        {k[1].split("").map((nuc, nucId) => (
                                            <div className='block'
                                                key={nucId}
                                                style={{
                                                    backgroundColor: nucColors[nuc],
                                                    width:'15px'
                                                }}
                                            ><b>{nuc}</b></div>
                                        ))}
                                    </div>

                                </td>
                                
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            
            
        </div>
    );
};

export default InsertionDetails;

{/* <div>
                {insertions_split.map((insertion, insertionIndex) => {
                    console.log("Insertions", insertion)
                    const row = insertion ? insertion.split(";") : null
                    return (
                        <table 
                                    key={`table-${insertionIndex}`}
                                    className="table table-striped table-bordered table-font-12 table-width-50" 
                                >
                                                    <thead>
                    <tr>
                        <th colSpan={3}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                             <div>
                                <span className="size-12-font" style={{ fontWeight: "normal" }}>
                                Polymorphisms {startRecord} to {endRecord} of {insertions.length}
                                </span>
                            </div>

                            <div
                                style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px"
                                }}
                            >

                                <div style={{ whiteSpace: "nowrap" }}>
                                <PagingButtonsSlim
                                    data={insertions_split}
                                    onPageChange={handlePageChange}
                                />
                                </div>
                            </div>
                           

                            </div>
                        </th>
                        </tr>
                        <tr>
                            <th>Nucleotide Position</th>
                            <th>Insertions</th>
                        </tr>
                </thead>
                                    <thead>
                                        
                                    </thead>
                                    {currentItems.map((item, rowIndex) => {
                                        const k = item.split(":")
                                        return (
                                            <tbody key={`tbody-${rowIndex}`}>
                                                <tr>
                                                    <td>{k[0]}</td>
                                                    <td>
                                                        <div className='blocks'>
                                                            {k[1].split("").map((nuc, nucId) => (
                                                                <div className='block'
                                                                    key={nucId}
                                                                    style={{
                                                                        backgroundColor: nucColors[nuc],
                                                                        width:'15px'
                                                                    }}
                                                                ><b>{nuc}</b></div>
                                                            ))}
                                                        </div>

                                                    </td>
                                                    
                                                </tr>
                                            </tbody>
                                        )
                                    })}
                                </table>
                        // <>
                        //     {row &&
                        //         <
                        //     }
                        // </>
                    )
                })}
            </div> */}