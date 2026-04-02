import 'assets/styles/tables.css'

const GenomeRegionAnnotationsTable = ( { genome, primary_accession } ) => {
    
    return (
        
        <table className="table table-nonfluid table-striped table-bordered table-font-12">
            <thead>
                <tr>
                    <th rowSpan={2}>Region</th>
                    <th colSpan={2}>
                        Nucleotides
                        <br />
                        <span className='th-sub-header'>
                            Based directly on {primary_accession} reference sequence
                        </span>
                    </th>
                    <th colSpan={2}>
                        Codons
                        <br />
                        <span className='th-sub-header'>
                            Codons are numbered 1 at the start of the region
                        </span>
                    </th>
                </tr>
                <tr>
                    
                    <th>Start</th>
                    <th>End</th>
                    <th>Start</th>
                    <th>End</th>
                </tr>
            </thead>
            <tbody>
            {genome.map((feature, featureId) => (
                <tr key={featureId}>
                    <td>{feature.product} </td>
                    <td>{feature.cds_start}</td>
                    <td>{feature.cds_end}</td>
                    <td>{feature.codon_start}</td>
                    <td>{feature.codon_end}</td>
                </tr>
            ))}
            </tbody>
        </table>
             
    );
};
 
export default GenomeRegionAnnotationsTable;