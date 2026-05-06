import { useEffect, useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';

// Hooks and Contexts
import { useLoadingWheelHandler, useErrorHandler } from 'contexts';
import { useReference } from 'hooks'

// Specific Components
import GenomeRegionAnnotationsTable from "./components/GenomeRegionAnnotationsTable";

// Generic Components
import PagingButtonsSlim from 'components/buttons/PagingButtonsSlim';
import GenomeViewer from 'components/genomeViewer/GenomeViewer';

const Reference = () => {

    const { id } = useParams();
    const [startRecord, setStartRecord] = useState('');
    const [endRecord, setEndRecord] = useState('');
    const [currentItems, setCurrentItems] = useState([]);
    const [search, setSearch] = useState('');
    const [genomeData, setGenomeData] = useState()

    const handlePageChange = (items) => {
        setGenomeData({features, query_aligned_sequences: items[0], reference_alignment_sequence, id})
        setStartRecord(items[1]);
        setEndRecord(items[2])
    };

    // Contexts
    const { triggerLoadingWheel } = useLoadingWheelHandler();
    const { triggerError } = useErrorHandler();

    const { query_aligned_sequences, features, reference_alignment_sequence, loading, error } = useReference(id);
    
    console.log("QUERY ALIGNED", query_aligned_sequences)
    useEffect(() => {

        triggerLoadingWheel(loading)
        if (error) triggerError(error);

    }, [loading, error]);


    // 🔍 Filter data based on search
    const filteredData = useMemo(() => {
        if (!Array.isArray(query_aligned_sequences)) return [];
        return query_aligned_sequences.filter(seq =>
            seq.query_sequence_id
                ?.toLowerCase()
                .includes(search.toLowerCase().trim())
        );
    }, [query_aligned_sequences, search]);
    
    useEffect(() => {
        if (filteredData.length > 0) {
            handlePageChange([filteredData.slice(0, 10), 1, Math.min(10, filteredData.length)]);
        } else {
            setCurrentItems([]);
            setStartRecord(0);
            setEndRecord(0);
        }
    }, [search, filteredData]);

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
                            <div className='col-6' style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                             <div>
                                <span className="size-12-font" style={{ fontWeight: "normal" }}>
                                    Aligned Sequences {startRecord} to {endRecord} of {query_aligned_sequences.length}
                                </span>
                            </div>
                            {/* Top row: search + paging */}
                            <div
                                style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px"
                                }}
                            >
                                {/* Search input */}
                                <div style={{ position: "relative", flex: 1 }}>
                                <i
                                    className="fa fa-search"
                                    style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "8px",
                                    transform: "translateY(-50%)",
                                    color: "#888"
                                    }}
                                ></i>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search primary accession..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    style={{
                                    paddingLeft: "28px",
                                    fontSize: "12px",
                                    height: "30px"
                                    }}
                                />
                                </div>

                                {/* Paging buttons */}
                                <div style={{ whiteSpace: "nowrap" }}>
                                <PagingButtonsSlim
                                    data={filteredData}
                                    onPageChange={handlePageChange}
                                />
                                </div>
                            </div>

                            {/* Bottom row: sequence info */}
                           

                            </div>
                            {/* <div><PagingButtons data={query_aligned_sequences} onPageChange={handlePageChange}> </PagingButtons></div> */}

                            
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

