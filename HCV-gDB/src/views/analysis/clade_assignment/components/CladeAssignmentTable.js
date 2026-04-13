import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'assets/styles/tables.css'

import { useDownload } from 'hooks';

const CladeAssignmentTable = ( { tableRows=null } ) => {
    const { downloadFile } = useDownload();

    // if (!Array.isArray(data) || data.length === 0) {
    //     return <div></div>;
    // }

    console.log("TABLE ROWS", tableRows)

    return (
        <div>

            <table className="table table-striped table-bordered table-font-12 ">
                <thead >
                    <tr>
                        <th>Query Accession</th>
                        <th>Reference Accession</th>
                        <th>Identity Percentage</th>
                        <th>EPA-NG Clade Assignment</th>
                        <th>Download Alignment</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {tableRows.map((row, i) => (
                        <tr key={row.accession}>
                            <td>{row.accession}</td>
                            <td><Link className='gdb-link' to={`/reference/${row.blast_ref}` }>{row.blast_ref}</Link></td>
                            <td>{row.blast_identity}</td>
                            <td>{row.epa_ng.major} {row.epa_ng.minor}</td>
                            <td>
                                {row.alignment ? 
                                <Button 
                                    size='sm' 
                                    className='btn-main-filled' 
                                    onClick={() => downloadFile('>'+row.accession+'\n'+row.alignment, row.accession+"_aligned.fasta", "fasta")}
                                >
                                Download
                                </Button> : "N/A"
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CladeAssignmentTable;
