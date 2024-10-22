export type Nonce = string;

export type NonceEntry = {
  backUrl: string;
};

type nonceMap = {
  [key: Nonce]: NonceEntry;
};

function readNonceMap(): nonceMap {
  return JSON.parse(localStorage.getItem("nonceMap") || "{}");
}

function writeNonceMap(map: nonceMap) {
  localStorage.setItem("nonceMap", JSON.stringify(map));
}

function generateNonce() {
  return (Math.random() + 1).toString(36).substring(7);
}

export function newNonceEntry(entry: NonceEntry): Nonce {
  const key = generateNonce();

  // Store the nonce in the local storage map
  const map = readNonceMap();
  map[key] = entry;

  writeNonceMap(map);

  return key;
}

export function getNonceEntry(nonce: Nonce): NonceEntry | undefined {
  const map = readNonceMap();
  return map[nonce];
}
