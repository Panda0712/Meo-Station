import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "~/redux/store";
import { injectStore } from "~/utils/authorizeAxios";
import App from "./App.jsx";
import "./index.css";

const persistor = persistStore(store);
injectStore(store);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
        <ToastContainer position="top-right" theme="colored" />
      </PersistGate>
    </Provider>
  </StrictMode>
);
