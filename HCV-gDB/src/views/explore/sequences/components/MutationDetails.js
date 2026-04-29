// Stylesheets
import 'assets/styles/tables.css'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const MutationDetails = ({ mutations }) => {

    
    return (
        <div className='row'>
            <div className="col-md-6">
                <h4 className='title-sub'>Mutations</h4>
                <Link className='custom-link' style={{'float':'right'}}>View all mutations</Link>
            </div>
            <div>
                {mutations.map((mutation, mutationIndex) => {
                    console.log("mutations", mutation)
                    const row = mutation ? mutation.split(";") : null
                    return (
                        <>
                            {row &&
                                <table 
                                    key={`table-${mutationIndex}`}
                                    className="table table-striped table-bordered table-font-12 table-width-50" 
                                >
                                    <thead>
                                        <tr>
                                            <th>Gene</th>
                                            <th>Mutation Present</th>
                                        </tr>
                                    </thead>
                                    {row.map((item, rowIndex) => {
                                        const k = item.split(":")
                                        return (
                                            <tbody key={`tbody-${rowIndex}`}>
                                                <tr>
                                                    <td>{k[0]}</td>
                                                    <td><Link className='custom-link'>{k[1]}</Link></td>
                                                </tr>
                                            </tbody>
                                        )
                                    })}
                                </table>
                            }
                        </>
                    )
                })}
            </div>
        </div>
    );
};

export default MutationDetails;