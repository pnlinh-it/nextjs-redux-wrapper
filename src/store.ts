import { Action, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from '@/src/wrapper';
import { userSlice } from '@/src/features/user.slice';
import { pokemonApi } from '@/src/api';

// https://github.com/kirill-konshin/next-redux-wrapper/blob/8.x/packages/demo-redux-toolkit/store.ts
const combineReducer = combineReducers({
  // Use user as key instead of [userSlice.name] for better suggestion
  [userSlice.name]: userSlice.reducer,
  [pokemonApi.reducerPath]: pokemonApi.reducer
});

// const reducer = (state: any, action: any): ReturnType<typeof combineReducer> => {
const reducer: typeof combineReducer = (state, action: any) => {
  console.log(action)
  console.log(state)
  if (action.type === HYDRATE) {
    // @ts-ignore
    return {
      ...state,
      ...action.payload,
    };
  } else {
    return combineReducer(state, action);
  }
};

const makeStore = () => configureStore({
  reducer,
  devTools: true,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;
export type AppDispatch = AppStore['dispatch']
export const wrapper = createWrapper<AppStore>(makeStore, {debug: true});
