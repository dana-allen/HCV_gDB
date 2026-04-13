
import useFetch from "./useFetch";

function useTaxonomy(taxa_level, params) {
    
    const query_params = new URLSearchParams(params).toString();
    const url = `${`/api/taxonomy/${taxa_level}`}${query_params ? `?${query_params}` : ''}`;
    const { data, ...rest } = useFetch(url);
    return { data, ...rest };

};

export default useTaxonomy;