import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faDownload } from '@fortawesome/free-solid-svg-icons'

import 'assets/styles/tables.css'

import { useDownload } from 'hooks';

import { formatGenomeCoverage } from 'assets/javascript/formatHelper';

const CladeAssignmentTable = ( { tableRows=null, onGenomeClick } ) => {
    
    const { downloadFile } = useDownload();
    console.log(tableRows)
    const featuresList = ['core protein', 'envelope protein E1', 'envelope protein E2', 'protein p7',
        'nonstructural protein NS2', 'protease/helicase protein NS3','nonstructural protein NS4A','nonstructural protein NS4B', 'nonstructural protein NS5A',
        
        'RNA-dependent RNA polymerase NS5B'
    ]
    const featuresMap = {'core protein':'Core',
                    'envelope protein E1': 'E1',
                    'envelope protein E2':'E2',
                    'RNA-dependent RNA polymerase NS5B':'NS5B',
                    'nonstructural protein NS5A':'NS5A',
                    'nonstructural protein NS4B':'NS4B',
                    'nonstructural protein NS4A':'NS4A',
                    'protease/helicase protein NS3':'NS3',
                    'nonstructural protein NS2':'NS2',
                    'protein p7':'p7'
                  }

    return (
        <div>

            <table className="table table-striped table-bordered table-font-12 ">
                <thead >
                    <tr>
                        <th colSpan={4}></th>
                        <th colSpan={10}>Coding Region Coverage</th>
                        <th colSpan={2}>Alignment</th>
                    </tr>

                    <tr>
                        <th rowSpan={2}>Query Accession</th>
                        <th>Closest Reference Sequence (Identity %)</th>
                        <th>
                            Major Clade (LWR*)
                            <div className="th-subtext">
                                *likelihood weight assigned to this exact taxonomic path
                            </div>
                        </th>
                        <th>
                            Minor Clade (LWR*)
                            <div className="th-subtext">
                                *likelihood weight assigned to this exact taxonomic path
                            </div>
                        </th>
                        {featuresList.map((feature => (
                            <th>{featuresMap[feature]}</th>
                        )))}
                        {/* <th>N</th>
                        <th>P</th>
                        <th>M</th>
                        <th>G</th>
                        <th>L</th> */}
                        <th>View</th>
                        <th>Download</th>
                    </tr>
                    
                </thead>
                <tbody>
                    
                    {tableRows.map((row, i) => (
                        <tr key={row.accession}>
                            <td>{row.accession}</td>
                            <td><Link className='gdb-link' to={`/reference/${row.blast_ref}` }>{row.blast_ref}</Link> ({row.blast_identity} %)</td>
                            <td>{row.epa_ng.major} ({row.epa_ng.major_lwr})</td>
                            <td>{row.epa_ng.minor} ({row.epa_ng.minor_lwr})</td>

                            {featuresList.map((product) => {
                                const feature = row.features.find(r => r.product == product);

                                return (
                                    <td key={product}>
                                        {feature ? 
                                            `${Math.round(formatGenomeCoverage(
                                                row.alignment,
                                                feature.cds_start,
                                                feature.cds_end
                                            ))}%`
                                            : "-"}
                                    </td>
                                    );
                                })}
                           
                            <td><Button size='sm' className='btn-main-outline' onClick={() => onGenomeClick(row.accession)}><FontAwesomeIcon icon={faEye} /></Button></td>
                            <td>
                                {row.alignment ? 
                                <Button 
                                    size='sm' 
                                    className='btn-main-filled' 
                                    onClick={() => downloadFile('>'+row.accession+'\n'+row.alignment, row.accession+"_aligned.fasta", "fasta")}
                                >
                                <FontAwesomeIcon icon={faDownload} />
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
