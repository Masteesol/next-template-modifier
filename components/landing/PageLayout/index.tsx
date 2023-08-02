import React, { useContext } from "react";
import {
    FlexColCentered,
    FlexColContainer,
    FlexRowContainer,
} from "@/components/shared/styled-global-components";
import TopBar from "./TopBar";
import { LoadingContext } from '@/context/LoadingContext';
import { useState } from "react"
import Sidebar from "@/components/landing/PageLayout/Sidebar"

interface PageLayoutProps {
    children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
    const { isLoading } = useContext(LoadingContext);
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="h-[100vh] relative">
            <FlexRowContainer className="text-black dark:text-white h-full">

                <FlexColContainer className="w-full ">
                    <TopBar
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                    />
                    <FlexColContainer
                        id="main"
                        style={{ height: `calc(100vh - 41px)` }}
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
                <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
            </FlexRowContainer>
        </div>
    );
};



export default PageLayout;
