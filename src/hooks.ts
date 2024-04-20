// Use throughout your app instead of plain `useDispatch` and `useSelector`
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from 'react-redux'
// import type { TypedUseSelectorHook } from 'react-redux'
import type { AppState, AppDispatch, AppStore } from './store'

export const useAppDispatch = () => useDispatch<AppDispatch>
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
export const useAppStore: () => AppStore = useStore

// https://react-redux.js.org/using-react-redux/usage-with-typescript#withtypes
// If we use react-redux 9
// export const useAppSelector = useSelector.withTypes<AppState>()
// export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
// export const useAppStore = useStore.withTypes<AppStore>()
