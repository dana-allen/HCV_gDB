import { useState, useEffect } from "react";
import Taxonium from "taxonium-component";
import { Button } from 'react-bootstrap';
import { useDownload, usePhylogenyTree, useFetch } from 'hooks'
import { useLoadingWheelHandler, useErrorHandler } from 'contexts';

import PhylogenyFilter from "./PhylogenyFilter";
// Style Sheets 
import 'assets/styles/phylogeny.css' //VERY IMPORTANT This class controls the taxonium component tree height

const Phylogeny = () => {
  // Contexts
  const { triggerLoadingWheel } = useLoadingWheelHandler();
  const { triggerError } = useErrorHandler();
  const [sourceData, setSourceData] = useState(null);

  const [params, setParams] = useState("")

  const { tree, meta_data, loading, error } = usePhylogenyTree(params);
  const { downloadFile } = useDownload();
  console.log("new tree", tree)

  const handleQuery = (e) => {
    console.log("query", e)
  }
//   const default_query =  {
//   // srch: JSON.stringify([]),
//   // enabled: JSON.stringify({ [first_search.key]: true }),
//   // backend: "",
//   // xType: "x_dist",
//   // mutationTypesEnabled: JSON.stringify({ aa: true, nt: false }),
//   // treenomeEnabled: false,
// };
  const default_query = {
    "srch": "[{\"key\":\"aa1\",\"type\":\"name\",\"method\":\"text_match\",\"text\":\"AF36\",\"gene\":\"S\",\"position\":484,\"new_residue\":\"any\",\"min_tips\":0}],",
    "srch": "[{\"key\":\"aa1\",\"type\":\"name\",\"method\":\"text_match\",\"text\":\"AF365\",\"gene\":\"S\",\"position\":484,\"new_residue\":\"any\",\"min_tips\":0}]"

}

  const [showTree, setShowTree] = useState(true)
  useEffect(() => {
  if (tree) {
    setTimeout(() => {
      setSourceData({
        status: "loaded",
        filename: `tree-${Date.now()}.nwk`,
        data: tree.newick,
        filetype: "nwk",
        metadata: {
          filename: "metadata.csv",
          data: meta_data,
          status: "loaded",
          filetype: "meta_csv",
        },
      });
    }, 50); // 👈 small delay helps some libs
  }
}, [tree]);

  useEffect(() => {
    triggerLoadingWheel(loading)
    triggerError(error)
  }, [loading, error]);
  // console.log("updateQuery:", updateQuery);

  const handleParams = (e) => {
    console.log(e)
    setParams({"tree_type":e})

  }

  useEffect(() => {

  }, sourceData)
  return (
    <div className="container" >
      <h2>Phylogenetic Tree</h2>

      <p>
        This provides an interactive phylogenic tree. Within a tree, the tips are named by primary accession and coloured by various metadata, 
        which may be chosen by selecting Colour by. The tree may be searched for tip names or metadata by entering text into the Search box.
      </p>


      <PhylogenyFilter label={"tree"} idKey={"name"} handleId={handleParams}/>
      <div>
        {tree && <h2>{tree.tree_name}</h2> }
        {tree &&
          <div style={{'textAlign':'right'}}> 
            <Button size='sm' className='btn-main-filled' onClick={() => downloadFile(tree.newick, tree.tree_name+".newick", "newick")}>
              Download Tree
            </Button> 
          </div>
        }
        {/* {sourceData && <Taxonium sourceData={sourceData} query={default_query}/> } */}
        {showTree && sourceData && <Taxonium key={tree.tree_name} sourceData={sourceData} /> }
        {/* {sourceData && <Taxonium sourceData={sourceData} updateQuery={(query) => {
          console.log("Query updated:", query);
          // Do whatever you want with the query object
        }}/>} */}
      </div>
      
    </div>
  );
};

export default Phylogeny;

