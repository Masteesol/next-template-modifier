import { FlexColCentered } from "../styled-global-components"

const GuidingDescriptionText = ({ children }: any) => {
    return <FlexColCentered>
        <i>{children}</i>
    </FlexColCentered>
}

export default GuidingDescriptionText;