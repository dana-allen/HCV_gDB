import useFetch from "./useFetch";


function usePhylogenyTree(params) {

  // const query_params = new URLSearchParams(Object.entries(params).sort()).toString();
  const query_params = null
    
  const url = `/api/phylogeny/tree/${query_params ? `?${query_params}` : ''}`;
  const { data, ...rest } = useFetch(url);

  const trees = data && data.tree

  console.log("META_DATA", data && data.meta_data)
  console.log("TREE", data)

  //  Convert to CSV text
  const csvHeader = "primary_accession,major_clade,minor_clade,collection_year,country\n";
  const csvBody = data && data.meta_data
    .map(row => `${row.primary_accession}, ${row.EPA_major_clade}, ${row.EPA_minor_clade}, ${row.collection_year}, ${row.country}`)
    .join("\n");

  const meta_data = csvHeader + csvBody;
  // const meta_data = null

  return {trees, meta_data, ...rest };

};

export default usePhylogenyTree;