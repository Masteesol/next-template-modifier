import {
    FlexColContainer,
    FlexRowContainer,
    HollowButton,
    DividerHorizontal,
    FlexRowCenteredY,
    CTAButton
} from "@/components/shared/styled-global-components";
import { BsCheck } from "react-icons/bs";
import { Badge } from "flowbite-react";

interface userInfoType {
    first_name: string | readonly string[] | undefined | null;
    last_name: string | readonly string[] | undefined | null;
    subscription_tier_id: string | readonly string[] | undefined | null;

}

interface SubscriptionTier {
    categories_limit: number;
    character_limit: number;
    created_at: string;
    id: string;
    name: string;
    templates_limit: number;
}

export const TierCard = ({ subTier, userInfo }: { subTier: SubscriptionTier, userInfo: userInfoType }) => {
    const isSelected = subTier.id === userInfo.subscription_tier_id
    //console.log(subTier)
    return (
        <FlexColContainer className="relative gap-8 min-w-[10rem] min-h-[25rem] border-[1px] border-gray-300 rounded p-4 shadow-md bg-white dark:bg-gray-900 dark:border-white">
            <FlexRowContainer className="absolute right-0 top-[-5px]">
                {isSelected
                    ? <Badge color="success">Selected</Badge>
                    : <Badge color="warning">Coming Soon!</Badge>
                }
            </FlexRowContainer>
            <FlexColContainer className="text-center font-bold gap-8">
                <h2 className="uppercase ">{subTier.name}</h2>
                {subTier.name === "basic" ?
                    <h3 className="text-center text-2xl">Free</h3>
                    : <h3 className="text-center text-2xl">Not Available</h3>
                }
            </FlexColContainer>
            <DividerHorizontal />
            <FlexColContainer className="gap-2">
                <FlexRowCenteredY className="gap-2">
                    <BsCheck className="text-xl" /><span>{subTier.templates_limit} templates</span>
                </FlexRowCenteredY>
                <FlexRowCenteredY className="gap-2">
                    <BsCheck className="text-xl" /><span>{subTier.categories_limit} categories</span>
                </FlexRowCenteredY>
                <FlexRowCenteredY className="gap-2">
                    <BsCheck className="text-xl" /><span >{subTier.character_limit} characters per template</span>
                </FlexRowCenteredY>
            </FlexColContainer>
            {isSelected ?
                <HollowButton disabled={true} className="mt-auto">Selected</HollowButton>
                : <CTAButton disabled={true} className="mt-auto">Upgrade</CTAButton>
            }

        </FlexColContainer>
    )
}