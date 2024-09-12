import Cookies from "js-cookie";

export type QueryResult<T> =
  | {
      data: T;
      isLoading: false;
      isError: false;
    }
  | {
      data: undefined;
      isLoading: true;
      isError: false;
    }
  | {
      data: undefined;
      isLoading: false;
      isError: true;
    };

const BASE_PATH = "http://localhost:8000";

export async function apiQuery<T>(path: string) {
  const token = Cookies.get("authToken");

  const response = await fetch(`${BASE_PATH}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status === 401) throw new Error("Unauthorized");

  const data = await response.json();

  if (!response.ok) throw new Error(`Query failed: ${data}`);

  return data as T;
}

export async function apiMutation<U, T>(path: string, body: U) {
  const token = Cookies.get("authToken");

  const response = await fetch(`${BASE_PATH}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (response.status === 401) throw new Error("Unauthorized");

  const data = await response.json();

  if (!response.ok) throw new Error(`Query failed: ${data}`);

  return data as T;
}
