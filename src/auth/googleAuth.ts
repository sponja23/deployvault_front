// TODO: Refactor, maybe integrate this with the AuthContext

import { BASE_PATH } from "../api/apiQueries";
import { newNonceEntry } from "./nonceMap";

export function googleLogin(backUrl: string) {
  // Generate nonce
  const nonce = newNonceEntry({ backUrl });

  // Redirect to Google login
  window.location.href = `${BASE_PATH}/auth/google/login?nonce=${nonce}`;
}
