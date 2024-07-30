import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { PrimeReactProvider } from "primereact/api";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <PrimeReactProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </PrimeReactProvider>
);
