import React from "react";
import 'assets/styles/tables.css';

const MetaData = () => {
  const tableRows = [
    { label: "locus", description: "The gene or sequence locus identifier." },
    { label: "length", description: "Length of the sequence in nucleotides." },
    { label: "data_source", description: "Source database of the sequence." },
    { label: "strandedness", description: "Single or double stranded molecule." },
    { label: "molecule_type", description: "Type of molecule (DNA, RNA, etc.)." },
    { label: "topology", description: "Linear or circular molecule." },
    { label: "division", description: "Biological division (e.g., Viruses, Bacteria)." },
    { label: "update_date", description: "Last date the record was updated." },
    { label: "create_date", description: "Date the record was created." },
    { label: "definition", description: "Brief definition of the sequence." },
    { label: "primary_accession", description: "Primary accession number." },
    { label: "accession_version", description: "Version of the accession number." },
    { label: "gi_number", description: "GenInfo Identifier (GI) number." },
    { label: "source", description: "Source organism or laboratory." },
    { label: "organism", description: "Name of the organism." },
    { label: "taxonomy", description: "Taxonomic classification." },
    { label: "accession_type", description: "Type of accession (reference or query)." },
    { label: "exclusion_criteria", description: "Criteria used to exclude the sequence." },
    { label: "exclusion_status", description: "Indicates if the sequence is excluded." },
    { label: "pubmed_id", description: "Associated PubMed ID(s) for publications." },
    { label: "mol_type", description: "Molecular type." },
    { label: "strain", description: "Strain of the organism." },
    { label: "isolate", description: "Isolate name or identifier." },
    { label: "isolation_source", description: "Source from which the isolate was obtained." },
    { label: "db_xref", description: "Database cross-references." },
    { label: "country", description: "Country of origin." },
    { label: "geo_loc", description: "Geographic location coordinates or description." },
    { label: "host", description: "Host organism." },
    { label: "collection_date", description: "Collection date." },
    { label: "collection_day", description: "Day of collection." },
    { label: "collection_mon", description: "Month of collection." },
    { label: "collection_year", description: "Year of collection." },
    { label: "segment", description: "Genomic segment." },
    { label: "serotype", description: "Serotype information." },
    { label: "genes", description: "Genes present in the sequence." },
    { label: "cds_info", description: "Coding sequence (CDS) information." },
    { label: "a", description: "Number of adenine nucleotides." },
    { label: "t", description: "Number of thymine nucleotides." },
    { label: "g", description: "Number of guanine nucleotides." },
    { label: "c", description: "Number of cytosine nucleotides." },
    { label: "n", description: "Number of ambiguous nucleotides." },
    { label: "real_length", description: "Real length of the sequence." },
    { label: "comment", description: "Additional comments." },
    { label: "reference_number", description: "Reference identifier number." },
    { label: "position", description: "Position information." },
    { label: "authors", description: "Authors of the associated publication." },
    { label: "title", description: "Title of the associated publication." },
    { label: "journal", description: "Journal of publication." },
    { label: "EPA_major_clade", description: "Major clade from EPA analysis." },
    { label: "EPA_minor_clade", description: "Minor clade from EPA analysis." },
    { label: "EPA_major_all", description: "All major clade assignments." },
    { label: "EPA_minor_all", description: "All minor clade assignments." },
    { label: "major_LWR_score", description: "Major clade likelihood weight ratio." },
    { label: "minor_LWR_score", description: "Minor clade likelihood weight ratio." },
    { label: "collection_date_validated", description: "Whether the collection date has been validated." },
    { label: "country_validated", description: "Whether the country info has been validated." },
    { label: "host_validated", description: "Whether the host info has been validated." },
    { label: "host_taxa_id", description: "Taxonomic ID of the host." },
    { label: "host_scientific_name", description: "Scientific name of the host." },
  ];

  return (
    <div className="container">
      <h2>Meta Data Description</h2>

      <table className="table table-striped table-bordered table-font-12 table-width-50">
        <thead>
          <col width="40%" />
          <col width="60%" />
          <tr>
            <th>Field</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {tableRows.map((row) => (
            <tr key={row.label}>
              <td><b>{row.label}</b></td>
              <td>{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MetaData;
