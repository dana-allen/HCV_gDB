import React from "react";

const HowToCite = () => {
    return (
        <div className="container ">
            <h2>How to cite {process.env.REACT_APP_VIRUS_ABB}-{process.env.REACT_APP_WEB_RESOURCE}</h2>
            <p>Please cite:</p>
            <p>RABV-gTK: <a target="_blank" href='https://github.com/RAGE-toolkit/RABV-gTK/tree/main'>https://github.com/RAGE-toolkit/RABV-gTK/tree/main</a></p>
        </div>
    );
};
 
export default HowToCite;