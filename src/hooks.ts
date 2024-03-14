// Use throughout your app instead of plain `useDispatch` and `useSelector`
import { useDispatch, useSelector, useStore } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { AppState, AppDispatch, AppStore } from './store'

export const useAppDispatch = () => useDispatch<AppDispatch>
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
export const useAppStore: () => AppStore = useStore
