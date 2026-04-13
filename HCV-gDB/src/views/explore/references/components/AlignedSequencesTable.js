import React from 'react';
import { Link } from 'react-router-dom';

import 'assets/styles/tables.css'

const AlignedSequencesTable = ( { data=null, type=null } ) => {

    if (!Array.isArray(data) || data.length === 0) {
        return <div>No data found...</div>;
    }

    return (
        <div>

            <table className="table table-striped table-bordered table-font-12 table-width-50">
                <thead >
                    <tr>
                        <th>Primary Accession</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {data.map((sequence, i) => (
                        <tr key={i} id={i}>
                            <td><b><Link className='gdb-link' to={`/sequence/${sequence.query_sequence_id}` }> {sequence.query_sequence_id} </Link> </b></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AlignedSequencesTable;
