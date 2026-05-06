import useFetch from "./useFetch";


function usePhylogenyTree(params) {

  const query_params = new URLSearchParams(Object.entries(params).sort()).toString();
    
  const url = `/api/phylogeny/tree/${query_params ? `?${query_params}` : ''}`;
  const { data, ...rest } = useFetch(url);

  const tree = data && data.tree

  //  Convert to CSV text
  const csvHeader = "primary_accession,major_clade,minor_clade,collection_year,country,phylum,class,order,family,genus,species\n";
  const csvBody = data && data.meta_data
    .map(row => `${row.primary_accession},${row.nearest_reference_genotype},${row.nearest_reference_subtype}, ${row.collection_year}, ${row.country}, ${row.phylum}, ${row.class}, ${row.order_category}, ${row.family}, ${row.genus}, ${row.species}`)
    .join("\n");
  console.log("HOOK TREE", tree)
  const meta_data = csvHeader + csvBody;
  // const meta_data = null

  return {tree, meta_data, ...rest };

};

export default usePhylogenyTree;