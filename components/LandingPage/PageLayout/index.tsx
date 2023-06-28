import React, { useEffect, useContext } from "react";
import {
    FlexColCentered,
    FlexColContainer,
    FlexRowContainer,
} from "@/components/styled-global-components";
import TopBar from "./TopBar";
import { LoadingContext } from '@/context/LoadingContext';

interface PageLayoutProps {
    children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
    const { isLoading } = useContext(LoadingContext);
    //console.log(authenticated)
    useEffect(() => {
        const main = document.querySelector<HTMLDivElement>("#main");
        if (main) main.style.height = `calc(100vh - 41px)`;
    }, []);

    return (
        <div>
            <FlexRowContainer className="text-black dark:text-white">
                <FlexColContainer className="w-full ">
                    <TopBar />
                    <FlexColContainer
                        id="main"
                        className="w-full overflow-auto bg-slate-50 dark:bg-gray-800 box-border"
                    >
                        {
                            isLoading
                                ?
                                <FlexColCentered className="w-full h-full ">
                                    <div className="loader text-green-400"></div>
                                </FlexColCentered>
                                :
                                children
                        }
                    </FlexColContainer>
                </FlexColContainer>
            </FlexRowContainer>
        </div>
    );
};



export default PageLayout;
