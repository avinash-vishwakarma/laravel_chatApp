import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authStateSlice from "./stateSlice/authStateSlice";
import toasterAlertStateSlice from "./stateSlice/toasterAlertStateSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const rootReducer = combineReducers({
  auth: authStateSlice,
  toaster: toasterAlertStateSlice,
});

const persistConfig = {
  key: "chat_app",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
