import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import solvedCountsReducer from "@/config/redux/slices/solvedCountsSlice";

const rootReducer = combineReducers({
  solvedCounts: solvedCountsReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["solvedCounts"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
