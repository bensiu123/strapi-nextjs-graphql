import "../styles/globals.css";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.css";
import Layout from "../src/components/Lyaout";
import { ApolloProvider } from "@apollo/client";
import client from "@/config/apollo";
import { AppContext, useAppContext } from "@/context/AppContext";

const App = ({ Component, pageProps }: AppProps) => {
  const appContext = useAppContext();

  return (
    <AppContext.Provider value={appContext}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
  );
};

export default function WrappedApp(appProps: AppProps) {
  return (
    <ApolloProvider client={client}>
      <App {...appProps} />
    </ApolloProvider>
  );
}
