import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import RadioButtonFilter from './components/RadioButtonFilter';
import { Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

import 'assets/styles/filters.css'

const AlignmentFilter = ({show, onClose, params, sequences_count, onApplyFilter}) => {

    const structural_features = [{name:'core protein', text:'Core protein'}, 
                    {name:'envelope protein E1', text:'Envelope protein E1'},
                    {name:'envelope protein E2', text:'Envelope protein E2'}
                ];

    const non_structural_features = [
                    {name:'protein p7', text:'Protein p7'},
                    {name:'nonstructural protein NS2', text:'NS2'},
                    {name:'protease/helicase protein NS3', text:'NS3'},
                    {name:'nonstructural protein NS4A', text:'NS4A'},
                    {name:'nonstructural protein NS4B', text:'NS4B'},
                    {name:'nonstructural protein NS5A', text:'NS5A'},
                    {name:'RNA-dependend RNA polymerase NS5B', text:'NS5B'}
                ];

    const [genomeDisplay, setGenomeDisplay] = useState('');
    const [fullOrPartial, setFullOrPartial] = useState('entirety');
    const [filters, setFilters] = useState({})

    const closeFilter = () => { onClose(false) }
    const resetFilter = () => { 
        setFilters({});
        setAdvanced(false)
        setBasic(true)
        setGenomeDisplay('')
        setFullOrPartial('entirety')
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
    const [basic, setBasic] = useState(true)
    const [advanced, setAdvanced] = useState(false)
    const handleToggle = (e) => {
        basic ? setBasic(false) : setBasic(true)
        advanced ? setAdvanced(false) : setAdvanced(true)
    }
    
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
                    <label key='basic' className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            value={basic}
                            checked={basic}
                            onChange={() => handleToggle()}
                            className="accent-color-primary w-4 h-4"
                        />
                        <span>&nbsp;Basic Download:</span>
                    </label>
                    
                    <p className='info-text'>
                        Download full genome(s) for all <b>{sequences_count ? sequences_count.toLocaleString() : ""}</b> selected sequences.
                    </p>

                    <label key='advanced' className="flex items-center">
                        <input
                            type="checkbox"
                            value={advanced}
                            checked={advanced}
                            onChange={() => handleToggle()}
                            className=" accent-color-primary w-4 h-4"
                        />
                        <span onClick={e => setAdvancedDownload(!advancedDownload)} > Advanced Download: <Button className='btn-secondary-outline download-btn' size='sm' onClick={e => setAdvancedDownload(!advancedDownload)}> <FontAwesomeIcon icon={advancedDownload ? faCaretUp : faCaretDown}/></Button></span>
                    </label>

                    <p className='info-text'>
                        Select specific genome regions and corresponding nucleotides and/or codons for all <b>{sequences_count ? sequences_count.toLocaleString() : ""}</b> selected sequences.
                    </p>
                    {advancedDownload &&

                    
                        <div>
                            <h5>Select Genome Region:</h5>
                            
                            <div className="row">
                            <div className="col-12">
                                <FormControl fullWidth>
                                    <RadioGroup
                                        name="protein-selection"
                                        onChange={(e) => handleRegionChange(e.target.value)}
                                    >
                                        <div className="row">

                                        {/* Non-Structural */}
                                        <div className="col-md-6">
                                            <Typography
                                            variant="subtitle2"
                                            sx={{
                                                fontSize: "14px",
                                                fontWeight: 600,
                                                mb: 1,
                                            }}
                                            >
                                            Non-Structural Proteins
                                            </Typography>

                                            {non_structural_features.map((feature) => (
                                            <FormControlLabel
                                                key={feature.name}
                                                value={feature.name}
                                                    sx={{
                                                        ml: 0.5, // moves the whole item slightly right
                                                        "& .MuiFormControlLabel-label": {
                                                        fontSize: "12px",
                                                        lineHeight: 1.2,
                                                        },
                                                        "& .MuiRadio-root": {
                                                        marginRight: "6px", // 👈 key part (space between circle and text)
                                                        },
                                                    }}
                                                    control={
                                                        <Radio
                                                        size="small"
                                                        sx={{
                                                            padding: "4px",
                                                            transform: "scale(0.8)",
                                                            color: "var(--primary)",
                                                            "&.Mui-checked": {
                                                            color: "var(--primary)",
                                                            },
                                                        }}
                                                        />
                                                    }
                                                label={feature.text}
                                            />
                                            ))}
                                        </div>

                                        {/* Structural */}
                                        <div className="col-md-6">
                                            <Typography
                                            variant="subtitle2"
                                            sx={{
                                                fontSize: "14px",
                                                fontWeight: 600,
                                                mb: 1,
                                            }}
                                            >
                                            Structural Proteins
                                            </Typography>

                                            {structural_features.map((feature) => (

                                            <FormControlLabel
                                                key={feature.name}
                                                value={feature.name}
                                                sx={{
                                                    ml: 0.5, // moves the whole item slightly right
                                                    "& .MuiFormControlLabel-label": {
                                                    fontSize: "12px",
                                                    lineHeight: 1.2,
                                                    },
                                                    "& .MuiRadio-root": {
                                                    marginRight: "6px", // 👈 key part (space between circle and text)
                                                    },
                                                }}
                                                control={
                                                    <Radio
                                                    size="small"
                                                    sx={{
                                                        padding: "4px",
                                                        transform: "scale(0.8)",
                                                        color: "var(--primary)",
                                                        "&.Mui-checked": {
                                                        color: "var(--primary)",
                                                        },
                                                    }}
                                                    />
                                                }
                                                label={feature.text}
                                            />
                                            ))}
                                        </div>

                                        </div>
                                    </RadioGroup>
                                    </FormControl>
                                </div>
                            </div>


                            {genomeDisplay != '' && 
                                <div>
                                    <h5>Select Alignment Region:</h5>
                                    <RadioButtonFilter
                                        label={undefined}
                                        label_values={['Entirety', 'Subregion']}
                                        value={['entirety', 'subregion']}
                                        handleId={e => setFullOrPartial(e)}

                                ></RadioButtonFilter>
                                
                                </div>
                            }
                                
                            {fullOrPartial === 'subregion' && 
                                <div>
                                    <h5> Select Subregion Coordinates:</h5>
                                    <div className='left-margin'>

                                        <RadioButtonFilter 
                                            label={undefined}
                                            label_values={['Nucleotide', 'Codon']}
                                            value={['nucleotide', 'codon']}
                                            handleId={e => handleSequenceType(e)}
                                        ></RadioButtonFilter>
                                    </div>  
                                </div>
                            }
                            <div>
                                {fullOrPartial === 'subregion' &&
                                    <div className='left-margin'>
                                        <p> 
                                            <input placeholder={`start`} onChange={e =>  handleStartCoordinate(e.target.value)} />&nbsp;
                                            to &nbsp;
                                            <input placeholder={`end`} onChange={e =>  handleEndCoordinate(e.target.value)} />
                                        </p>
                                    </div>
                                }
                            </div>
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
