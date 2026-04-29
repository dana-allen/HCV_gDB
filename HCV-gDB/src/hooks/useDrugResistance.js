function useDrugResistance(id) {
    
    // const url = `${process.env.REACT_APP_BACKEND_URL}/api/sequence/${id}`;
    const url = `/api/sequence/${id}`;

    // const { data, ...rest } = useFetch(id ? url : null);

    // const {
    //     accessions
    // } = data|| {};
    // const accessions = [{"primary_accession": "AB008084", "combination_id":"123", "combination_status":"active", "mutations_detected":"10", "resistance_category":"I", "drug":"glecaprevir"}]
    const accessions = [{primary_accession:"AB030907",	relevant_mutations_present:"NS3:168T;NS3:170A;NS3:180V;NS3:54A;NS3:55A;NS3:62T;NS3:80L;NS5A:129H;NS5A:24A;NS5A:24S;NS5A:28L;NS5A:28T;NS5A:29R;NS5A:30G;NS5A:30L;NS5A:37L;NS5A:54H;NS5A:58L;NS5A:58S;NS5A:62A;NS5B:100R"}]
	
    return { accessions };

};

export default useDrugResistance;