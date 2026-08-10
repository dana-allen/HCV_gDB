import useFetch from "./useFetch";

function usePolymorphism(id) {

  const url = `/api/polymorphism/${id}`;

  const { data, ...rest } = useFetch(id ? url : null);

  const reshaped = data && Object.values(
    data["polymorphism"]["polymorphism"].reduce((acc, item) => {
      const alignment = item.alignment_name;
      const mutation = item.signature_id;
      const drug_regimen_id = item.id;
      const drug_regimens = data["polymorphism"]["drug_regimen_results"].filter(item => item.phdr_alignment_ras_drug_id === drug_regimen_id).filter((item, index, array) =>
        index === array.findIndex(
            x => x.phdr_regimen_id === item.phdr_regimen_id
        )
    );

      const drug_trials = data["polymorphism"]["drug_regimen_results"].filter(item => item.phdr_alignment_ras_drug_id === drug_regimen_id).filter((item, index, array) =>
        index === array.findIndex(
            x => x.phdr_clinical_trial_id === item.phdr_clinical_trial_id
        )
    );
      if (!acc[alignment]) {
        acc[alignment] = {
          alignment_name: alignment,
          mutations: {}
        };
      }

      if (!acc[alignment].mutations[mutation]) {
        acc[alignment].mutations[mutation] = {
          mutation_id: item.mutation_id,
          signature_id: item.signature_id, 
          aa_position: item.aa_position,
          alt_residue: item.alt_residue,
          reference_accession: item.reference_accession,
          resistance: []
        };
      }

      const resistance = acc[alignment].mutations[mutation].resistance;

      const exists = resistance.some(
        r =>
          r.drug === item.drug &&
          r.resistance_category === item.resistance_category
      );

      if (!exists) {
        resistance.push({
          resistance_category: item.resistance_category,
          drug: item.drug,
          drug_category: item.drug_category,
          drug_producer: item.drug_producer,
          pubmed_id: item.pubmed_id,
          drug_regimen: drug_regimens,
          drug_trials: drug_trials,
          in_vitro_max_ec50_midpoint: item.in_vitro_max_ec50_midpoint,
          in_vivo_baseline: item.in_vivo_baseline,
          in_vivo_treatment_emergent: item.in_vivo_treatment_emergent
        });
      }

      return acc;
    }, {})
  );

  const polymorphism = reshaped
  const sequences = data && data["sequences"]
  const chart_data = data && data["chart_data"]


  return { polymorphism, sequences, chart_data, ...rest };

};

export default usePolymorphism;