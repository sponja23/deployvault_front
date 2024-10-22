import { Navigate, useParams } from "react-router-dom";
import { getNonceEntry } from "./nonceMap";
import { useMemo } from "react";

export function AuthCallback() {
  // Read the nonce from the query params
  const { nonce } = useParams();

  const backUrl = useMemo(() => {
    if (!nonce) {
      // If the nonce is not present, redirect to the landing page
      return "/";
    }

    // Read the backUrl from the nonce map
    const entry = getNonceEntry(nonce);
    if (!entry) {
      // If the nonce is not valid, redirect to the landing page
      return "/";
    }

    return entry.backUrl;
  }, [nonce]);

  return <Navigate to={backUrl} replace />;
}
