function useDrugResistance(id) {
    
    // const url = `${process.env.REACT_APP_BACKEND_URL}/api/sequence/${id}`;
    const url = `/api/sequence/${id}`;

    // const { data, ...rest } = useFetch(id ? url : null);

    // const {
    //     accessions
    // } = data|| {};
    const accessions = [{"primary_accession": "AB008084", "combination_id":"123", "combination_status":"active", "mutations_detected":"10", "resistance_category":"I", "drug":"glecaprevir"}]
    

    return { accessions };

};

export default useDrugResistance;