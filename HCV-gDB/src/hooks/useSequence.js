import useFetch from "./useFetch";
// import { buildGenomeViewerResults } from 'assets/javascript/genomeViewerHelper';
import { formatMetaDataRegions } from 'assets/javascript/formatHelper'

function useSequence(id) {
    
    // const url = `${process.env.REACT_APP_BACKEND_URL}/api/sequence/${id}`;
    const url = `/api/sequence/${id}`;

    const { data, ...rest } = useFetch(id ? url : null);
    console.log("DATA", data)
    const {
        meta_data,
        sequence,
        alignment,
        regions,
        insertions,
        taxanomic_info,
        mutations
    } = data|| {};

    
    // const genomeViewerData = data ? buildGenomeViewerResults(data) : []
    const genomeViewerData = []
    const formatted_regions = regions ? formatMetaDataRegions(regions) : null

    return { 
            meta_data, 
            sequence,
            alignment, 
            insertions,
            formatted_regions,
            taxanomic_info,
            mutations,
            genomeViewerData,
            ...rest
            };

};

export default useSequence;