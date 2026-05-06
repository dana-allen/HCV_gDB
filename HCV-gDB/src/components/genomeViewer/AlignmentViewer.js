
import {useState} from 'react'
import { DialogContent, Tooltip } from "@mui/material";
import { Popover } from "@mui/material";
import { getSequenceData } from 'assets/javascript/sequenceViewerHelper';
import LabelBlock from './components/labels';
import { GroupedSequenceBlock, SequenceBlock } from './components/blocks';

import 'assets/styles/genome_viewer.css'
import 'assets/styles/protein_sequence.css'

const AlignmentViewer = ({reference_sequence, query_sequence, nucleotidePositions, start, end}) => {


    const refSequenceRegion = reference_sequence ? reference_sequence.slice(start, end) : null;

    const mutatedResidues = [...new Set(nucleotidePositions.map(m => Number(m)))];
    const BLOCK_SIZE = 10;
    const BLOCKS_PER_ROW = 8; // 80 AAs per row
    const AAS_PER_ROW = BLOCK_SIZE * BLOCKS_PER_ROW;

    const blocks = refSequenceRegion.match(/.{1,10}/g) || [];

    const rows = [];
    for (let i = 0; i < blocks.length; i += BLOCKS_PER_ROW) {
        rows.push(blocks.slice(i, i + BLOCKS_PER_ROW));
    }

    const mutatedSet = new Set(mutatedResidues);

    const [selectedPosition, setSelectedPosition] = useState(null);
    const [residue, setResidue] = useState();

    const onResidueClick = (position) => {
        const matches = nucleotidePositions.filter(
            (m) => Number(m) === position
        );
        const results = getSequenceData( parseInt(start, 10),
                                        parseInt(end, 10),
                                        reference_sequence,
                                        query_sequence,
                                        matches
                                        );


        setSelectedPosition(position);
        setResidue(results.fullResults[0]);
    };

    return (
        <div>
            <ul className='size-12-font'>
                <li>The highlighted nucleotides represent positions where the query sequence does not match its reference sequence.</li>
                <li>Hover over a nucleotide to view more information</li>
            </ul>

            <div>
                <div>
                    <div className="protein-sequence">
                        <div >
                            {rows.map((row, rowIndex) => {
                                const rowStart = rowIndex * AAS_PER_ROW + start;
                                const rowEnd = Math.min(
                                rowStart + row.length * BLOCK_SIZE - 1,
                                refSequenceRegion.length + start
                                );

                                return (
                                    <div key={rowIndex} className="aa-row">
                                        <div className="position-label left">{rowStart}</div>
                                        <div className="aa-row-content">
                                            {row.map((block, blockIndex) => (
                                                <div key={blockIndex} className="aa-block">
                                                {block.split("").map((aa, aaIndex) => {
                                                    const globalPos =
                                                    rowIndex * AAS_PER_ROW +
                                                    blockIndex * BLOCK_SIZE +
                                                    aaIndex + start;

                                                    const isMutated = mutatedSet.has(globalPos);

                                                    const residueSpan = (
                                                        <span
                                                            key={aaIndex}
                                                            className={`aa-box ${isMutated ? "aa-mutated clickable" : ""}`}
                                                            onClick={
                                                                isMutated
                                                                ? () => onResidueClick(globalPos, aa)
                                                                : undefined
                                                            }
                                                            onMouseOver={
                                                                isMutated
                                                                ? () => onResidueClick(globalPos, aa)
                                                                : undefined
                                                            }
                                                        >
                                                        {aa}
                                                        </span>
                                                    );

                                                    return isMutated ? (
                                                        <Tooltip
                                                            key={aaIndex}
                                                              slotProps={{
                                                                    tooltip: {
                                                                    sx: {
                                                                        maxWidth: 400,      // override default max width
                                                                        bgcolor: "white",   // background color
                                                                        color: "black",     // text color
                                                                        fontSize: 14,
                                                                        border: "1px solid #ccc",
                                                                        boxShadow: 3,
                                                                    },
                                                                    },
                                                                }}
                                                            title={
                                                                <div>
                                                                    {selectedPosition && 
                                                                        <DialogContent>
                                                                            {/* <strong>Nucleotide {selectedPosition}:</strong> */}
                                                                                <div className='sequence_viewer_tooltip' style={{ border:'none'}}>
                                                                                    <LabelBlock showProtein={true} showNucleotide={true} alignmentResults={query_sequence} /> 
                                                                                <div className={`sequence_block ${true ? 'with-gap' : ''}`}>
                                                                                    <div>
                                                                                <>
                                                                                    <div className="sequence_block_individual lg-width">
                                                                                        <SequenceBlock value={residue.codon_index} type="num" />
                                                                                        <SequenceBlock value={residue.ref.aa} type="aa" />
                                                                                        <GroupedSequenceBlock data={residue.ref.nuc} type="nuc" />
                                                                                    </div>
                                                                                    <hr />
                                                                                    {residue.seq.map((seq, i) => (
                                                                                        <div key={i}>
                                                                                            <SequenceBlock value={seq.aa} type="aa" />
                                                                                            <GroupedSequenceBlock data={seq.nuc} type="nuc" />
                                                                                        </div>
                                                                                    ))}
                                                                                    <GroupedSequenceBlock data={residue.nuc_index} type="num" />
                                                                                </>
                                                                                </div>
                                                                                </div>
                                                                                </div>
                                                                                        

                                                                            </DialogContent>
                                                                    }
                                                                {/* <strong>Position {globalPos + 1}</strong> */}
                                                                </div>
                                                            }
                                                            arrow
                                                            placement="top"
                                                        >
                                                            {residueSpan}
                                                        </Tooltip>
                                                                         
                                                    ) : (
                                                        residueSpan
                                                    );
                                                })}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Right label */}
                                        <div className="position-label right">{rowEnd}</div>
                                    </div>
                                );
                            })}
                        </div>    

                    </div>
                </div>

                {/* <div>
                    {selectedPosition && 
                        <DialogContent>
                            <strong>Nucleotide {selectedPosition}:</strong>
                                <div className='sequence_viewer' style={{ border:'none'}}>
                                    <LabelBlock showProtein={true} showNucleotide={true} alignmentResults={query_sequence} /> 
                                <div className={`sequence_block ${true ? 'with-gap' : ''}`}>
                                    <div>
                                <>
                                    <div className="sequence_block_individual lg-width">
                                        <SequenceBlock value={residue.codon_index} type="num" />
                                        <SequenceBlock value={residue.ref.aa} type="aa" />
                                        <GroupedSequenceBlock data={residue.ref.nuc} type="nuc" />
                                    </div>
                                    <hr />
                                    {residue.seq.map((seq, i) => (
                                        <div key={i}>
                                            <SequenceBlock value={seq.aa} type="aa" />
                                            <GroupedSequenceBlock data={seq.nuc} type="nuc" />
                                        </div>
                                    ))}
                                    <GroupedSequenceBlock data={residue.nuc_index} type="num" />
                                </>
                                </div>
                                </div>
                                </div>
                                        

                            </DialogContent>
                        }
                </div> */}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <div>
            </div>
            {/* <Button size="sm">Download PNG</Button> */}
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "24px" }}>

                
            </div>
        </div>
    );



}

export default AlignmentViewer;