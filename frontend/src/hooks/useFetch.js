/**
 * useFetch — runs an async function and exposes { data, loading, error }.
 *
 *   const { data, loading, error } = useFetch(() => menuService.listItems({ weekly: true }), []);
 *
 * It re-runs when one of `deps` changes and ignores results that arrive after unmount
 * or after the dependencies changed again.
 */
import { useEffect, useState } from 'react';

const useFetch = (fetcher, deps = []) => {
  const [state, setState] = useState({ data: null, loading: true, error: null });

  useEffect(() => {
    let cancelled = false;
    setState((previous) => ({ ...previous, loading: true, error: null }));

    fetcher()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((error) => {
        if (!cancelled) setState({ data: null, loading: false, error });
      });

    return () => {
      cancelled = true;
    };
    // The caller decides when to re-fetch through `deps`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
};

export default useFetch;
