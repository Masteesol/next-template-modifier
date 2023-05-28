import React from 'react'
import Head from "next/head";
import PageLayout from '../PageLayout';
import { FlexColCentered, H1 } from '../styled-global-components';

export const Error400PageContent = () => {
    return (
        <>
            <Head>
                <title>400 error</title>
                <meta name="robots" content="noindex" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <FlexColCentered className="h-[100vh] w-full">
                <H1 className="pb-9">
                    400: Unauthorized access.
                </H1>
                <h2 className="text-xl">Redirecting to login page...</h2>
            </FlexColCentered>
        </>

    )
}

export const Error404PageContent = () => {
    return (
        <>
            <Head>
                <title>404 error</title>
                <meta name="robots" content="noindex" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageLayout>
                <FlexColCentered className="min-h-full">
                    <H1 className="pb-9">
                        404: Page you are trying to find does not exist.
                    </H1>
                </FlexColCentered>
            </PageLayout>
        </>

    )
}
