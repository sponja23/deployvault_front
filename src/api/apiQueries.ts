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

  // TODO: Refactor this to a separate and reusable function
  if (response.status === 401) {
    // We now have to try to refresh the token
    // If it fails, we'll throw an error

    const refreshResponse = await fetch(`${BASE_PATH}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (refreshResponse.status === 401) {
      throw new Error("Unauthorized");
    }

    if (!refreshResponse.ok) {
      throw new Error("Failed to refresh token");
    }

    // Retry the original request
    const retryResponse = await fetch(`${BASE_PATH}${path}`, {
      credentials: "include",
    });

    if (!retryResponse.ok) {
      throw new Error("Failed to retry request after refreshing token");
    }

    const data = await retryResponse.json();

    return data as T;
  }

  const data = await response.json();

  if (!response.ok) throw new Error(`Query failed: ${data}`);

  return data as T;
}

export async function apiMutation<U, T>(
  path: string,
  body: U,
  method = "POST",
) {
  const response = await fetch(`${BASE_PATH}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });

  // TODO: Refactor this to a separate and reusable function
  if (response.status === 401) {
    // We now have to try to refresh the token
    // If it fails, we'll throw an error

    const refreshResponse = await fetch(`${BASE_PATH}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (refreshResponse.status === 401) {
      throw new Error("Unauthorized");
    }

    if (!refreshResponse.ok) {
      throw new Error("Failed to refresh token");
    }

    // Retry the original request
    const retryResponse = await fetch(`${BASE_PATH}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    });

    if (!retryResponse.ok) {
      throw new Error("Failed to retry request after refreshing token");
    }

    const data = await retryResponse.json();

    return data as T;
  }

  if (response.status === 204) return;

  const data = await response.json();

  if (!response.ok) throw new Error(`Query failed: ${data}`);

  return data as T;
}
