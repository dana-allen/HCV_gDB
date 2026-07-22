import { useState, useEffect, useMemo } from 'react';

// Helpers
import { nucColors } from 'assets/javascript/sequenceViewerHelper';

// Stylesheets
import 'assets/styles/tables.css'

import PagingButtonsSlim from 'components/buttons/PagingButtonsSlim';

const InsertionDetails = ({ insertions }) => {


    const [data, setData] = useState(insertions ? insertions[0].split(";") : null)

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
                             <div>
                                <span className="size-12-font" style={{ fontWeight: "normal" }}>
                                Insertions {startRecord} to {endRecord} of {data.length}
                                </span>
                            </div>
                            {/* Top row: search + paging */}
                            <div
                                style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px"
                                }}
                            >
                                <div style={{ position: "relative", flex: 1 }}>

                                {/* Paging buttons */}
                                <div style={{ whiteSpace: "nowrap" }}>
                                <PagingButtonsSlim
                                    data={data}
                                    onPageChange={handlePageChange}
                                />
                                </div>
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
                                    <div className='blocks-insertions'>
                                        {k[1].split("").map((nuc, nucId) => (
                                            <div className='block-insertion'
                                                key={nucId}
                                                style={{
                                                    backgroundColor: nucColors[nuc],
                                                    // width:'15px'
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