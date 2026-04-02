import React, { useState } from 'react';
import { useDownload } from 'hooks'
import Taxonium from "taxonium-component";
import { Button } from 'react-bootstrap';
import CladeAssignmentTable from './components/CladeAssignmentTable';
import SequenceSubmission from './components/SequenceSubmission';

const CladeAssignment = () => {

    const [sourceData, setSourceData] = useState(null);

    const [tableRows, setTableRows] = useState(null)
    const { downloadFile } = useDownload();

    const handleJobFinished = (e) => {
        // 
        const data = e["results"]
        if (data) {

            const tmp_data = Object.entries(data["queries"]).map(([accession, genomeData]) => ({
                accession: accession,
                blast_ref: genomeData.blast_results?.ref ?? "",
                blast_identity: genomeData.blast_results?.identity ?? "",
                epa_ng: genomeData["epa-ng"] ? genomeData["epa-ng"] : "",
                alignment: genomeData.aligned_sequence? genomeData.aligned_sequence : ""
            }));
            setTableRows(tmp_data)

            const tmp_tree = data["tree"]
            const csvHeader = "primary_accession,query\n";
            const csvBody = tmp_data.map(row => `${row.accession},query`).join("\n");

            const meta_data = csvHeader + csvBody;
            const metadata = {
              filename: "metadata.csv",
              data: meta_data,
              status: "loaded",
              filetype: "meta_csv",
            };
            setSourceData({
                    status: "loaded",
                    filename: "tree.nwk",
                    // data: tree,
                    data: tmp_tree,
                    filetype: "nwk",
                    metadata: metadata,
                    });
        }



    }

    return (
        <div className='container'>
            <div className='row'>
                <h2>Phylogenetic Clade Assignment</h2>

                <p>
                    Submit your sequence files in FASTA nucleotide format for automated
                    alignment and clade assignment against the {process.env.REACT_APP_VIRUS_ABB}-{process.env.REACT_APP_WEB_RESOURCE}&nbsp;
                    database.
                </p>
                <p>	   
                    <b>NOTE</b>: we do not store any sequences submitted to RABV-{process.env.REACT_APP_WEB_RESOURCE}!	   
                </p>

                <SequenceSubmission onJobFinished={handleJobFinished}/>
                {tableRows && 
                    <div>
                        <br></br>
                        <hr></hr>


                        <div className="row">
                            <div className="col-md-6">
                                <h4 className='title-sub'>Clade Assignment</h4>
                            </div>
                            <CladeAssignmentTable tableRows={tableRows}/>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <h4 className='title-sub'>Phylogenetic Tree</h4>
                            </div>
                            <div className="col-md-6">
                                {sourceData &&
                                    <div style={{'textAlign':'right'}}> 
                                        <Button size='sm' className='btn-main-filled' onClick={() => downloadFile(sourceData.data, sourceData.filename)}>
                                        Download Tree
                                        </Button> 
                                    </div>
                                }
                                
                            </div>
                            {sourceData && <Taxonium sourceData={sourceData}/> }
                        </div>
                    </div>
                }
            </div>
        </div> 
    );
};
 
export default CladeAssignment;
