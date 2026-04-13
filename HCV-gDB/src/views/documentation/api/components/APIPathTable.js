import React from "react";
import { Link } from 'react-router-dom';
import 'assets/styles/tables.css'

const APIPathTable = ({api}) => {

    return (
        <div >  
            {api["get"]["parameters"].length > 0 ?
            <table className="table table-striped table-bordered table-font-12">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Default</th>
                        <th>Required</th>
                        <th>Example</th>
                    </tr>
                </thead>
                <tbody>
                    {api["get"]["parameters"].map((info) =>
                        <tr>
                            <td>{info.name}</td>
                            <td><em>{info.schema.type}</em></td>
                            <td>
                                {info.description}
                                <br></br>{info["external_link"] != undefined && <Link to='/here'>View the available options.</Link>}
                            </td>
                            <td>{info.default ? info.default : '-'}</td>
                            <td style={{ 
                                backgroundColor: info.required ? '#d4edda' : 'transparent',
                            }}>{info.required ? 'Yes':'No'}</td>
                            <td><em>{info.example}</em></td>
                        </tr>
                    )}
                 
                </tbody>
            </table> : <p>No required parameters</p> }
            </div>
    )
};

export default APIPathTable;