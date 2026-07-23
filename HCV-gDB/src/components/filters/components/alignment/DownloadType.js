import { useState } from 'react'

const DownloadType = ({sequences_count, onDownloadTypeChange}) => {


    const [basicOrAdvance, setBasicOrAdvance] = useState('basic')
    
    const handleToggle = (value) => {
        setBasicOrAdvance(value)
        onDownloadTypeChange(value)
    }
    
    return (

        <div>
            <label key='basic' className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    value={'basic'}
                    checked={basicOrAdvance === 'basic'}
                    onChange={(e) => handleToggle('basic')}
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
                    value={'advance'}
                    checked={basicOrAdvance === 'advance'}
                    onChange={(e) => handleToggle('advance')}
                    className=" accent-color-primary w-4 h-4"
                />
                <span>&nbsp;Advanced Download: 
                </span>
            </label>

            <p className='info-text'>
                Select specific genome regions and corresponding nucleotides and/or codons for all <b>{sequences_count ? sequences_count.toLocaleString() : ""}</b> selected sequences.
            </p>

        </div>

    );
};

export default DownloadType;
