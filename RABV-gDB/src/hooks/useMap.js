import useFetch from "./useFetch";
import { parseCountryData } from "utils/mapHelper";


function useMap(params) {
    
    const query_params = new URLSearchParams(params).toString();
    const url = `${'/api/sequences/global/'}${query_params ? `?${query_params}` : ''}`;

    const { data, ...rest } = useFetch(url);

    const maxCount = data ? data.length > 0 && data.at(-1).sequence_count : 0
    const minCount = data ? data.length > 0 && data[0].sequence_count : 0
    const countryData = data ? data.length > 0 && parseCountryData(data) : [];

    return { countryData, maxCount, minCount, ...rest };

};

export default useMap;