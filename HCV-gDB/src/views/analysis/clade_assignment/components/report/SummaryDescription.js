import React from 'react';
import 'assets/styles/report.css'

const SummaryDescription = ( { data } ) => {
    
    return (
        <div className='size-12-font'>
            {/* <h3>Antiviral resistance summary</h3> */}
            <p>
                Please note that the HCV-gDB drug resistance interpretation system has not yet been formally validated for clinical use.
            </p>
            <p>
                HCV-gDB detects the presence of resistance-associated substitutions (RAS) and variants in viral genome sequences and 
                summarises the evidence that these confer resistance to direct-acting antiviral drugs (DAAs). It is essential to note 
                that the prediction of reduced susceptibility to an individual DAA by HCV-gDB is unlikely to be of clinical relevance in
                 treatment-naïve, non-cirrhotic patients, with the exception of elbasvir. In the presence of cirrhosis or with a history 
                 of prior exposure to DAA, the antiviral susceptibility results may be of value in choosing an optimal treatment regimen. 
                 As such decisions are complex, we recommend that treatment selection should be taken by a multi-professional expert team 
                 only after review of relevant viral, patient and DAA-related factors.
            </p>
        </div>

    );
};

export default SummaryDescription;
