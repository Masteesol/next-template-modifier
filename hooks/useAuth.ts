import { useState, useEffect, createContext } from 'react';
import Cookies from 'js-cookie';

interface IAuthContext {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
}

//const AuthContext = createContext<IAuthContext | undefined>(undefined);

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(null);
    const [email, setEmail] = useState<string | undefined>('');
    const [name, setName] = useState<string | undefined>('');

    useEffect(() => {
        const token = Cookies.get('bearerToken');
        
        if (token) {
            setIsAuthenticated(true);
            setEmail(Cookies.get('email'));
            setName(Cookies.get('namesurname'));
            
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    console.log("return: " + isAuthenticated);
    return { isAuthenticated, setIsAuthenticated, email, name };
}
