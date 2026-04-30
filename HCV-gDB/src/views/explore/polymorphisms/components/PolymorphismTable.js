import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink} from '@fortawesome/free-solid-svg-icons'

import { parseRestianceCategory, parseMutationType} from 'assets/javascript/formatHelper'
import { aaColors } from 'assets/javascript/sequenceViewerHelper';

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
                    <th>Gene</th>
                    <th>Mutation</th>
                    <th>Reference</th>
                    <th>Drug</th>
                    <th>Resistance Category*</th>
                    
                    {/* <th>Mutation</th>
                    <th>Reference Accssion</th> */}
                </tr>
            </thead>
            <tbody>
                {data.map((polymorphism, i) => {
                    const rowSpan = polymorphism.resistance.length;

                    return polymorphism.resistance.map((r, j) => (
                    <tr key={`${i}-${j}`}>
                        {j === 0 && (
                        <>
                            <td rowSpan={rowSpan}>
                            {polymorphism.mutation_id.split(':')[0]}
                            </td>
                            <td rowSpan={rowSpan}>
                                {polymorphism.aa_position}{<b style={{color:aaColors[polymorphism.alt_residue]}}>{polymorphism.alt_residue}</b>}
                            </td>
                            
                            <td rowSpan={rowSpan}>
                                <Link className='gdb-link' to={`/reference/${polymorphism.reference_accession}` }> {polymorphism.reference_accession} </Link>
                            </td>
                            
                        </>
                        )}
                        <td>{r.drug}</td>
                        <td>{parseRestianceCategory(r.resistance_category)}</td>

                    </tr>
                    ));
                })}
                </tbody>

        </table>
    );
};

export default PolymorphismsTable;
