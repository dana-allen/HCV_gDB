import React from 'react';
import { Link } from 'react-router-dom';

import 'assets/styles/report.css'

const PhylogeneticClassification = ( { data } ) => {
    
    return (
        <div id="block1">
            <div id="phylo">
                <h3>Phylogenetic classification</h3>
                <table id="phylogenetics">
                    <colgroup>
                        <col class="tableHeader"/>
                        <col/>
                    </colgroup>

                    <tr>
                        <td><b>Identified as Hepatitis C?</b></td>
                        <td>{data.identified ? 'Yes': 'No'}</td>
                    </tr>
                    <tr>
                        <td><b>Genotype</b></td>
                        <td>{data.clade_assignment.major}</td>
                    </tr>
                    <tr>
                        <td><b>Subtype</b></td>
                        <td>{data.clade_assignment.major}{data.clade_assignment.minor}</td>
                    </tr>
                    <tr>
                        <td><b>Closest Reference Sequence</b></td>
                        <td><Link 
                                // className='gdb-link' 
                                target="_blank" 
                                to={`/sequence/${data.referenceSequence}`}>
                                    {data.referenceSequence} 
                            </Link></td>
                    </tr>
                </table>
            </div>
            
        </div>

    );
};

export default PhylogeneticClassification;
