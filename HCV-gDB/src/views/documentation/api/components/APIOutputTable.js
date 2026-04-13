import React from "react";

import 'assets/styles/tables.css'
const APIOutputTable = ({api}) => {

    return (
        <div >  
            {api["get"]["outputs"].length > 0 ?
            <table className="table table-striped table-bordered table-font-12">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {api["get"]["outputs"].map((info) =>
                        <tr>
                            <td>{info.name}</td>
                            <td>
                                {info.description}
                            </td>
                        </tr>
                    )}
                 
                </tbody>
            </table> : <p>No output</p> }
            </div>
    )
};

export default APIOutputTable;