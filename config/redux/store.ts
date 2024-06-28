import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import solvedCountsReducer from "@/config/redux/slices/solvedCountsSlice";
import swipeModeReducer from "@/config/redux/slices/swipeModeSlice";
const rootReducer = combineReducers({
  solvedCounts: solvedCountsReducer,
  swipeMode: swipeModeReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["solvedCounts", "swipeMode"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
