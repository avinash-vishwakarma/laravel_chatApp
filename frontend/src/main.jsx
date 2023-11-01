import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./app/store.js";
import axios from "axios";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

axios.defaults.baseURL =
  import.meta.env.VITE_REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";
axios.defaults.withCredentials = true;

console.log(import.meta.env.VITE_REACT_APP_API_BASE_URL);

window.Pusher = Pusher;
window.Echo = new Echo({
  broadcaster: "pusher",
  key: import.meta.env.VITE_REACT_PUSHER_KEY,
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
  forceTLS: false,
  wsHost: window.location.hostname,
  wsPort: 6001,
  disableStats: true,
  encrypted: true,
  authorizer: (channel, options) => {
    return {
      authorize: (socketId, callback) => {
        axios
          .post(
            `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/broadcasting/auth`,
            {
              socket_id: socketId,
              channel_name: channel.name,
            }
          )
          .then((response) => {
            callback(false, response.data);
          })
          .catch((error) => {
            callback(true, error);
          });
      },
    };
  },
});

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
