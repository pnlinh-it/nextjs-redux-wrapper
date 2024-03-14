import "@/styles/globals.css";
import App, { AppProps } from "next/app";
import { AppState, wrapper } from '@/src/store';
import { Provider } from 'react-redux';
import { AppCallback } from '@/src/wrapper';

type MyAppProps = Omit<AppProps, 'pageProps'> &
  PageInitialProps &
  { someField: number } &
  { initialState: AppState }

/**
 * MyAppProps contains 2 importance field:
 *   - pageProps: Data return from appCallback
 *   - initialState: Data of Redux store
 */
const MyApp = ({Component, ...rest}: MyAppProps) => {
  console.log('pageProps:', rest.pageProps);
  console.log('initialState:', rest.initialState);

  const {store, props} = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <h1>PageProps.id: {rest.pageProps.someField}</h1>
      <Component {...props.pageProps} />
    </Provider>
  );
};

interface PageInitialProps {
  pageProps: any // any is anything return from children.getInitialProps (Hello.getInitialProps)
}

const appCallback: AppCallback<any, any> = store => async (appCtx): Promise<PageInitialProps> => {
  // childrenInitialProps.pageProps → { name: 'Linh' }
  const childrenInitialProps: PageInitialProps = await App.getInitialProps(appCtx);

  if (appCtx.ctx.req) {
    // If that process runs in server, we need to wait all thunk run complete
    // await allThunksPromise()
  }

  // { name: 'Linh', someField: 42 }
  return {
    pageProps: {
      ...childrenInitialProps.pageProps,
      someField: 42,
    },
  };
}
/**
 * wrapper.getInitialAppProps will:
 *   - Create store
 *   - Invoke appCallback
 *     - appCallback will invoke Hello.getInitialProps → update some data in store's state
 *   - Then return { initialState: AppState, pageProps: Return type of appCallback}
 *   @see wrapper.getInitialAppProps
 *   @see wrapper.makeProps
 */
MyApp.getInitialProps = wrapper.getInitialAppProps(appCallback)

export default MyApp

/*
const getInitialAppProps = (appCallback) => {
  const {initialProps, initialState} = await makeProps();
  return {
    ...initialProps,
    initialState,
  };
}

const makeProps = async () => {
  const store = initStore({context, makeStore});

  if (config.debug) console.log(`1. getProps created store with state`, store.getState());

  const initialProps = appCallback(context)

  if (config.debug) console.log(`3. getProps after dispatches has store state`, store.getState());

  return {
    initialProps, initialState: store.getState(),
  };
};
*/
