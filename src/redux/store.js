import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userReducer } from "~/redux/activeUser/activeUserSlice";

const rootPersistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["user"],
};

const reducers = combineReducers({
  user: userReducer,
});

const persistedReducers = persistReducer(rootPersistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
