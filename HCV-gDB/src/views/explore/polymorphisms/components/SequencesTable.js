import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

import PagingButtons from 'components/buttons/PagingButtons';
// Stylesheets
import 'assets/styles/tables.css'

const SequencesTable = ({ data = null, type = null }) => {

    const [search, setSearch] = useState('');
    const [startRecord, setStartRecord] = useState('');
    const [endRecord, setEndRecord] = useState('');
    const [currentItems, setCurrentItems] = useState([]);

    // 🔍 Filter data based on search
    const filteredData = useMemo(() => {
        if (!Array.isArray(data)) return [];
        return data.filter(seq =>
            seq.primary_accession
                ?.toLowerCase()
                .includes(search.toLowerCase().trim())
        );
    }, [data, search]);

    const handlePageChange = (items) => {
        setCurrentItems(items[0]);
        setStartRecord(items[1]);
        setEndRecord(items[2]);
    };

    // 🔁 Reset pagination when search changes
    useEffect(() => {
        if (filteredData.length > 0) {
            handlePageChange([filteredData.slice(0, 10), 1, Math.min(10, filteredData.length)]);
        } else {
            setCurrentItems([]);
            setStartRecord(0);
            setEndRecord(0);
        }
    }, [search, filteredData]);

    if (!Array.isArray(data) || data.length === 0) {
        return <div>No data found...</div>;
    }

    return (
        <div>
            <div className='row'><h4 className='title-sub'>Sequences</h4></div>
            <div className='row'>
                <p>Sequences that have mutation present</p>
            </div>

            {/* 🔍 SEARCH BAR */}
            

            <PagingButtons data={filteredData} onPageChange={handlePageChange} />

            <a>
                Sequences {startRecord} to {endRecord} of {filteredData.length}
            </a>

            <table className="table table-striped table-bordered table-font-12 table-width-50">
                <thead>
                    <tr>
                        <th>
                            <div style={{ position: 'relative'  }}>
                                <i
                                    className="fa fa-search"
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '8px',
                                        transform: 'translateY(-50%)',
                                        color: '#888'
                                    }}
                                ></i>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search primary accession..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    style={{ paddingLeft: '28px',fontSize:'12px' }} // space for icon
                                />
                            </div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {currentItems.map((sequence, i) => (
                        <tr key={i}>
                            <td>
                                <Link
                                    className='gdb-link'
                                    to={`/sequence/${sequence.primary_accession}`}
                                >
                                    {sequence.primary_accession}
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SequencesTable;