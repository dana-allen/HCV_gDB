import React from "react";

import 'assets/styles/about.css'

const Acknowledgments = () => {
    return (
        <div className="container ">
            <h2>Acknowledgments</h2>
            <p>
                {process.env.REACT_APP_VIRUS_ABB}-{process.env.REACT_APP_WEB_RESOURCE} is based on the {" "}
                <a className='custom-link' target="_blank" href="https://github.com/centre-for-virus-research/V-gTK">Viral Genome Toolkit (V-gTK)</a> software framework, developed by the 
                <a className='custom-link' target="_blank" href="http://www.gla.ac.uk/researchinstitutes/iii/cvr/"> MRC-University of Glasgow Centre for Virus Research</a>, 
                in collaboration with the <a className='custom-link' href="https://www.gla.ac.uk/schools/bohvm/"> University of Glasgow </a>. 
                The drug resistance features are developed in concert with the 
                <a className="custom-link" href="https://www.gov.uk/government/collections/virus-reference-department-vrd" target="_blank"> Public Health England Virus Reference Department </a> 
                and the PHE HCV Resistance Group.
            </p>

            <div className="row">
                <div className="card border-0 team-card">
                    <div className="d-flex align-items-center p-2">
                        <a target="_blank" href="http://www.gla.ac.uk/">
                            <img className='mrc-logo' alt="MRC logo" src="/static/imgs/footer/UoG1.png"/>
                        </a>
                    </div>
                </div>
                <div className="card border-0 team-card">
                        <div className="d-flex align-items-center p-2">
                            <a target="_blank" href="https://mrc.ukri.org/">
                                <img className='mrc-logo' alt="MRC logo" src="/static/imgs/footer/MRC1.png"/>
                            </a>
                        </div>
                    </div>
                <div className="card h-100 border-0 team-card">
                    <div className="d-flex align-items-center p-2">
                        <a target="_blank" href="https://www.gov.uk/government/collections/virus-reference-department-vrd">
                            <img className='bohvm-logo' alt="IBAHCM logo" src="/static/imgs/footer/PHE.png"></img>
                        </a>
                    </div>
                </div>
                <div className="card h-100 border-0 team-card">
                    <div className="d-flex align-items-center p-2">
                        <a target="_blank" href="http://www.stop-hcv.ox.ac.uk/">
                            <img className='mrc-logo' alt="MRC logo" src="/static/imgs/footer/STOP-HCV-logo-with-strapline.gif"/>
                        </a>
                    </div>
                </div>
                <div className="card h-100 border-0 team-card">
                    <div className="d-flex align-items-center p-2">
                        <img className='mrc-logo' alt="MRC logo" src="/static/imgs/footer/hcv_research_uk_logo.png"/>
                        {/* <a target="_blank" href="http://www.hcvresearchuk.org/">
                            
                        </a> */}
                    </div>
                </div>
                <div className="card h-100 border-0 team-card">
                    <div className="d-flex align-items-center p-2">
                        <a target="_blank" href="https://wellcome.ac.uk/">
                            <img className='bohvm-logo' alt="IBAHCM logo" src="/static/imgs/footer/wellcome_trust.png"></img>
                        </a>
                    </div>
                </div>
            </div>

            <br></br>
            <p>
                A previous version, RABV-GLUE, was underpinned by the <a className='custom-link' target="_blank" href="https://github.com/giffordlabcvr/gluetools"> GLUE software </a> 
                developed by Rob Gifford and Josh Singer (<a className='custom-link' target="_blank" href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9162366/">https://pmc.ncbi.nlm.nih.gov/articles/PMC9162366/</a>).
            </p>

        </div>
    );
};
 
export default Acknowledgments;
