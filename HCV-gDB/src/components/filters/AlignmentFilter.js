import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import DownloadType from './components/alignment/DownloadType';
import SelectGenomeRegion from './components/alignment/SelectGenomeRegion';
import SelectAlignmentRegion from './components/alignment/SelectAlignmentRegion';
import SelectSubRegion from './components/alignment/SelectSubRegion';
import SelectSubRegionCoordinates from './components/alignment/SelectSubRegionCoordinates';

import 'assets/styles/filters.css'

const AlignmentFilter = ({show, onClose, sequences_count, onApplyFilter}) => {

    
    const [genomeDisplay, setGenomeDisplay] = useState('basic');
    const [alignmentRegion, setAlignmentRegion] = useState('entirety');


    const [filters, setFilters] = useState({})

    const closeFilter = () => { onClose(false) }
    const resetFilter = () => { 
        setFilters({});
        setGenomeDisplay('')
        setAlignmentRegion('entirety')
    }

    const handleRegionChange = (value) => {
        if (value !== '') {
            setFilters(prev => ({
                ...prev,
                region: value
            }))
        } else {
            setFilters(prev => {
                const { region, ...rest } = prev
                return rest
            })
        }
        setGenomeDisplay(value)
    }
    
    const handleSequenceType = (value) => {
        if (value !== '') {
            setFilters(prev => ({
                ...prev,
                sequenceType: value
            }))
        } else {
            setFilters(prev => {
                const { sequenceType, ...rest } = prev
                return rest
            })
        }
    }

    const handleStartCoordinate = (value) => {
        if (value !== '') {
            setFilters(prev => ({
                ...prev,
                startCoordinate: value
            }))
        } else {
            setFilters(prev => {
                const { startCoordinate, ...rest } = prev
                return rest
            })
        }
    }
    const handleEndCoordinate = (value) => {
        if (value !== '') {
            setFilters(prev => ({
                ...prev,
                endCoordinate: value
            }))
        } else {
            setFilters(prev => {
                const { endCoordinate, ...rest } = prev
                return rest
            })
        }
    }


    const updateFilters = () => {
        onApplyFilter(filters)
        onClose(false)
    }

    const [advancedDownload, setAdvancedDownload] = useState(false)

    const handleDownloadTypeChange = (value) => { value === 'advance' ? setAdvancedDownload(true) : setAdvancedDownload(false) }
    
    return (
        <Modal show={show} size="lg" >
            <Modal.Header>
                <Modal.Title>Download Alignment</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            
                <h5>About {process.env.REACT_APP_WEB_RESOURCE} alignments</h5>
                <p className='info-text'>
                    This will download all alignments in sequences list according to their 
                    reference alignment. If you have applied filtering to the sequences, those filters will 
                    be applied when downloading the alignments. 
                </p>
                <hr></hr>
                <div>

                    <DownloadType sequences_count={sequences_count} onDownloadTypeChange={handleDownloadTypeChange} />

                    {advancedDownload &&

                    
                        <div>

                            <SelectGenomeRegion onRegionChange={handleRegionChange} />
                            
                            { genomeDisplay && <SelectAlignmentRegion onRegionChange={(e) => setAlignmentRegion(e)}/>}
                            { alignmentRegion === 'subregion' && 
                                <div>
                                    <SelectSubRegion onRegionChange={(e) => handleSequenceType(e)} /> 
                                    <SelectSubRegionCoordinates onStartCoordinate={(e) => handleStartCoordinate(e)} onEndCoordinate={(e) => handleEndCoordinate(e)} />
                                </div>
                            }

                        </div>
                    }
                </div>
                <br></br>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={resetFilter}>Reset</Button>
                <Button variant="secondary" onClick={closeFilter} >Cancel</Button>
                <Button className='btn-main' onClick={updateFilters}>Download</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AlignmentFilter;
