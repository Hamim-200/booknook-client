"use client";

import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

// Loads data from our Express server and tells the page what is happening.
//   const { data, error, loading, reload, setData } = useApiData("/books");
//   Add { auth: true } for protected routes.
export function useApiData(path, { auth = false } = {}) {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState({ key: null, data: null, error: null });

  // A new key means "a new request". While the result belongs to an old key,
  // we are still loading.
  const key = `${path}|${auth}|${attempt}`;

  useEffect(() => {
    let ignore = false;

    apiFetch(path, { auth })
      .then((data) => {
        if (!ignore) setResult({ key, data, error: null });
      })
      .catch((error) => {
        if (!ignore) setResult({ key, data: null, error });
      });

    // If the page closes or the path changes, ignore the old answer
    return () => {
      ignore = true;
    };
  }, [key, path, auth]);

  const loading = result.key !== key;

  // Try again (used by the "Try again" button)
  const reload = useCallback(() => setAttempt((n) => n + 1), []);

  // Change the data on screen without asking the server (used after a delete)
  const setData = useCallback(
    (update) =>
      setResult((current) => ({
        ...current,
        data: typeof update === "function" ? update(current.data) : update,
      })),
    []
  );

  return {
    data: loading ? null : result.data,
    error: loading ? null : result.error,
    loading,
    reload,
    setData,
  };
}