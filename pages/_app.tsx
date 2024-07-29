import '@mantine/core/styles.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { wrapper } from '@/store/store';
import '@mantine/notifications/styles.css';
import { injectCssVariables, theme } from '@/theme';
import { useEffect } from 'react';

// @ts-ignore
const App = ({
                 Component,
                 pageProps,
             }: AppProps) => {
    useEffect(() => {
        injectCssVariables();
    }, []);
    // @ts-ignore
    return (<MantineProvider theme={theme}>
        <Notifications position="top-right" />

        <Head>
            <title>Shopping list</title>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
            />
            <link rel="shortcut icon" href="icons/favicon.ico" />
            <link rel="manifest" href="/manifest.json" />
            <meta name="theme-color" content="#ffffff" />
            <link />
            @import
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
            <link
              href="https://fonts.googleapis.com/css2?family=Dosis:wght@200;300;400;500;600&family=Nuni to:ital,wght@0,200;0,300;0,400;0,600;1,200;1,300;1,400;1,600&display=swap"
              rel="stylesheet"
            />
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        </Head>

        <Component {...pageProps} />

            </MantineProvider>);
};

export default wrapper.withRedux(App);
