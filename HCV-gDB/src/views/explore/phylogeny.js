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

  const [params, setParams] = useState({'tree_type':'iqtree'})

  const { tree, meta_data, loading, error } = usePhylogenyTree(params);
  const { downloadFile } = useDownload();
  console.log("new tree", tree)

  const handleQuery = (e) => {
    console.log("query", e)
  }


  const [showTree, setShowTree] = useState(true)
  useEffect(() => {
  if (tree) {
    console.log('tree', tree)
    setSourceData({
        status: "loaded",
        filename: `${tree.name}.nwk`,
        data: tree.newick,
        filetype: "nwk",
        metadata: {
          filename: "metadata.csv",
          data: meta_data,
          status: "loaded",
          filetype: "meta_csv",
        },
      });
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

  console.log('source data', sourceData)
  return (
    <div className="container" >
      <h2>Phylogenetic Tree</h2>

      <p>
        This provides an interactive phylogenic tree. Within a tree, the tips are named by primary accession and coloured by various metadata, 
        which may be chosen by selecting Colour by. The tree may be searched for tip names or metadata by entering text into the Search box.
      </p>


      <PhylogenyFilter label={"tree"} idKey={"name"} handleId={handleParams}/>
      <div>
        {tree && <h2>{tree.name}</h2> }
        {tree &&
          <div style={{'textAlign':'right'}}> 
            <Button size='sm' className='btn-main-filled' onClick={() => downloadFile(tree.newick, tree.tree_name+".newick", "newick")}>
              Download Tree
            </Button> 
          </div>
        }
        {/* {sourceData && <TaxoniumTree treeName={tree.name} treeData={sourceData}/>} */}
        {sourceData &&<Taxonium key={tree.name} sourceData={sourceData} />}
        {/* {sourceData && <Taxonium sourceData={sourceData} query={default_query}/> } */}
        {/* {showTree && sourceData && <Taxonium key={tree.tree_name} sourceData={sourceData} /> } */}
        {/* {sourceData && <Taxonium sourceData={sourceData} updateQuery={(query) => {
          console.log("Query updated:", query);
          // Do whatever you want with the query object
        }}/>} */}
      </div>
      
    </div>
  );
};

export default Phylogeny;

