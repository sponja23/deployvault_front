import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

/**
 * Custom hook that returns the dispatch function from the Redux store.
 * @returns The dispatch function with the type of `AppDispatch`.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * A custom hook that provides type-safe access to the Redux store state.
 *
 * @template T - The type of the state slice that the hook selects.
 * @param selector - A function that selects a slice of the Redux store state.
 * @returns The selected state slice.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
