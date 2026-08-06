import React, { useState, useRef } from 'react';
import ReportHeader from './components/report/ReportHeader';
import PhylogeneticClassification from './components/report/PhylogeneticsClassification';
import SummaryDescription from './components/report/SummaryDescription';
import SummaryTable from './components/report/SummaryTable';
import { useFetch } from 'hooks';
import ResistanceDescription from './components/report/ResistanceDescription';
import DetailsTable from './components/report/DetailsTable';
import OthersTable from './components/report/OthersTable';

import 'assets/styles/report.css'
import ResistanceCategoryBlurb from 'views/polymorphisms/components/ResistanceCategoryBlurb';
import GenomeCoverageTable from './components/report/GenomeCoverageTable';


const DrugResistanceReport = () => {

    const url = `/api/analysis/drug_analysis/`;

    const { data, ...rest } = useFetch(url);

    console.log(data)

    const filtered_data = data && data["mutations"].filter(item => item.alignment_name =='AL_1a')
    console.log("filtered ", filtered_data)
    const grouped = data && filtered_data.reduce((acc, item) => {
        const { protein_name, drug, resistance_category } = item;

        // Ignore records that don't have a drug
        if (!drug) {
            return acc;
        }

        if (!acc[protein_name]) {
            acc[protein_name] = {};
        }

        if (!acc[protein_name][drug]) {
            acc[protein_name][drug] = {};
        }

        if (!acc[protein_name][drug][resistance_category]) {
            acc[protein_name][drug][resistance_category] = [];
        }

        acc[protein_name][drug][resistance_category].push(item);

        return acc;
    }, {});

    const alignment = null
    const features = null

    console.log(grouped)

    const phylogeneticData = {
                                identified: true,
                                clade_assignment: {major:"1", minor:"a"},
                                referenceSequence: "NC_004102"
                            }

    return (
        <div className='container drug-resistance-report'>
            
            <ReportHeader />
            <PhylogeneticClassification data={phylogeneticData}  />
            <h3>Antiviral Resistance Summary</h3>
            <SummaryDescription />
            {data && <SummaryTable data={grouped}/>}
            
            <h3>Resistance-associated polymorphism details</h3>
            
            {data && <DetailsTable data={data}/>}
            <div class="pagebreak"> </div>
            <ResistanceDescription />
            <div class="pagebreak"> </div>
            
            <h3>Other Polymorphisms of Interest</h3>      
            {data && <OthersTable data={data}/> }



            <h3>Genome coding region coverage</h3>
            <GenomeCoverageTable alignment={alignment} features={features} />



                <div class="pagebreak"> </div>
        </div> 
    );
};
 
export default DrugResistanceReport;
