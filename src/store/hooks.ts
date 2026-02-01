import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

/**
 * Typed dispatch hook for Redux actions
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Typed selector hook for Redux state
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
