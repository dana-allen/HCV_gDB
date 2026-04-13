import useFetch from "./useFetch";
// import { buildGenomeViewerResults } from 'assets/javascript/genomeViewerHelper';
import { formatMetaDataRegions } from 'assets/javascript/formatHelper'

function useDrugResistance(id) {
    
    // const url = `${process.env.REACT_APP_BACKEND_URL}/api/sequence/${id}`;
    const url = `/api/sequence/${id}`;

    // const { data, ...rest } = useFetch(id ? url : null);

    // const {
    //     accessions
    // } = data|| {};
    const accessions = [{"primary_accession": "", "combination_id":"", "combination_status":"", "mutations_detected":"", "resistance_category":"", "drug":""}]
    
    // const genomeViewerData = data ? buildGenomeViewerResults(data) : []

    return { accessions };

};

export default useDrugResistance;