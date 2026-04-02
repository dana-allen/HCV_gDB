import React from "react";
import { Link } from "react-router-dom"; 

const VGdb = () => {
    return (
        <div className="container ">
            <h2>Viral Genome Toolkit and Database</h2>
            <br></br>
            <h4 className='primary-color'>What is the Viral Genome Toolkit?</h4>
            <p>
                V-gTK provides tools for organizing and curating viral sequence data, emphasizing transparency via version control and reproducibility 
                through standardized input formats. 
            </p>


            <h4 className='primary-color'>What is the Viral Genome Database?</h4>
            <p>
                V-gDB complements this by supporting the creation of searchable, extensible databases that link genome sequences to curated mutation data, 
                reference phylogenies, and contextual metadata. Together, they enable the development of expert-informed viral genome resources that can 
                serve as both data repositories and analytical platforms. 
            </p>

            
        </div>
    );
};
 
export default VGdb;
