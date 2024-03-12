import "@/styles/globals.css";
import App, { AppContext, AppInitialProps, AppProps } from "next/app";

function MyApp({Component, pageProps}: AppProps) {
  return <Component {...pageProps} />;
}
  
MyApp.getInitialProps = async (
  context: AppContext
): Promise<AppInitialProps & any> => {

  const ctx = await App.getInitialProps(context)

  return {...ctx, example: 'data'}
}
export default MyApp
