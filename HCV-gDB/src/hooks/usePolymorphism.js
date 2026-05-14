import useFetch from "./useFetch";

function usePolymorphism(id) {

  const url = `/api/polymorphism/${id}`;

  const { data, ...rest } = useFetch(id ? url : null);

  const reshaped = data && Object.values(
    data["polymorphism"].reduce((acc, item) => {
      const key = item.mutation_id;

      if (!acc[key]) {
        acc[key] = {
          mutation_id: item.mutation_id,
          aa_position: item.aa_position,
          alt_residue: item.alt_residue,
          reference_accession: item.reference_accession,
          resistance: []
        };
      }

      const exists = acc[key].resistance.some(
        r =>
          r.drug === item.drug &&
          r.resistance_category === item.resistance_category
      );

      if (!exists) {
        acc[key].resistance.push({
          resistance_category: item.resistance_category,
          drug: item.drug,
          drug_category: item.drug_category,
          drug_producer: item.drug_producer,
          pubmed_id: item.pubmed_id,
          in_vitro_max_ec50_midpoint: item.in_vitro_max_ec50_midpoint,
          in_vivo_baseline: item.in_vivo_baseline,
          in_vivo_treatment_emergent: item.in_vivo_treatment_emergent, 
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