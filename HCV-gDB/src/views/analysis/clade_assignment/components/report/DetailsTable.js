import React from 'react';
import 'assets/styles/report.css'
import { Link } from 'react-router-dom';
import { parseRestianceCategory, parseMutationType } from 'assets/javascript/formatHelper'

const DetailsTable = ( { data } ) => {

    console.log(data)
    const reshaped = data && Object.values(
        data.reduce((acc, item) => {
        const key = item.mutation_id;

        if (!acc[key]) {
            acc[key] = {
            mutation_id: item.mutation_id,
            aa_position: item.aa_position,
            alt_residue: item.alt_residue,
            reference_accession: item.reference_accession,
            resistance: []
            };
        }

        const exists = acc[key].resistance.some(
            r =>
            r.drug === item.drug &&
            r.resistance_category === item.resistance_category
        );

        if (!exists) {
            acc[key].resistance.push({
            resistance_category: item.resistance_category,
            drug: item.drug,
            drug_category: item.drug_category,
            drug_producer: item.drug_producer,
            pubmed_id: item.pubmed_id,
            in_vitro_max_ec50_midpoint: item.in_vitro_max_ec50_midpoint,
            in_vivo_baseline: item.in_vivo_baseline,
            in_vivo_treatment_emergent: item.in_vivo_treatment_emergent, 
            });
        }

        return acc;
        }, {})
    );



    return (
       <table className= "table table-striped table-bordered table-font-12" id="resistanceFinding">
            <thead>
                <tr>
                    <th>Virus Protein</th>
                    <th>Polymorphism</th>
                    <th>Genotype / Subtype</th>
                    <th>Resisted Drug</th>
                    <th>Resistance Category</th>
                    <th>EC<sub>50</sub> fold change <em>in vitro</em></th>
                    <th>Clinical trials / Study Cohort</th>
                    <th>Associated drug regimens</th>
                    <th>Found at baseline?</th>
                    <th>Treatment-emergent?</th>
                    <th>Reference</th>
                </tr>
            </thead>

           <tbody>
            {reshaped.map((polymorphism, i) => {
                const rowSpan = polymorphism.resistance.length;

                return polymorphism.resistance.map((r, j) => (
                <tr key={`${i}-${j}`}>
                    {j === 0 && (
                    <>
                        <td rowSpan={rowSpan}>
                            {polymorphism.mutation_id.split(':')[0]}
                        </td>
                        <td rowSpan={rowSpan}>
                            <Link className='gdb-link' to={`/reference/${polymorphism.reference_accession}` }> {polymorphism.aa_position}{<b>{polymorphism.alt_residue}</b>}</Link>
                        </td>
                        
                        <td rowSpan={rowSpan}>
                            -
                            {/* <Link className='gdb-link' to={`/reference/${polymorphism.reference_accession}` }> {polymorphism.reference_accession} </Link> */}
                        </td>
                        
                    </>
                    )}

                    <td>
                        {r.drug}
                        <br></br>
                        <span style={{fontSize:'10px'}}><em>{r.drug_category}</em></span>
                    </td>
                    <td>{parseRestianceCategory(r.resistance_category)}</td>
                    <td>{r.in_vitro_max_ec50_midpoint ? r.in_vitro_max_ec50_midpoint : "-"}</td>
                    <td></td>
                    <td></td>
                    <td>{r.in_vivo_baseline ? "Yes" : "-"}</td>
                    <td>{r.in_vivo_treatment_emergent ? "Yes" : "-"}</td>
                    <td>
                        {r.pubmed_id.split(';').map((pubmed, index) => (
                            <span key={pubmed}>
                                <Link 
                                    // className='gdb-link' 
                                    to={`https://www.ncbi.nlm.nih.gov/pubmed/${pubmed}`} 
                                    target="_blank"> 
                                        {pubmed} 
                                </Link> 
                                {index < r.pubmed_id.split(';').length - 1 && ", "}
                            </span>
                        ))}
                    </td>

                </tr>
                ));
            })}
            </tbody>
        </table>

    );
};

export default DetailsTable;
