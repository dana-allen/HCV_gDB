import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink} from '@fortawesome/free-solid-svg-icons'

import { parseRestianceCategory, parseMutationType} from 'assets/javascript/formatHelper'
import { nucColors } from 'assets/javascript/sequenceViewerHelper';

// Stylesheets
import 'assets/styles/tables.css'


import { BarChart } from "@mui/x-charts";

import {
  countAminoAcids,
  createChartData,
} from "utils/polymorphismHelper";


const PolymorphismChart= ( { data=null, aminoAcidIndex } ) => {

    const counts = countAminoAcids(
        data.meta_data,
        data.reference,
        // [24, 31]
        aminoAcidIndex
    );

    const chartData = createChartData(counts);

    return (
        <BarChart
            dataset={chartData}
            borderRadius={5}
            xAxis={[
                {
                scaleType: "band",
                dataKey: "aminoAcid",
                label: "Amino Acid",
                },
            ]}
            series={[
                {
                dataKey: "count",
                label: "Count",
                },
            ]}
            height={400}
            width={700}
        />
    );
}

export default PolymorphismChart;
