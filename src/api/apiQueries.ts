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

export const BASE_PATH = "http://localhost:8000";

export async function apiQuery<T>(path: string) {
  const response = await fetch(`${BASE_PATH}${path}`, {
    credentials: "include",
  });

  if (response.status === 401) throw new Error("Unauthorized");

  const data = await response.json();

  if (!response.ok) throw new Error(`Query failed: ${data}`);

  return data as T;
}

export async function apiMutation<U, T>(path: string, body: U) {
  const response = await fetch(`${BASE_PATH}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });

  if (response.status === 401) throw new Error("Unauthorized");

  if (response.status === 204) return;

  const data = await response.json();

  if (!response.ok) throw new Error(`Query failed: ${data}`);

  return data as T;
}
