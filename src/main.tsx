import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";
// import "primeflex/primeflex.css";
import "react-toastify/dist/ReactToastify.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { PrimeReactProvider } from "primereact/api";
import { AuthProvider } from "./auth/AuthContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <PrimeReactProvider>
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </AuthProvider>
    </PrimeReactProvider>
);
