import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

import PagingButtonsSlim from 'components/buttons/PagingButtonsSlim';
// Stylesheets
import 'assets/styles/tables.css'

const SequencesTable = ({ data = null, clades = null, type = null }) => {

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
            <span className='size-12-font'>Sequences with mutation present</span>
        
            
            <table className="table table-striped table-bordered table-font-12">
                <thead>
                    <tr>
                        <th colSpan={2}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                             <div>
                                <span className="size-12-font" style={{ fontWeight: "normal" }}>
                                Sequences {startRecord} to {endRecord} of {filteredData.length}
                                </span>
                            </div>
                            {/* Top row: search + paging */}
                            <div
                                style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px"
                                }}
                            >
                                {/* Search input */}
                                <div style={{ position: "relative", flex: 1 }}>
                                <i
                                    className="fa fa-search"
                                    style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "8px",
                                    transform: "translateY(-50%)",
                                    color: "#888"
                                    }}
                                ></i>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search primary accession..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    style={{
                                    paddingLeft: "28px",
                                    fontSize: "12px",
                                    height: "30px"
                                    }}
                                />
                                </div>

                                {/* Paging buttons */}
                                <div style={{ whiteSpace: "nowrap" }}>
                                    <PagingButtonsSlim
                                        data={filteredData}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            </div>

                            {/* Bottom row: sequence info */}
                           

                            </div>
                        </th>
                    </tr>
                    <tr>
                        <th>Primary Accession</th>
                        <th>Clade</th>
                    </tr>
                </thead>

                <tbody>
                    {currentItems.map((sequence, i) => (
                        <tr key={i}>
                            <td>
                                <Link
                                    className='custom-link'
                                    to={`/sequence/${sequence.primary_accession}`}
                                >
                                    {sequence.primary_accession}
                                </Link>
                            </td>
                            <td>{clades.filter(c => c.sequence_id === sequence.primary_accession)[0].nearest_reference_genotype}{clades.filter(c => c.sequence_id === sequence.primary_accession)[0].nearest_reference_subtype}</td>
                        </tr>
                    ))}
                </tbody>
            </table>


        </div>
    );
};

export default SequencesTable;