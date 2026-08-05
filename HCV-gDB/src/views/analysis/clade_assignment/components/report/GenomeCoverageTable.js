import React from 'react';
import 'assets/styles/report.css'

import { formatGenomeCoverage } from 'assets/javascript/formatHelper';

const GenomeCoverageTable= ( { alignment, features } ) => {


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
            <table className= "table table-striped table-bordered table-font-12" id="featureCoverageTable">
                <thead>
                    <tr>
                        <th colSpan={3}>Structural Protein</th>
                        <th colSpan={7}>Non-Structural Protein</th>
                    </tr>
                    <tr>
                    {featuresList.map((feature => (
                            <th>{featuresMap[feature]}</th>
                        )))}
                    </tr>
                </thead>

                {features && 
                    <tbody>
                        {featuresList.map((product) => {
                            const feature = features.find(r => r.product == product);

                            return (
                                <td key={product}>
                                    {feature ? 
                                        `${Math.round(formatGenomeCoverage(
                                            alignment,
                                            feature.cds_start,
                                            feature.cds_end
                                        ))}%`
                                        : "-"}
                                </td>
                                );
                        })}
                    </tbody> 
                }
            </table>

        </div>

    );
};

export default GenomeCoverageTable;
