import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'

import { parseRestianceCategory, parseMutationType } from 'assets/javascript/formatHelper'


// Stylesheets
import 'assets/styles/tables.css'


const PolymorphismsTable = ( { data=null, type=null } ) => {

    if (!Array.isArray(data) || data.length === 0) {
        return <div>No data found...</div>; // or a loader / empty state
    }

    return (
        <table className="table table-striped table-bordered table-font-12">
            <thead>
                <tr>
                    <th>Genotype / Subtype</th>
                    <th>Gene</th>
                    <th>Mutation</th>
                    {/* <th>Reference</th> */}
                    <th>Drug</th>
                    <th>Resistance Category*</th>
                    <th>EC<sub>50</sub> fold change <em>in vitro</em></th>
                    <th>Clinical trials / study cohort</th>
                    <th>Associated drug regimens</th>
                    <th>Found at baseline?</th>
                    <th>Treatment-emergent?</th>
                    <th>Reference</th>
                </tr>
            </thead>

            
            <tbody>
                {data.map((alignment) => {
                    const mutations = Object.values(alignment.mutations);

                    return mutations.map((polymorphism, mutationIndex) => {
                        const resistance = polymorphism.resistance;

                        return resistance.map((r, resistanceIndex) => (
                            <tr key={`${alignment.alignment_name}-${polymorphism.mutation_id}-${r.drug}-${resistanceIndex}`}>

                                {/* Alignment + mutation information */}
                                {resistanceIndex === 0 && (
                                    <>
                                        <td rowSpan={resistance.length}>
                                            {alignment.alignment_name.split("_")[1]}
                                        </td>

                                        <td rowSpan={resistance.length}>
                                            {polymorphism.signature_id.split(":")[0]}
                                        </td>

                                        <td rowSpan={resistance.length}>
                                            {polymorphism.signature_id.split(":")[1]}
                                        </td>

                                        {/* <td rowSpan={resistance.length}>
                                            <Link
                                                className="gdb-link"
                                                to={`/reference/${polymorphism.reference_accession}`}
                                            >
                                                {polymorphism.reference_accession}
                                            </Link>
                                        </td> */}
                                    </>
                                )}

                                {/* Drug */}
                                <td>
                                    {r.drug}
                                    <br />
                                    <span style={{ fontSize: "10px" }}>
                                        <em>{r.drug_category}</em>
                                    </span>
                                </td>

                                {/* Resistance category */}
                                <td>
                                    {parseRestianceCategory(r.resistance_category)}
                                </td>

                                {/* In vitro */}
                                <td>
                                    {r.in_vitro_max_ec50_midpoint
                                        ? r.in_vitro_max_ec50_midpoint
                                        : "-"}
                                </td>

                                <td>
                                    {r.drug_trials.map((trial, index) => (
                                        <>
                                            {trial.phdr_clinical_trial_id && 
                                                <span className='size-12-font' key={index}>
                                                    
                                                    <>
                                                        {trial.trial_nct_id ? 
                                                            <Link
                                                                className="gdb-link"
                                                                to={`https://clinicaltrials.gov/study/${trial.trial_nct_id}`}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                            >
                                                            {trial.trial_display_name}
                                                            </Link> :
                                                            <>{trial.trial_display_name}</>
                                                        
                                                        }
                                                        </>
                                                    
                                                    {index < r.drug_trials.length - 1 && ", "}
                                                </span>
                                            }
                                        </>
                                    ))}
                                </td>

                                <td>
                                    {r.drug_regimen.map((regimen, index) => (
                                        <>
                                            {regimen.phdr_regimen_id && 
                                                <span key={index}>
                                                    {regimen.phdr_regimen_id && regimen.phdr_regimen_id.replaceAll("_", "/")}
                                                    {index < r.drug_regimen.length - 1 && "; "}
                                                </span>
                                            }
                                        </>
                                    ))}
                                </td>
                                

                                {/* In vivo baseline */}
                                <td>
                                    {r.in_vivo_baseline ? "Yes" : "-"}
                                </td>

                                {/* In vivo treatment emergent */}
                                <td>
                                    {r.in_vivo_treatment_emergent ? "Yes" : "-"}
                                </td>

                                {/* PubMed */}
                                <td>
                                    {r.pubmed_id &&
                                        r.pubmed_id.split(";").map((pubmed, j) => (
                                            <span>
                                                <Link
                                                    className="gdb-link"
                                                    to={`https://www.ncbi.nlm.nih.gov/pubmed/${pubmed}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    {/* <FontAwesomeIcon icon={faLink} /> PubMed {pubmed} */}
                                                    {pubmed}
                                                    {j < r.pubmed_id.length - 1 && ", "}
                                                </Link>
                                            </span>
                                        ))}
                                </td>

                            </tr>
                        ));
                    });
                })}
            </tbody>

        </table>
    );
};

export default PolymorphismsTable;
