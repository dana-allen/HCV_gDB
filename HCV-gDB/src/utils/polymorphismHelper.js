// utils/sequenceUtils.js

// --------------------------------------------------
// Genetic code table
// --------------------------------------------------

export const CODON_TABLE = {
  TTT: "F", TTC: "F",
  TTA: "L", TTG: "L",
  CTT: "L", CTC: "L", CTA: "L", CTG: "L",

  ATT: "I", ATC: "I", ATA: "I",
  ATG: "M",

  GTT: "V", GTC: "V", GTA: "V", GTG: "V",

  TCT: "S", TCC: "S", TCA: "S", TCG: "S",
  CCT: "P", CCC: "P", CCA: "P", CCG: "P",
  ACT: "T", ACC: "T", ACA: "T", ACG: "T",
  GCT: "A", GCC: "A", GCA: "A", GCG: "A",

  TAT: "Y", TAC: "Y",
  TAA: "*", TAG: "*",
  CAT: "H", CAC: "H",
  CAA: "Q", CAG: "Q",
  AAT: "N", AAC: "N",
  AAA: "K", AAG: "K",
  GAT: "D", GAC: "D",
  GAA: "E", GAG: "E",

  TGT: "C", TGC: "C",
  TGA: "*",
  TGG: "W",

  CGT: "R", CGC: "R", CGA: "R", CGG: "R",
  AGT: "S", AGC: "S",
  AGA: "R", AGG: "R",

  GGT: "G", GGC: "G", GGA: "G", GGG: "G",
};


// --------------------------------------------------
// Get reference entry for a sequence
// --------------------------------------------------

export function getReferenceForSequence(sequence, references) {
  return references.find(
    (ref) => ref.accession === sequence.reference_accession
  );
}


// --------------------------------------------------
// Extract CDS region from alignment
// cds_start/end are 1-based
// --------------------------------------------------

export function extractCodingRegion(alignment, cdsStart, cdsEnd) {
  return alignment.slice(cdsStart - 1, cdsEnd);
}


// --------------------------------------------------
// Remove gaps from alignment
// --------------------------------------------------

export function removeGaps(sequence) {
  return sequence.replace(/-/g, "");
}


// --------------------------------------------------
// Convert nucleotide sequence into codons
// --------------------------------------------------

export function splitIntoCodons(sequence) {
  const codons = [];

  for (let i = 0; i < sequence.length; i += 3) {
    const codon = sequence.slice(i, i + 3);

    if (codon.length === 3) {
      codons.push(codon);
    }
  }

  return codons;
}


// --------------------------------------------------
// Translate codons into amino acids
// Unknown codons -> X
// --------------------------------------------------

export function translateCodons(codons) {
  return codons.map((codon) => {
    return CODON_TABLE[codon.toUpperCase()] || "X";
  });
}


// --------------------------------------------------
// Get amino acid at position
// aaPosition is 1-based
// --------------------------------------------------

export function getAminoAcidAtPosition(aminoAcids, aaPosition) {
  return aminoAcids[aaPosition - 1];
}


// --------------------------------------------------
// Process a single sequence
// --------------------------------------------------

// export function getAAForSequence(sequence, references, aaPosition) {
// // export function getAAForSequence(sequence, aaPosition) {
//   const reference = getReferenceForSequence(sequence, references);

//   if (!reference) {
//     return null;
//   }

//   const cdsStart = Number(reference.cds_start);
//   const cdsEnd = Number(reference.cds_end);
//   // console.log(sequence)
//   //   const cdsStart = Number(sequence.cds_start);
//   // const cdsEnd = Number(sequence.cds_end);
//   console.log("coordinates", cdsStart, cdsEnd)
//   const codingRegion = extractCodingRegion(
//     sequence.alignment,
//     cdsStart,
//     cdsEnd
//   );

//   // console.log(sequence.sequence_id, codingRegion)

//   const ungappedSequence = removeGaps(codingRegion);

//   const codons = splitIntoCodons(ungappedSequence);



//   const aminoAcids = translateCodons(codons);
//   // console.log(aminoAcids[35])
//   return getAminoAcidAtPosition(aminoAcids, aaPosition);
// }

export function getAAForSequence(sequence, references, aaPositions) {
  const reference = getReferenceForSequence(sequence, references);

  if (!reference) return null;

  const cdsStart = Number(reference.cds_start);
  const cdsEnd = Number(reference.cds_end);

  const codingRegion = extractCodingRegion(
    sequence.alignment,
    cdsStart,
    cdsEnd
  );

  const ungappedSequence = removeGaps(codingRegion);
  const codons = splitIntoCodons(codingRegion);
  const aminoAcids = translateCodons(codons);

  // 👉 if array, return array of results
  if (Array.isArray(aaPositions)) {
    return aaPositions.map(pos =>
      getAminoAcidAtPosition(aminoAcids, pos)
    );
  }

  // fallback (old behaviour)
  return getAminoAcidAtPosition(aminoAcids, aaPositions);
}


// --------------------------------------------------
// Count amino acids across all sequences
// --------------------------------------------------

// export function countAminoAcids(metaData, references, aaPosition) {
// // export function countAminoAcids(metaData, aaPosition) {
//   const counts = {};
//   const bad_sequences = [];

//   metaData.forEach((sequence) => {
//     const aa = getAAForSequence(sequence, references, aaPosition);
//     if (aa != 'A') {bad_sequences.push(sequence.sequence_id)}
//     //  const aa = getAAForSequence(sequence, aaPosition);

//     if (!aa) return;

//     counts[aa] = (counts[aa] || 0) + 1;
//   });
//   // console.log(bad_sequences)
//   return counts;
// }

export function countAminoAcids(metaData, references, aaPositions) {
  const counts = {};

  metaData.forEach((sequence) => {
    const aas = getAAForSequence(sequence, references, aaPositions);

    if (!aas) return;

    // 👉 ensure array
    const aaArray = Array.isArray(aas) ? aas : [aas];

    aaArray.forEach((aa) => {
      if (!aa) return;
      counts[aa] = (counts[aa] || 0) + 1;
    });
  });

  return counts;
}


// --------------------------------------------------
// Convert counts into chart format
// --------------------------------------------------

export function createChartData(counts) {
  return Object.entries(counts).map(([aminoAcid, count]) => ({
    aminoAcid,
    count,
  }));
}

function getPercentage(id, data) {

}

export function createCladeFrequencyChartData(
  meta_data,
  genotype,
  subtype
) {
  const counts_genotype = {};
  const counts_subtype = {};

  // -----------------------------------
  // Count genotypes
  // -----------------------------------

  meta_data.forEach((sequence) => {
    const key = sequence.nearest_reference_genotype;

    counts_genotype[key] =
      (counts_genotype[key] || 0) + 1;
  });

  // -----------------------------------
  // Count subtypes
  // -----------------------------------

  meta_data.forEach((sequence) => {
    const key = `${sequence.nearest_reference_genotype}${sequence.nearest_reference_subtype}`;

    counts_subtype[key] =
      (counts_subtype[key] || 0) + 1;
  });

  // -----------------------------------
  // Format genotype chart data
  // -----------------------------------

  const formatted_genotype_frequencies =
    Object.entries(counts_genotype).map(
      ([genotypeName, count]) => {

        const total = genotype.find(
          (g) =>
            g.nearest_reference_genotype ==
            genotypeName
        );

        const totalCount = total?.count || 1;

        return {
          genotype: genotypeName,
          count,
          frequency: (count / totalCount)*100,
          totalCount: totalCount
          
        };
      }
    ).sort((a, b) => b.frequency - a.frequency);

  // -----------------------------------
  // Format subtype chart data
  // -----------------------------------

  const formatted_subtype_frequencies =
    Object.entries(counts_subtype).map(
      ([subtypeName, count]) => {

        const total = subtype.find(
          (s) =>
            `${s.nearest_reference_genotype}${s.nearest_reference_subtype}` ==
            subtypeName
        );

        const totalCount = total?.count || 1;

        return {
          genotype: subtypeName,
          count,
          frequency: (count / totalCount)*100,
          totalCount: totalCount
        };
      }
    ).sort((a, b) => b.frequency - a.frequency);

  return {
    genotype: formatted_genotype_frequencies,
    subtype: formatted_subtype_frequencies,
  };


  // return Object.entries(counts).map(([genotype, count]) => ({
  //   genotype,
  //   count,
  // }));

}