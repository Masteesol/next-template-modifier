// useRequireAuth.ts

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from './useAuth';

export function useRequireAuth(redirectUrl = '/sign-in') {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push({
                pathname: redirectUrl,
                query: { returnUrl: router.asPath },
            });
        }
    }, [isAuthenticated, router, redirectUrl]);

    return isAuthenticated;
}
