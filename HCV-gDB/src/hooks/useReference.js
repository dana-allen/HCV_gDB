import useFetch from "./useFetch";


function useReference(id) {
    
    const url = `/api/sequence/reference/${id}`;

    const { data, ...rest } = useFetch(id ? url : null);

    const {
        query_aligned_sequences,
        features,
        reference_alignment_sequence,
        reference_accession,
        reference_meta_data,
    } = data|| {};

    const genome_viewer_data = {features, query_aligned_sequences, reference_alignment_sequence, reference_accession}

    return { 
                query_aligned_sequences,
                features,
                reference_alignment_sequence,
                reference_meta_data,
                genome_viewer_data,
                ...rest
            };

};

export default useReference;
