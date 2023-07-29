import {
    DividerHorizontal,
    DividerPipe,
    FlexColContainer,
    FlexExpandable,
    FlexRowCentered,
    FlexRowCenteredY,
} from "@/components/shared/styled-global-components";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react"

export const EditToggle = ({ isEditing, setIsEditing }: any) => {
    const handleToggle = () => {
        setIsEditing(!isEditing);
    };

    return (
        <label className="relative flex cursor-pointer">
            <input
                type="checkbox"
                checked={isEditing}
                onChange={handleToggle}
                className="sr-only"
            />
            <div className={`w-11 h-6 rounded-full transition-all dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white ${isEditing ? 'bg-green-300' : 'bg-gray-200'}`}>
                <div className={`after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${isEditing ? 'after:translate-x-full after:bg-green-600 after:border-green-400' : 'after:bg-gray-500 after:border-gray-300'}`}></div>
            </div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Edit List
            </span>
        </label>
    );
};

interface AccordionProps {
    handleView: any;
    isEditing: boolean;
    setIsEditing: any;
    title: string;

}

export const Accordion = ({ handleView, isEditing, setIsEditing, title }: AccordionProps) => {
    //by default expanded on mobile devices
    const [expanded, setExpanded] = useState(window ? window.innerWidth < 1280 : false)

    return (
        <FlexColContainer className="gap-2">
            <FlexRowCenteredY className="justify-between text-lg cursor-pointer gap-4"
                onClick={() => setExpanded(!expanded)}
            >
                <h3>{title}</h3>
                {!expanded
                    ?
                    <BsChevronDown />
                    :
                    <BsChevronUp />
                }

            </FlexRowCenteredY>
            <DividerHorizontal className="w-full border-gray-200" />
            <FlexExpandable
                $expanded={expanded}
                $heightAndPadding="h-[5rem] py-4"
            >
                <FlexRowCentered className="flex-1">
                    <EditToggle isEditing={isEditing} setIsEditing={setIsEditing} />
                </FlexRowCentered>
                <DividerPipe />
                <FlexRowCentered className="gap-2 cursor-pointer flex-1"
                    onClick={handleView}
                >
                    <FaEyeSlash className="text-lg" />
                    <label className="cursor-pointer">Hide</label>
                </FlexRowCentered>
            </FlexExpandable>
        </FlexColContainer>
    );
};
