import rootReducer from "./reducer";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiBaseService } from "./services/apiBaseService";

/**
 * The Redux store configuration.
 */
const store = configureStore({
  reducer: {
    global: rootReducer,
    [apiBaseService.reducerPath]: apiBaseService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(apiBaseService.middleware),
  devTools: true,
});

const { dispatch } = store;

setupListeners(dispatch);

/**
 * The type of the dispatch function provided by the Redux store.
 */
export type AppDispatch = typeof store.dispatch;

/**
 * The type of the state managed by the Redux store.
 */
export type RootState = ReturnType<typeof store.getState>;

export { store, dispatch };
