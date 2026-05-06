import { Link } from 'react-router-dom';

// Stylesheets
import 'assets/styles/tables.css'

const SampleDetails = ({ meta_data, regions, taxanomic_info }) => {
    console.log("META DATA", meta_data)
    return (
        <div >
            <h4 className="title-sub">Sample Details</h4>
            <table className="table table-striped table-bordered table-font-12">
                <tbody>
                    {meta_data.Parsed_strain && 
                        <tr>
                            <td><b>Strain</b></td>
                            <td>{meta_data.Parsed_strain ?<Link className="gdb-link" to={`/strain/${encodeURIComponent(meta_data.Parsed_strain )}`} >
                                        {meta_data.Parsed_strain }
                                    </Link> : "-"}</td>
                        </tr>
                    }
                    <tr>
                        <td><b>Isolate ID</b></td>
                        <td>{meta_data.isolate ? meta_data.isolate  : "-" }</td>
                    </tr>
                    <tr>
                        <td><b>Isolation Source</b></td>
                        <td>{meta_data.isolation_source ? `${meta_data.isolation_source}`:"-"}</td>
                    </tr>
                    {taxanomic_info ? 
                        <>
                                {taxanomic_info.phylum &&
                                <tr>
                                    <td><b>Phylum</b></td>
                                    <td>{taxanomic_info.phylum}</td>

                                </tr>
                            }
                            { taxanomic_info.class && 
                                <tr>
                                    <td><b>Class</b></td>
                                    <td>{taxanomic_info.class}</td>

                                </tr>
                            }                   
                            {taxanomic_info.order_category && 
                                <tr>
                                    <td><b>Order</b></td>
                                    <td>{taxanomic_info.order_category}</td>

                                </tr>

                            }
                            
                            {taxanomic_info.family && 
                                <tr>
                                    <td><b>Family</b></td>
                                    <td>{taxanomic_info.family}</td>

                                </tr>
                            }

                        
                            {taxanomic_info.genus &&
                                <tr>
                                    <td><b>Genus</b></td>
                                    <td>{taxanomic_info.genus}</td>

                                </tr>
                            }
                            
                            {taxanomic_info.species && 
                                <tr>
                                    <td><b>Species</b></td>
                                    <td><em>{taxanomic_info.species}</em></td>
                                </tr>
                            }
                        </> :
                        <tr>
                            <td><b>Host</b></td>
                            <td>{meta_data.host ? meta_data.host : '-'}</td>
                        </tr>
                    }
                    
                    
                    {regions && 
                        <>
                            <tr>
                                <td><b>Country of Origin</b></td>
                                <td>
                                    {regions.display_name ? `${regions.display_name} ${regions.id ? 
                                    `(${regions.id}) ${meta_data.geo_loc ? `/ ${meta_data.geo_loc}` : ''}`  :""}`:"-" }
                                </td>
                            </tr>
                            <tr>
                                <td><b>Country Development Status</b></td>
                                <td className='capitalize-text' >
                                    {regions.development_status ? `${regions.development_status} 
                                    ${regions.development_status=='developing' ? `/ ${regions.status}`:""}`:"-"}
                                </td>
                            </tr>
                            <tr>
                                <td><b>Global Region</b></td>
                                <td className='capitalize-text' >
                                    {regions.m49_region_id ? `${regions.m49_region_id}`:"-"} / 
                                    {regions.m49_sub_region_id ? ` ${regions.m49_sub_region_id}`:" -"}
                                </td>
                            </tr>
                        </>
                    }
                </tbody>
            </table>
        </div>
    );
};

export default SampleDetails;