"use client";

import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

export function useApiData(path, { auth = false } = {}) {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState({ key: null, data: null, error: null });
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

    return () => {
      ignore = true;
    };
  }, [key, path, auth]);

  const loading = result.key !== key;

  const reload = useCallback(() => setAttempt((n) => n + 1), []);

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