import { fetchTemplatesForUser } from '@/requests/templates';
import { TemplatesContainer } from '@/types/global';
import Cookies from 'js-cookie';
import React from 'react';
import { useEffect, useContext } from "react"
import { useRouter } from "next/router"
import { LoadingContext } from './LoadingContext';
// Define the type for your context
interface TemplatesContextProps {
    textTemplates: TemplatesContainer[];
    setTextTemplates: React.Dispatch<React.SetStateAction<TemplatesContainer[]>>;
}

// Create context with default values
export const TemplatesContext = React.createContext<TemplatesContextProps>({
    textTemplates: [],
    setTextTemplates: () => { },
});

export const TextTemplatesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [textTemplates, setTextTemplates] = React.useState<TemplatesContainer[]>([]);
    const router = useRouter()
    const userID = Cookies.get("user_id")
    const { setIsLoading } = useContext(LoadingContext);
    useEffect(() => {
        const path = router.pathname
        console.log("path", path)

        if (path === "/app/templates") {
            console.log("got here")
            setIsLoading(true)
            fetchTemplatesForUser(userID, setIsLoading).then((data) => {
                if (data) {
                    console.log("Templates", data)
                    const templatesContainers: TemplatesContainer[] = data
                        .sort((a, b) => a.order - b.order)
                        .map(container => ({
                            ...container,
                            templates: container.templates
                                .sort((a, b) => a.order - b.order)
                                .map(template => ({
                                    ...template,
                                    template_collections: template.template_collections.sort((a, b) => a.order - b.order),
                                })),
                        }));
                    setIsLoading(false)
                    setTextTemplates(templatesContainers);
                }
            })
        }
    }, [router.pathname]); // Only re-run the effect if router.pathname changes

    return (
        <TemplatesContext.Provider value={{ textTemplates, setTextTemplates }}>
            {children}
        </TemplatesContext.Provider>
    );
};
