import { useEffect, useLayoutEffect } from "react";

/** useLayoutEffect in the browser (runs before paint); useEffect during SSR, where neither runs. */
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default useIsoLayoutEffect;
