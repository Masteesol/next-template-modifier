import React from "react";
import { useTranslation } from "next-i18next";
import { useState } from "react"
import FormDefaultValues from "./FormDefaultValues";
import FormCampaignDetails from "./FormCampaignDetails";
import { FlexColRowContainerLg, FlexColContainer, FlexRowCenteredY } from "@/components/styled-global-components";
import { translateOrDefault } from "@/utils/i18nUtils";
import { Address } from "@/types";
import { FaEdit } from "react-icons/fa";

interface CampaignDetailsTabProps {
  listingData: Address;
  setListingData: React.Dispatch<React.SetStateAction<Address | null>>
}

const CampaignDetailsTab: React.FC<CampaignDetailsTabProps> = ({ listingData, setListingData }) => {
  const { t } = useTranslation("common");
  const [isEditActive, setIsEditActive] = useState(false);
  const toggleEdit = () => {
    setIsEditActive(!isEditActive);
  };

  return (
    <FlexColRowContainerLg className="gap-5 w-full">
      <FlexColContainer className="flex-1 gap-4 max-w-[700px]">
        <FlexRowCenteredY className="justify-between ">
          <h3>
            {translateOrDefault(t, "pages.campaignEditor.tabs.campaignDetails.basicInfoForm.heading", "Basic Information"
            )}
          </h3>
          <FaEdit className={`hover:text-slate-300 cursor-pointer ${isEditActive && "text-slate-300"}`} onClick={toggleEdit} />
        </FlexRowCenteredY>
        <FormDefaultValues addressData={listingData.addressData} setListingData={setListingData} isEditActive={isEditActive} />
      </FlexColContainer>
      <FlexColContainer className="flex-1 gap-4">
        <h3>
          {translateOrDefault(t,
            "pages.campaignEditor.tabs.campaignDetails.campaignInfoForm.heading", "Campaign Information"
          )}
        </h3>
        <FormCampaignDetails campaignData={listingData.campaignData} setListingData={setListingData} />
      </FlexColContainer>
    </FlexColRowContainerLg>
  );
};

export default CampaignDetailsTab;
