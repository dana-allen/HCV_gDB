import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// Hooks and Contexts
import { useLoadingWheelHandler, useErrorHandler } from 'contexts';
import { useReference } from 'hooks'

// Specific Components
import GenomeRegionAnnotationsTable from "./components/GenomeRegionAnnotationsTable";

// Generic Components
import PagingButtons from 'components/buttons/PagingButtons';
import GenomeViewer from 'components/genomeViewer/GenomeViewer';

const Reference = () => {

    const { id } = useParams();
    const [startRecord, setStartRecord] = useState('')
    const [endRecord, setEndRecord] = useState('')
    const [genomeData, setGenomeData] = useState(null)


    const handlePageChange = (items) => {
        setGenomeData({features, query_aligned_sequences: items[0], reference_alignment_sequence, id})
        setStartRecord(items[1]);
        setEndRecord(items[2])
    };

    // Contexts
    const { triggerLoadingWheel } = useLoadingWheelHandler();
    const { triggerError } = useErrorHandler();

    const { query_aligned_sequences, features, reference_alignment_sequence, loading, error } = useReference(id);
    
    useEffect(() => {

        triggerLoadingWheel(loading)
        if (error) triggerError(error);

    }, [loading, error]);

    return (
        
        <div className='container'>
            <div className='row'>
                <h2> Reference {id}</h2>
                <p>
                    Underlying sequence:&nbsp;
                    <Link className='gdb-link' to={`/sequence/${id}`}>{id}</Link>
                    <br></br>
                </p>
                <div className='row'>
                    <h4 className="title-sub">Genome region annotations</h4>
                    {features && <GenomeRegionAnnotationsTable genome={features} primary_accession={id} />}
                </div>
                
                {query_aligned_sequences && 
                    <div>
                        <h4 className="title-sub">Aligned Sequences</h4> 
                        <br></br>
                        <br></br>
                        <div>
                            <div><PagingButtons data={query_aligned_sequences} onPageChange={handlePageChange}> </PagingButtons></div>
                            <a>Aligned Sequences {startRecord} to {endRecord} of {query_aligned_sequences.length}</a>
                            {/* <AlignedSequencesTable data={currentItems}/> */}
                            { genomeData && <GenomeViewer data={genomeData} /> }
                        </div>
                    </div>
                }

            </div> 
            <br></br>
        </div>
       
    );
};
 
export default Reference;

