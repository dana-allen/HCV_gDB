import { Link } from 'react-router-dom';

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
                    <th>Polymorphism</th>
                    <th>Type</th>
                    <th>Drug</th>
                </tr>
            </thead>
            <tbody>
                
                {data.map((polymorphism, i) => (
                    <tr key={i} id={i}>
                       <td>{polymorphism.signature_id.split(':')[0]}</td>
                        <td><Link className='gdb-link' to={`/polymorphism/${polymorphism.signature_id}`}>{polymorphism.signature_id.split(':')[1]}</Link></td>
                        <td>{polymorphism.signature_kind}</td>
                        <td>{polymorphism.drugs.map(d => d).join(", ")}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default PolymorphismsTable;
