import React from 'react';

export const LoadingContext = React.createContext({
    isLoading: false,
    setIsLoading: (isLoading: boolean) => { },
});

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoading, setIsLoading] = React.useState(false);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};
