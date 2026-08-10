import React from 'react';
import 'assets/styles/report.css'
import { Link } from 'react-router-dom';
import { parseRestianceCategory, parseMutationType } from 'assets/javascript/formatHelper'

const DetailsTable = ( { data } ) => {

    const filtered_data = data && data["mutations"].filter(item => item.alignment_name =='AL_1a')

    const reshaped = data && Object.values(
        filtered_data.reduce((acc, item) => {

            // const key = item.mutation_id;
            const key = item.signature_id
            const drug_regimen_id = item.id;
            const drug_regimens = data["drug_regimen_results"].filter(item => item.phdr_alignment_ras_drug_id === drug_regimen_id).filter((item, index, array) =>
                index === array.findIndex(
                    x => x.phdr_regimen_id === item.phdr_regimen_id
                )
            );

            const drug_trials = data["drug_regimen_results"].filter(item => item.phdr_alignment_ras_drug_id === drug_regimen_id).filter((item, index, array) =>
                index === array.findIndex(
                    x => x.phdr_clinical_trial_id === item.phdr_clinical_trial_id
                )
            );

            if (!acc[key]) {
                acc[key] = {
                mutation_id: item.mutation_id,
                signature_id: item.signature_id,
                protein_name: item.protein_name,
                geno_subtype: item.alignment_name,
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
                drug_regimens: drug_regimens,
                drug_trials: drug_trials,
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
                console.log("RESHAPES", reshaped)
                const rowSpan = polymorphism.resistance.length;
                console.log(polymorphism)
                return polymorphism.resistance.map((r, j) => (
                <tr key={`${i}-${j}`}>
                    {j === 0 && (
                    <>
                        <td rowSpan={rowSpan}>
                            {polymorphism.protein_name}
                        </td>
                        <td rowSpan={rowSpan}>
                            <Link to={`/polymorphism/${polymorphism.signature_id}` }> {polymorphism.signature_id.split(":")[1]}</Link>
                        </td>
                        
                        <td rowSpan={rowSpan}>
                            {polymorphism.geno_subtype && polymorphism.geno_subtype.split('_')[1]}
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
                    <td>
                        {r.drug_trials.map((trial, index) => (
                            <span key={index}>
                                {trial.phdr_clinical_trial_id && 
                                <>
                                    {trial.trial_nct_id ? 
                                        <Link
                                            to={`https://clinicaltrials.gov/study/${trial.trial_nct_id}`}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                        {trial.trial_display_name}
                                        </Link> :
                                        <>{trial.phdr_clinical_trial_id}</>
                                    
                                    }
                                    </>
                                }
                                {index < r.drug_trials.length - 1 && ", "}
                            </span>
                        ))}
                    </td>
                    <td>
                    {r.drug_regimens && r.drug_regimens.map((regimen, index) => (
                        <span key={index}>
                            {regimen.phdr_regimen_id && regimen.phdr_regimen_id.replaceAll("_", "/")}
                            {index < r.drug_regimens.length - 1 && "; "}
                        </span>
                    ))}
                </td>
                    <td>{r.in_vivo_baseline ? "Yes" : "-"}</td>
                    <td>{r.in_vivo_treatment_emergent ? "Yes" : "-"}</td>
                    <td>
                        {r.pubmed_id && r.pubmed_id.split(';').map((pubmed, index) => (
                            <span key={pubmed}>
                                <Link 
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
