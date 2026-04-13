import { formatString } from 'assets/javascript/formatHelper'

const RegionDetails = ({ country }) => {
    
    return (
        <div >
            <h3>{country.display_name} ({country.id_code})</h3>
            <div style={{ marginBottom: 12, fontSize:"14px" }}>

                {country.count && 
                    <div><em>Sequences:</em> 
                        {country.count? `${country.count.toLocaleString()}`:"-"}  
                        {country.percentage && ` / ${country.percentage}%`}
                    </div>
                }    

                {country.m49_region_id && 
                    <div><em>Region:</em> 
                        {country.m49_region_id ? `${formatString(country.m49_region_id)}`:"-"} / 
                        {country.m49_sub_region_id ? ` ${formatString(country.m49_sub_region_id)}`:" -"}
                    </div>
                }

                {country.development_status && 

                    <div>
                        <em>Development Status:</em> {formatString(country.development_status)}

                        {country.development_status === 'developing' && (
                            <ul>
                                {country.status.map((i, index) => (
                                    <li key={index}>{i}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                }
            </div>
        </div>
    );
};

export default RegionDetails;