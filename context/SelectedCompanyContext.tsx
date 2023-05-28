import React, { createContext, useContext, useState, useEffect } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage'; // Import your useLocalStorage hook
import mockData from "@/mockData/companyData.json"

// Define the type for a company
type Company = {
    id: string;
    name: string;
    logo: string;
    theme: {
        colors: {
            primary: { background: string; text: string; };
            secondary: { background: string; text: string; };
            highlighted: { background: string; text: string; };
        };
        text: { fontFamily: string };
        bannerTemplate: number;
    };
}

// Create a context
const SelectedCompanyContext = createContext({
    selectedCompany: null as Company | null,
    setSelectedCompanyId: (id: string) => { } // Set the correct function signature here
});

// Create a provider that holds the state and the setter function
export const SelectedCompanyProvider = ({ children }: any) => {
    const [selectedCompanyId, setSelectedCompanyId] = useLocalStorage('selectedCompany', '')
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

    useEffect(() => {
        // if localStorage is empty, set the first company as the selected company
        if (!selectedCompanyId && mockData.company.length > 0) {
            setSelectedCompanyId(mockData.company[0].id);
        } else {
            const companyData = mockData.company.find(item => item.id === selectedCompanyId);
            setSelectedCompany(companyData || null);
        }
    }, [selectedCompanyId, setSelectedCompanyId]);

    //console.log(selectedCompany)
    return (
        <SelectedCompanyContext.Provider value={{ selectedCompany, setSelectedCompanyId }}>
            {children}
        </SelectedCompanyContext.Provider>
    );
};

// Create a custom hook that uses the context
export const useSelectedCompany = () => useContext(SelectedCompanyContext);
