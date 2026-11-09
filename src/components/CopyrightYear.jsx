"use client";

import { useSyncExternalStore } from "react";

// There is nothing to subscribe to: the year does not change while the page is open
const subscribe = () => () => {};

// Shows the current year.
// In the browser it reads the real date. While the site is being built on the
// server it shows a fixed placeholder, so the build never sees a changing value.
export default function CopyrightYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => 2026
  );

  return <>{year}</>;
}