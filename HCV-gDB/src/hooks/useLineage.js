import useFetch from "./useFetch";


function useLineage() {
    
    const url = `/api/lineages/`;

    const { data, ...rest } = useFetch(url);
    const lineageTree = data ? data : [];

    return { lineageTree, ...rest };

};

export default useLineage;