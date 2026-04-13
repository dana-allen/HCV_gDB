import { useCallback } from "react";
import usePost from "./usePost";

function useCladeSubmission() {
  const url = `/api/analysis/clade_assignment/`;

  const { postData, data, loading, error } = usePost();

  const submitClade = useCallback(
    async (payload) => {
      // payload can be Blob, FormData, JSON, or text
      return await postData(url, payload);
    },
    [postData, url]
  );

  return {
    submitClade,
    data,
    loading,
    error,
  };
}

export default useCladeSubmission;