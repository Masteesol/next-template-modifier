import {
    FlexColCentered,
    FlexColCenteredX,
    FlexColContainer,
    FlexRowCentered,
    FlexRowCenteredY,
    FlexRowContainer,
    AddButton,
    DividerHorizontal,

} from "@/components/shared/styled-global-components";
import { FaEyeSlash, FaPlus } from "react-icons/fa";
import TemplateNavButton from "@/components/app/TemplateEditor/templateNavigation/TemplateNavButton";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useState } from "react";

interface TemplateNavigationProps {
    handleViewNavigationSelect: any
    textTemplates: any
    selectedCategory: number
    handleCreateTemplate: any
    templateRefs: any
}

const index = (props: TemplateNavigationProps) => {
    const {
        handleViewNavigationSelect,
        textTemplates,
        selectedCategory,
        handleCreateTemplate,
        templateRefs,
    } = props

    return (
        <FlexColContainer className="px-2">
            <Accordion handleViewNavigationSelect={handleViewNavigationSelect} />
            <FlexColCenteredX className="w-full gap-4 min-w-[18rem] max-w-[18rem] max-h-[90%] overflow-y-auto">
                {textTemplates[selectedCategory].templates.map((template: any, templateIndex: number) => (
                    <TemplateNavButton
                        template={template}
                        index={templateIndex}
                        categoryIndex={selectedCategory}
                        templateRefs={templateRefs}
                        key={`template-nav-button-${selectedCategory}-${templateIndex}`}
                    />
                ))}
            </FlexColCenteredX>
            <FlexColCentered className="mt-auto w-full mb-8 gap-4">
                <AddTemplateButton onClick={handleCreateTemplate} />
            </FlexColCentered>
        </FlexColContainer>
    )
}

export default index

const AddTemplateButton = ({ onClick }: any) => {
    return <FlexRowContainer className="justify-end w-full ">
        <AddButton onClick={onClick}>
            <FlexColCentered>
                <FaPlus />
            </FlexColCentered>
        </AddButton>
    </FlexRowContainer>
}

export const Accordion = ({ handleViewNavigationSelect }: any) => {
    const [expanded, setExpanded] = useState(false)

    return (
        <FlexColContainer className="gap-2">
            <FlexRowCenteredY className="justify-between text-lg cursor-pointer gap-4"
                onClick={() => setExpanded(!expanded)}
            >
                <h3>Templates</h3>
                {!expanded
                    ?
                    <BsChevronDown />
                    :
                    <BsChevronUp />
                }

            </FlexRowCenteredY>
            <DividerHorizontal className="w-full border-gray-200" />
            <FlexRowCenteredY
                className={`${expanded ? "h-[5rem] py-4" : "h-0"} overflow-hidden gap-4 w-full transition-all ease-in-out`}
            >
                <FlexRowCentered className="gap-2 cursor-pointer flex-1"
                    onClick={handleViewNavigationSelect}
                >
                    <FaEyeSlash className="text-lg" />
                    <label className="cursor-pointer">Hide</label>
                </FlexRowCentered>
            </FlexRowCenteredY>
        </FlexColContainer>
    );
};

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
                Edit Order
            </span>
        </label>
    );
};