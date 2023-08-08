import { useEffect, useReducer } from "react";

const reducer = (state: any, { type, responseJSON, error }: any) => {
  switch (type) {
    case "skip":
      return { ...state, isLoading: false };
    case "loading":
      return { ...state, isLoading: true };
    case "success":
      return { responseJSON, isLoading: false, error: null };
    case "error":
      return { responseJSON: null, isLoading: false, error };

    default:
      throw new Error("Unknown action type");
  }
};

const useFetch = (url: string, flags?: { skip?: boolean }) => {
  const [state, dispatch] = useReducer(reducer, {
    responseJSON: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let shouldCancel = false;

    const callFetch = async () => {
      if (flags?.skip) {
        dispatch({ type: "skip" });
        return;
      }
      dispatch({ type: "loading" });
      try {
        const response = await fetch(url);
        const responseJSON = await response.json();

        if (shouldCancel) return;
        dispatch({ type: "success", responseJSON });
      } catch (error: any) {
        if (shouldCancel) return;
        dispatch({ type: "error", error });
      }
    };

    callFetch();

    return () => {
      shouldCancel = true;
    };
  }, [url, flags]);

  return state;
};

export default useFetch;
