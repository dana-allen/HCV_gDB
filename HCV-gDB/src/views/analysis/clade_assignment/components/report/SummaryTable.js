import React from 'react';
import 'assets/styles/report.css'
import { Link } from 'react-router-dom';

export const getResistanceLevel = (categories) => {
    var resistance = []
    if (categories['category_I']) {
        resistance = ['Resistance detected', 'resistance_detected']
    } else if (categories['category_II']) {
        resistance = ['Probable resistance detected', 'probable_resistance_detected']
    } else if (categories['category_III']) {
        resistance = ['Possible resistance detected', 'possible_resistance_detected']
    } else {
        resistance = ['No significant resistance detected', 'no_significant_resistance_detected']
    }

    return resistance
}

const SummaryTable = ( { data } ) => {
    console.log(data)

    const renderMutations = (mutations) => {
    if (!mutations) {
        return "-";
    }

    return mutations.map((mutation, index) => (
        <span key={mutation.signature_id}>
            <Link
                // className="custom-link"
                to={`/polymorphism/${mutation.signature_id}`}
            >
                {mutation.signature_id.split(":")[1]}
            </Link>
            {index < mutations.length - 1 && ", "}
        </span>
    ));
};

    return (
        <div>
            
            

       <table className= "table table-striped table-bordered table-font-12" id="drugScores">
            <thead>
                <tr>
                    <th rowSpan="2">Drug category</th>
                    <th rowSpan="2">Drug</th>
                    <th colSpan="4">
                        Resistance-associated polymorphisms<sup>1</sup>
                    </th>
                    <th rowSpan="2" colSpan="2">
                        Resistance detection level<sup>2</sup>
                    </th>
                </tr>

                <tr>
                    <th>Category I</th>
                    <th>Category II</th>
                    <th>Category III</th>
                    <th>Insignificant</th>
                </tr>
            </thead>

            <tbody>
                {Object.entries(data).map(([protein, drugs]) => {
                    const drugEntries = Object.entries(drugs);
                    
                    return drugEntries.map(([drug, categories], index) => (
                        <tr key={`${protein}-${drug}`}>

                            {/* Only render the protein cell on the first row */}
                            {index === 0 && (
                                <td rowSpan={drugEntries.length}>
                                    {protein}
                                </td>
                            )}

                            <td>{drug}</td>

                            {/* Category I */}
                            <td>
                                {renderMutations(categories["category_I"])}
                            </td>

                            {/* Category II */}
                            <td>
                                {renderMutations(categories["category_II"])}
                            </td>

                            {/* Category III */}
                            <td>
                                {renderMutations(categories["category_III"])}
                            </td>

                            {/* Insignificant */}
                            <td>
                                {renderMutations(categories["insignificant"])}
                            </td>

                            {/* Resistance detection level */}
                            <td>{getResistanceLevel(categories)[0]}</td>
                            <td class={`resistanceBlock resistanceColourCode_${getResistanceLevel(categories)[1]}`}><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td>

                        </tr>
                    ));
                })}
            </tbody>
        </table>

                </div>

    );
};

export default SummaryTable;
