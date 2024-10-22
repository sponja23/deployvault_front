import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";

import { AuthProvider } from "./auth/AuthContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </QueryClientProvider>,
);
