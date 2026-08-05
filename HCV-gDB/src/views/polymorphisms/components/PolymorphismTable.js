import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'

import { parseRestianceCategory, parseMutationType } from 'assets/javascript/formatHelper'
import { aaColors } from 'assets/javascript/sequenceViewerHelper';

// Stylesheets
import 'assets/styles/tables.css'


const PolymorphismsTable = ( { data=null, type=null } ) => {

    if (!Array.isArray(data) || data.length === 0) {
        return <div>No data found...</div>; // or a loader / empty state
    }
    console.log(data)
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
                                            {polymorphism.mutation_id.split(":")[0]}
                                        </td>

                                        <td rowSpan={resistance.length}>
                                            {polymorphism.aa_position}
                                            <b style={{ color: aaColors[polymorphism.alt_residue] }}>
                                                {polymorphism.alt_residue}
                                            </b>
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
                                        r.pubmed_id.split(";").map((pubmed) => (
                                            <div key={pubmed}>
                                                <Link
                                                    className="gdb-link"
                                                    to={`https://www.ncbi.nlm.nih.gov/pubmed/${pubmed}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    <FontAwesomeIcon icon={faLink} /> PubMed {pubmed}
                                                </Link>
                                            </div>
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
