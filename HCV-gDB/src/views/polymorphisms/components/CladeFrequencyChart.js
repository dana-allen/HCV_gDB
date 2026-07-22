import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload} from '@fortawesome/free-solid-svg-icons'
import { faLink} from '@fortawesome/free-solid-svg-icons'
import { Button } from "react-bootstrap";
import { parseRestianceCategory, parseMutationType} from 'assets/javascript/formatHelper'
import { nucColors } from 'assets/javascript/sequenceViewerHelper';

// Stylesheets
import 'assets/styles/tables.css'
import {  useDownload} from "hooks"

import { BarChart } from "@mui/x-charts";

import { createCladeFrequencyChartData } from "utils/polymorphismHelper";


const CladeFrequencyChart= ( { data=null } ) => {

    const { downloadFile } = useDownload();
    const chartData = createCladeFrequencyChartData(data.meta_data, data.genotype_count, data.subtype_count);
    const [chartType, setChartType] = useState(chartData['genotype'])
    const [chartLabel, setChartLabel] = useState('Genotype')
    

    const onChange = (type) => {
        setChartType(chartData[type])
        setChartLabel(type)
    } 

    const CustomTooltip = (value, context) => {
        const row = chartType[context.dataIndex];
        if (row) {
            return `${row.count} of ${row.totalCount} (${row.frequency.toFixed(2)}%)`;
        }
        
    };

    const downloadCSV= (data) => {
        downloadFile(data, `${chartLabel}-frequencies.csv`, "csv");
    };

    return (
        <div>
            <div className='row'><h4 className='title-sub'>Clade Frequencies</h4></div>
                <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px"
                    }}>
                    <span className='size-12-font'>Frequency of this polymorphism amongst sequences within different genotypes and subtypes.</span>
                    <div style={{ whiteSpace: "nowrap", marginLeft: "auto" }}>
                        <span onClick={() => downloadCSV(chartType)}><FontAwesomeIcon icon={faDownload}/></span>
                    </div>
                </div>
            
            <p className='selected-feature-label size-12-font'>
                <em>view: &nbsp;</em>
                <Button size='sm' className={`btn-table-sequence ${chartType} size-12-font`} onClick={()=>onChange('genotype')}>Genotype</Button> 
                <Button size='sm' className={`btn-table-sequence size-12-font`} onClick={()=>onChange('subtype')}>Subtype</Button>
            </p>
            <div>
                <BarChart
                    dataset={chartType}
                    borderRadius={5}
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
                            valueFormatter: CustomTooltip,
                        }
                    ]}

                    height={400}
                />
            </div>
            
        </div>
        
    );
}

export default CladeFrequencyChart;
