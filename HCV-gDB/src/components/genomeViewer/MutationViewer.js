import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DialogContent, Tooltip, Popover } from '@mui/material';

import { splitIntoCodons, translateCodons } from 'utils/polymorphismHelper';

import 'assets/styles/genome_viewer.css';
import 'assets/styles/protein_sequence.css';
import 'assets/styles/tables.css';

const MutationViewer = ({ reference_sequence, mutations, start, end }) => {

    const refSequenceRegion = reference_sequence?.slice(start - 1, end);

    const codons = splitIntoCodons(refSequenceRegion);
    const aminoAcids = translateCodons(codons);

    const aaPositions = mutations.flatMap(item => item.aa_positions.map(Number));

    const mutatedSet = new Set(aaPositions);

    const BLOCK_SIZE = 8;
    const BLOCKS_PER_ROW = 10;
    const AAS_PER_ROW = BLOCK_SIZE * BLOCKS_PER_ROW;

    const rows = [];

    for (let i = 0; i < aminoAcids.length; i += AAS_PER_ROW) {
        rows.push(
            aminoAcids.slice(i, i + AAS_PER_ROW)
        );
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const [residue, setResidue] = useState([]);

    const handleResidueClick = (
        event,
        position
    ) => {
        setAnchorEl(event.currentTarget);

        const mutation = mutations.filter(
            item =>
                item.aa_positions.some(
                    aa => Number(aa) === position
                )
        );

        setResidue(mutation);
    };

    const closePopover = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <div>

            <ul className="size-12-font">
                <li> Highlighted amino acids represent mutations </li>
                <li> Click an amino acid for mutation details </li>
            </ul>

            <div className="protein-sequence">

                {rows.map((row, rowIndex) => {

                    const rowStart = rowIndex * AAS_PER_ROW + 1;
                    const rowEnd = Math.min(rowStart + row.length - 1, aminoAcids.length + start);

                    return (
                        <div
                            key={rowIndex}
                            className="aa-row"
                        >

                            <div className="position-label left">
                                {rowStart}
                            </div>

                            <div className="aa-row-content">

                                {row.map((block, blockIndex) => (
                                    <div
                                        key={ blockIndex }
                                        className="aa-block"
                                    >
                                        {block.split('').map((aa,aaIndex) => {

                                                        const globalPos = rowIndex * AAS_PER_ROW + blockIndex + 1;

                                                        const isMutated = mutatedSet.has( globalPos );

                                                        const residueSpan =
                                                            (
                                                                <span
                                                                    key={aaIndex}
                                                                    className={`aa-box ${isMutated ? 'aa-mutated clickable' : '' }`}
                                                                    onClick={ isMutated ? (e ) => handleResidueClick(e, globalPos ) : undefined }
                                                                >
                                                                    { aa }
                                                                </span>
                                                            );

                                                        return isMutated ? (
                                                            <Tooltip
                                                                key={ aaIndex}
                                                                title="Click for mutation info"
                                                                arrow
                                                            >
                                                                {residueSpan}
                                                            </Tooltip>
                                                        ) : (
                                                            residueSpan
                                                        );
                                                    }
                                                )}

                                        </div>
                                    )
                                )}

                            </div>

                            <div className="position-label right">
                                {rowEnd}
                            </div>

                        </div>
                    );
                })}

            </div>

            {/* Floating details panel */}
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={closePopover}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
            >
                <DialogContent
                    sx={{
                        maxWidth: 500,
                        overflowX: 'auto'
                    }}
                >
                    <table className="table table-striped table-font-12">

                        <thead>
                            <tr>
                                <th>Polymorphism</th>
                                <th>Type</th>
                            </tr>
                        </thead>

                        <tbody>

                            {residue.map((polymorphism, i) => (
                                    <tr key={i}>

                                        <td>
                                            <Link
                                                className="gdb-link"
                                                to={`/polymorphism/${polymorphism.signature_id}`}
                                            >
                                                {polymorphism.signature_id}
                                            </Link>
                                        </td>

                                        <td>
                                            {polymorphism.signature_kind}
                                        </td>

                                    </tr>
                                )
                            )}

                        </tbody>

                    </table>

                </DialogContent>
            </Popover>

        </div>
    );
};

export default MutationViewer;