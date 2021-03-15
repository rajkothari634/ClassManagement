import '../styles/globals.css'
import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import { ServerStyleSheets } from '@material-ui/core/styles';
// import Document, { Html, Head, Main, NextScript } from 'next/document';
import ContextProvider from "../components/context/contextProvider"

function MyApp({ Component, pageProps }) {
  return <div>
    <div>
      <Head>
        {/* // stuff..... */}
      </Head>
    </div>
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  </div> 
}

export default MyApp
