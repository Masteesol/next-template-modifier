import checkSession from '@/utils/checkAuth';
import { useEffect, createContext, useState, useContext } from 'react';
import { LoadingContext } from './LoadingContext';
import Cookies from 'js-cookie';
import { useRouter } from "next/router"
import { getUserInfo } from '@/requests/profile';
export const AuthContext = createContext({
    isAuthenticated: false,
    setIsAuthenticated: (isAuthenticated: boolean) => { },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { setIsLoading } = useContext(LoadingContext);

    useEffect(() => {
        const authenticate = async () => {
            console.log("Checking authentication backend")
            const auth = await checkSession();
            console.log("Finished authentication from backend. Is authenticated: ", auth);
            setIsLoading(false);
            if (auth) {
                setIsAuthenticated(true);
                Cookies.set("user_id", auth.session.user.id);
                if (auth.session.user.email) {
                    Cookies.set("email", auth.session.user.email);
                }
                const user = await getUserInfo(auth.session.user.id)
                if (user) {
                    Cookies.set("user_first_name", user.first_name)
                    Cookies.set("user_last_name", user.last_name)
                    Cookies.set("sub_tier_id", user.subscription_tier_id)
                }
            } else {
                setIsAuthenticated(false);
                if (router.pathname.startsWith("/app")) {
                    router.push("/");
                }
            }

        };

        authenticate();
    }, [setIsAuthenticated, router]);
    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

