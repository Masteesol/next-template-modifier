import React from 'react';

export const SaveStatusContext = React.createContext({
    saveStatus: "", // This will hold the status of the save operation
    setSaveStatus: (saveStatus: string) => { },
});

export const SaveStatusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [saveStatus, setSaveStatus] = React.useState("");

    return (
        <SaveStatusContext.Provider value={{ saveStatus, setSaveStatus }}>
            {children}
        </SaveStatusContext.Provider>
    );
};
