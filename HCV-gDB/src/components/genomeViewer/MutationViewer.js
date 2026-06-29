
import {useState} from 'react'
import { DialogContent, Tooltip } from "@mui/material";
import { Link } from 'react-router-dom';

import { splitIntoCodons, translateCodons } from 'utils/polymorphismHelper'
import 'assets/styles/genome_viewer.css'
import 'assets/styles/protein_sequence.css'
import 'assets/styles/tables.css';

const MutationViewer = ({reference_sequence, mutations, start, end}) => {

    const refSequenceRegion = reference_sequence ? reference_sequence.slice(start - 1, end) : null;


    const codons = splitIntoCodons(refSequenceRegion);
    const aminoAcids = translateCodons(codons);
    

    const aaPositions = mutations.map(item => item.aa_position);
    const mutatedResidues = [...new Set(aaPositions.map(m => Number(m)))];

    const BLOCK_SIZE = 8;
    const BLOCKS_PER_ROW = 7; // 80 AAs per row
    const AAS_PER_ROW = BLOCK_SIZE * BLOCKS_PER_ROW;

    const rows = [];
    for (let i = 0; i < aminoAcids.length; i += AAS_PER_ROW) {
        rows.push(aminoAcids.slice(i, i + AAS_PER_ROW));
    }

    const mutatedSet = new Set(mutatedResidues);

    const [selectedPosition, setSelectedPosition] = useState(null);
    const [residue, setResidue] = useState();

    const onResidueClick = (position) => {

        setSelectedPosition(position);
        const mutation = mutations.filter(item => Number(item.aa_position) === position)
        setResidue(mutation);

    };

    return (
        <div>
            <ul className='size-12-font'>
                <li>The highlighted amino acids represent mutations</li>
                <li>Hover over/click an amino acid to view more information</li>
            </ul>
            <div style={{ display: "flex"}}>

                <div style={{ flex: 3 }}>
                    <div className="protein-sequence">
                        {rows.map((row, rowIndex) => {
                            const rowStart = rowIndex * AAS_PER_ROW + 1;
                            const rowEnd = Math.min(rowStart + row.length - 1, aminoAcids.length + start);

                            return (
                                <div key={rowIndex} className="aa-row">
                                    <div className="position-label left">{rowStart}</div>
                                    <div className="aa-row-content">
                                        {row.map((block, blockIndex) => (
                                            <div key={blockIndex} className="aa-block">
                                            {block.split("").map((aa, aaIndex) => {
                                                const globalPos =
                                                rowIndex * AAS_PER_ROW +
                                                blockIndex + 1;

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
                                                        // onMouseOver={
                                                        //     isMutated
                                                        //     ? () => onResidueHover(globalPos, aa)
                                                        //     : undefined
                                                        // }
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
                                                        // title={
                                                        //     <div>
                                                        //         {selectedPosition && 
                                                        //             <div>
                                                        //                 <p>{selectedPosition}</p>   
                                                        //             </div>
                                                        //         }
                                                        //     <p className='size-12-font'>
                                                        //         {/* Position {globalPos}{" "} */}
                                                        //         {/* {residue} */}
                                                        //         {/* {mutations
                                                        //             .filter(item => Number(item.aa_position) === globalPos)
                                                        //             .map(m => m.signature_id)
                                                        //             .join(", ")} */}
                                                        //     </p>
                                                        //     </div>
                                                        // }
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

                <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        {selectedPosition && 
                        <DialogContent>
                            <table className="table table-striped table-bordered table-font-12">
                                        <thead>
                                            <tr>
                                                <th>Polymorphism</th>
                                                <th colSpan={2}>Type</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            
                                            {residue.map((polymorphism, i) => (
                                                <tr key={i} id={i}>
                                                    <td><Link className='gdb-link' to={`/polymorphism/${polymorphism.signature_id}`}>{polymorphism.signature_id}</Link></td>
                                                    <td>{polymorphism.signature_kind}</td>
                                                    <td>{polymorphism.mutation_type}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                        

                            </DialogContent>
                        }
                    </div>
                </div>

            </div>
        </div>
    );



}

export default MutationViewer;