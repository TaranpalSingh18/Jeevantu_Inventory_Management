import { QueryClient } from "@tanstack/react-query";

const API_BASE_URL =
  (typeof process !== "undefined" &&
    process.env &&
    process.env.API_BASE_URL) ||
  "http://localhost:5000";

function getFullUrl(url) {
  // If the URL starts with "/", prepend the API base URL.
  return url.startsWith("/") ? API_BASE_URL + url : url;
}

async function throwIfResNotOk(res) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(method, url, data) {
  const fullUrl = getFullUrl(url);
  const res = await fetch(fullUrl, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });
  await throwIfResNotOk(res);
  return res;
}

export const getQueryFn = ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const fullUrl = getFullUrl(queryKey[0]);
    const res = await fetch(fullUrl, {
      credentials: "include",
    });
    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }
    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
