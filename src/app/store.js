import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import authSlice from "../features/auth/authSlice";
import ordersSlice from "../features/orders/ordersSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authSlice,
  orders: ordersSlice,
});

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: customizedMiddleware,
});

export const persistor = persistStore(store);
// persistor.purge();
