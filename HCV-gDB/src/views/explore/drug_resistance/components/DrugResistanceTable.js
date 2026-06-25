import { Link } from 'react-router-dom';


// Stylesheets
import 'assets/styles/tables.css'


const DrugResistanceTable = ( { accessions=null } ) => {
    console.log(accessions)
    if (!Array.isArray(accessions) || accessions.length === 0) {
        return <div>No data found...</div>; // or a loader / empty state
    }

    return (
        <table className="table table-striped table-bordered table-font-12">
            <thead >
                <tr>
                    <th>Primary Accession</th>
                    <th>Combination ID</th>
                    <th>Combitation Status</th>
                    <th>Mutations Detected</th>
                    <th>Resistance Category</th>
                    <th>Drug</th>
                    
                </tr>
            </thead>
            <tbody>
                
                {accessions.map((accession, i) => (
                    <tr key={i} id={i}>

                        <td><b><Link className='gdb-link' to={`/sequence/${accession.primary_accession}` }> {accession.primary_accession} </Link> </b></td>
                        <td>{accession.combination_id}</td>
                        <td>{accession.combination_status}</td>
                        <td>{accession.mutations_detected}</td>
                        <td>{accession.resistance_category}</td>
                        <td>{accession.drug}</td>
                        
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DrugResistanceTable;
