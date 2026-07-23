
import useFetch from "./useFetch";

function useParamsFetch(url_path, params) {
    
    const query_params = new URLSearchParams(params).toString();
    const url = `${`${url_path}`}${query_params ? `?${query_params}` : ''}`;
    const { data, ...rest } = useFetch(url);
    return { data, ...rest };

};

export default useParamsFetch;