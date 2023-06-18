import React from 'react'
import { FlexColCentered, H1 } from '../styled-global-components';

export const Error400PageContent = () => {
    return (
        <>
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

            <FlexColCentered className="min-h-full">
                <H1 className="pb-9">
                    404: Page you are trying to find does not exist.
                </H1>
            </FlexColCentered>
        </>

    )
}
