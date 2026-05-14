import { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { Features } from './components/Features';
import { NumberLine } from './components/NumberLine';
import SequenceViewer from './SequenceViewer';
import MismatchBarRow from './components/MismatchBar';
import { getMismatches, getMultipleMismatches } from 'assets/javascript/sequenceViewerHelper'
import 'assets/styles/genome_viewer.css'
import AlignmentViewer from './AlignmentViewer';
import { Button } from "react-bootstrap";


const MutationViewer = ({ data, mutations }) => {

    console.log(mutations)
    
    const [selectedFeature, setSelectedFeature] = useState(null); 
    
    const split_codons = Array.from(new Set([].concat(...mutations.map(f => [{"feature":f.signature_id.split(':')[0], "codon":f.signature_id.split(':')[1].slice(0, -1),"aa":f.signature_id.split(':')[1].slice(-1)}]))));
    
    
    const reference_accession = data ? data["reference_accession"] : null
    const query_alignment_sequence = data ? data["query_alignment_sequence"] ? {"query_alignment_sequence":data["query_alignment_sequence"], "query_alignment_id":data["query_alignment_id"]} : null : null
    const query_aligned_sequences = data ? data["query_aligned_sequences"] : null
    const reference_alignment_sequence = data ? data["reference_alignment_sequence"] : null
    const features = data ? data["features"] : null

    console.log("features", features)
    const min = 1;
    const max = reference_alignment_sequence.length;
    const range = max - min;
    const positions_tmp = Array.from(new Set([].concat(...features.map(f => [f.cds_start])))).sort((a, b) => a - b);
    const positions = [min, ...positions_tmp, max]


    const mismatches = query_alignment_sequence ? getMismatches(reference_alignment_sequence, query_alignment_sequence.query_alignment_sequence) :
                                                getMultipleMismatches(reference_alignment_sequence, query_aligned_sequences)
    console.log("mismatches", mismatches)
    const enrichedFeatures = features.map(feature => {
        const nucleotide_positions = mismatches.filter(
            pos => pos >= feature.cds_start && pos <= feature.cds_end
        );

        return {
            ...feature,
            nucleotide_positions,
        };
    });

    console.log('enriched', enrichedFeatures)


    const onFeatureClick = (feature) => {
        setSelectedFeature(enrichedFeatures[feature])

    }
    const [viewOption, setViewOption] = useState('mismatched'); // default
    const [checked, setChecked] = useState(false)
    const onChange = (e) =>{
        if (e){ setViewOption('full') }
        else {setViewOption('mismatched')}
        setChecked(e)
    }


    

    return (
        <div className='genome-container'>




        </div>
    );



}

export default memo(MutationViewer);