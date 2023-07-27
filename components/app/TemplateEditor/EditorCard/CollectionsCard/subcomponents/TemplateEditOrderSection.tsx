import { FlexRowCenteredY } from "@/components/shared/styled-global-components"
import { CollectionItem, Templates } from "@/types/global"
import { BsFillGrid3X2GapFill } from "react-icons/bs"

const TemplateEditable = (template: Templates) => {
    return template.template_collections.map((collectionItem: CollectionItem) => {
        return <div
            className={`w-full pe-2`}
            id={`editable-${collectionItem.id}`}
        >
            <FlexRowCenteredY className="gap-4 justify-between cursor-grab bg-slate-50 rounded shadow px-2 text-sm">
                <h3>
                    {`${collectionItem.text.substring(0, 50)}...`}
                </h3>
                <div className="p-2">
                    <BsFillGrid3X2GapFill className="text-xl" />
                </div>

            </FlexRowCenteredY>
        </div >
    })
}

export default TemplateEditable