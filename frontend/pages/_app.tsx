import "./style.css";

import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";

import Config from "../constants/config";

function CustomApp({ Component, pageProps }: AppProps) {
  const { OG_TITLE, OG_URL, OG_DESCRIPTION, OG_SITENAME } = pageProps;

  const description = OG_DESCRIPTION ?? Config.DEFAULT_DESCRIPTION;
  const url = OG_URL ? `${Config.BASE_URL}${OG_URL}` : Config.BASE_URL;

  const ogTytle = OG_TITLE ?? Config.DEFAULT_TITLE;

  const siteName = OG_SITENAME ?? Config.SITE_NAME;

  return (
    <>
      <Head>
        <title>{ogTytle}</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:site_name" content={siteName} />
        <meta property="og:url" content={url} />
        <meta httpEquiv="Content-Type" content="text-html; charset=UTF-8" />
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="author" content={Config.AUTHOR} />
        <meta name="article:author" content={Config.AUTHOR} />
      </Head>
      <main>
        <ChakraProvider>
          <Component {...pageProps} pageUrl={url} />
        </ChakraProvider>
      </main>
    </>
  );
}

export default CustomApp;
