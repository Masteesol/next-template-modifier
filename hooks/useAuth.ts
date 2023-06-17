// useAuth.ts

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [email, setEmail] = useState<string | undefined>('');

    useEffect(() => {
        const token = Cookies.get('supabaseToken');
        console.log("token", token)
        if (token) {
            setIsAuthenticated(true);
            setEmail(Cookies.get('email'));
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    return { isAuthenticated, setIsAuthenticated, email };
}
