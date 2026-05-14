import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink} from '@fortawesome/free-solid-svg-icons'
import { Button } from "react-bootstrap";
import { parseRestianceCategory, parseMutationType} from 'assets/javascript/formatHelper'
import { nucColors } from 'assets/javascript/sequenceViewerHelper';

// Stylesheets
import 'assets/styles/tables.css'


import { BarChart } from "@mui/x-charts";

import { createCladeFrequencyChartData } from "utils/polymorphismHelper";


const CladeFrequencyChart= ( { data=null } ) => {


    const chartData = createCladeFrequencyChartData(data.meta_data, data.genotype_count, data.subtype_count);
    const [chartType, setChartType] = useState(chartData['genotype'])
    const [chartLabel, setChartLabel] = useState('Genotype')
    

    const onChange = (type) => {
        setChartType(chartData[type])
        setChartLabel(type)
    }

    useEffect(() => {

    }, [])


    return (
        <div>
            <div className='row'><h4 className='title-sub'>Clade Frequencies</h4></div>
            <span className='size-12-font'>Frequency of this polymorphism amongst sequences within different genotypes and subtypes.</span>
            <p className='selected-feature-label'>
                <em>view: &nbsp;</em>
                <Button size='sm' className={`btn-table-sequence ${chartType}`} onClick={()=>onChange('genotype')}>View Genotype</Button> 
                <Button size='sm' className={`btn-table-sequence`} onClick={()=>onChange('subtype')}>View subtype</Button>
            </p>
            <div style={{ width: "100%", height: 400 }}>
                <BarChart
                    dataset={chartType}
                    xAxis={[
                        {
                        scaleType: "band",
                        dataKey: "genotype",
                        label: chartLabel,
                        },
                    ]}
                    series={[
                        {
                        dataKey: "frequency",
                        label: "Frequency",
                        },
                    ]}
                    barLabel="value"
                    slotProps={{
                        barLabel: {
                        position: "outside",
                        },
                    }}
                    height={400}
                />
            </div>
            
        </div>
        
    );
}

export default CladeFrequencyChart;
