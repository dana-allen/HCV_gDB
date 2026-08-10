import React from 'react';
import { Link } from 'react-router-dom';

import 'assets/styles/report.css'

const OthersTable = ( {data, alignment} ) => {

    const filtered_data = data && data["mutations"].filter(item => item.alignment_name != alignment)
    const reshaped = data && Object.values(
        filtered_data.reduce((acc, item) => {
            const key = item.signature_id
            
            if (!acc[key]) {
                acc[key] = {
                signature_id: item.signature_id,
                protein_name: item.protein_name,
                geno_subtype: item.alignment_name,
                };
            }

            
            return acc;
        }, {})
    ).sort((a, b) => a.geno_subtype.localeCompare(b.geno_subtype));


    return (
       <table className="table table-striped table-bordered table-font-12" id="substitutionsOfInterest">
            <thead>
                <tr>
                    <th>Virus Protein</th>
                    <th>Polymorphism</th>
                    <th>Genotype / Subtype</th>
                    
                </tr>
            </thead>

            <tbody>
                {reshaped.map((polymorphism) => (
                    <tr>
                        <td >
                            {polymorphism.protein_name}
                        </td>
                        <td >
                            <Link to={`/polymorphism/${polymorphism.signature_id}` }> {polymorphism.signature_id.split(":")[1]}</Link>
                        </td>
                        
                        <td >
                            {polymorphism.geno_subtype && polymorphism.geno_subtype.split('_')[1]}
                        </td>
                    </tr>

                ))}
            </tbody>
        </table>

    );
};

export default OthersTable;
