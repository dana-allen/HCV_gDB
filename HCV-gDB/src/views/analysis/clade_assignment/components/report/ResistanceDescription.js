import React from 'react';
import 'assets/styles/report.css'

const ResistanceDescription = ( ) => {
    
    return (
        <div className='size-12-font'>
            <ol>
                <li>
                    <a>Drug resistance findings are assigned to one of three categories according to the strength of evidence for drug resistance. </a>
                    <ul> 
                        <li><b>Category I</b> findings have the strongest evidence either: 
                            <ul>
                                <li>(a) <em>in vitro</em> resistance level ≥ 5 and found at baseline or treatment-emergent <em>in vivo</em>, or</li>
                                <li>(b) both found at baseline and treatment-emergent.</li>
                            </ul>
                        </li>
                        <li><b>Category II</b>: <em>in vitro</em> level ≥ 50 or found at baseline or treatment-emergent.</li>
                        <li><b>Category III</b>: <em>in vitro</em> level ≥ 5</li>
                    </ul>
                </li>
               
                <li>
                    <a>Resistance detection for a given drug is assigned to one of four categories:</a> 
                    <ul>
                        <li>Resistance detected: any category I polymorphisms.</li>
                        <li>Probable resistance detected: any category II polymorphisms.</li>
                        <li>Possible resistance detected: any category III polymorphisms. </li>
                        <li>No significant resistance detected: none of the above.</li>
                    </ul>
                </li>
            </ol>
        </div>

    );
};

export default ResistanceDescription;
