import React from 'react'
import TemplateSingleCard from "@/components/app/TemplateEditor/EditorCard/SingleCard"
import { Templates } from '@/types/global';
import { useState } from "react"
const TextExample = `Hello #,

Your order # is successfully processed and will be shipped out on #. 

Regards, 
Support Team
`

const exampleTemplate: Templates = {
    title: 'Successfully shipped',
    text: TextExample,
    template_id: "123456789",
    char_limit: null,
    copy_count: 0,
    word_limit: null,
    limiter_active: false,
    order: 0,
    favourited: false,
    is_collection: false,
    template_collections: []
}

const tierLimits = {
    char: 1000,
}

const StandAloneTemplate = () => {
    const [selectedCategory] = useState(0);
    const [template, setTemplate] = useState<Templates>(exampleTemplate);
    const [templateRefs] = useState<React.RefObject<HTMLDivElement>[]>([]);

    const handleTextTemplateChange = async (categoryIndex: number, templateIndex: number, newTemplate: Templates) => {
        console.log("Example template updated", categoryIndex, templateIndex)
        setTemplate(newTemplate)
    };




    const handleRemoveTemplate = async (index: number, template_id: string) => {
        console.log("Cannot delete demo", index, template_id)
    };


    return (
        <div><TemplateSingleCard
            key={template.template_id}
            categoryIndex={selectedCategory}
            index={0}
            template={template}
            handleRemoveTemplate={handleRemoveTemplate}
            handleTextTemplateChange={handleTextTemplateChange}
            ref={templateRefs[0]}
            userID={"123456798"}
            subscriptionLimits={tierLimits}
            isTutorial={true}
        /></div>
    )
}

export default StandAloneTemplate