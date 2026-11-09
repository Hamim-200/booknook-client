"use client";

import { useSyncExternalStore } from "react";
const subscribe = () => () => {};

export default function CopyrightYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => 2026
  );

  return <>{year}</>;
}