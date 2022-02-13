import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./storeSlice";

export const store = configureStore({
  reducer: {
    store: appReducer,
  },
});
