import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { activeHotelReducer } from "~/redux/activeHotel/activeHotelSlice";
import { userReducer } from "~/redux/activeUser/activeUserSlice";
import { notificationsReducer } from "~/redux/notifications/notificationsSlice";

const rootPersistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["user"],
};

const reducers = combineReducers({
  user: userReducer,
  activeHotel: activeHotelReducer,
  notifications: notificationsReducer,
});

const persistedReducers = persistReducer(rootPersistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
