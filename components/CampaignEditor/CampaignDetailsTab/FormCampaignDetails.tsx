//import { useTranslation } from "next-i18next";

import { Label, Select, Textarea, TextInput } from "flowbite-react";
import {
  FlexRowContainer,
  Form,
  FormWrapper,
} from "@/components/styled-global-components";
//import { translateOrDefault } from "@/utils/i18nUtils";

import { CampaignData, Address } from "@/types";
import { handleInputChange, handleTextAreaChange, handleSelectChange, handleDateInputChange } from "@/utils/handleFormElementChange";

interface FormCampaignDetails {
  campaignData: CampaignData;
  setListingData: React.Dispatch<React.SetStateAction<Address | null>>
}

const FormAddedValues = ({ campaignData, setListingData }: FormCampaignDetails) => {
  //const { t } = useTranslation("common");
  const onInputChange = handleInputChange(setListingData);
  const onTextAreaChange = handleTextAreaChange(setListingData)
  const onSelectChange = handleSelectChange(setListingData);
  const onDateInputChange = handleDateInputChange(setListingData);
  return (
    <FormWrapper>
      <Form>
        <div id="realtor-name">
          <div className="mb-2 block">
            <Label htmlFor="realtor-name" value="Real Estate Agent" />
          </div>
          <TextInput
            id="linkInput"
            name="campaignData.realtorName"
            defaultValue={campaignData.realtorName}
            onChange={onInputChange}
          />
        </div>
        <FlexRowContainer className="gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="dateStart" value="Start Date" />
            </div>
            <input
              className="bg-transparent rounded active:border-slate-300 focus:ring-slate-300"
              id="dateStart"
              type="date"
              name="campaignData.startDate"
              defaultValue={campaignData.startDate}
              onChange={onDateInputChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="dateEnd" value="End Date" />
            </div>
            <input
              className="bg-transparent rounded active:border-slate-300 focus:ring-slate-300"
              id="dateEnd"
              name="campaignData.endDate"
              defaultValue={campaignData.endDate}
              type="date"
              onChange={onDateInputChange}
            />
          </div>
        </FlexRowContainer>
        <div id="select">
          <div className="mb-2 block">
            <Label htmlFor="product" value="Select Product" />
          </div>
          <Select
            id="product"
            name="campaignData.product"
            defaultValue={campaignData.product}
            onChange={onSelectChange}
          >
            <option value={1}>Standard - Digital Markedsføringspakke</option>
            <option value={2}>Oppgardering - Digital Markedsføringspakke</option>
          </Select>
        </div>
        <div id="campaignAreaInput">
          <div className="mb-2 block">
            <Label htmlFor="campaignAreaInput" value="Campaign Area" />
          </div>
          <TextInput
            id="campaignAreaInput"
            name="campaignData.campaignArea"
            defaultValue={campaignData.campaignArea}
            onChange={onInputChange}
          />

        </div>
        <div id="link">
          <div className="mb-2 block">
            <Label htmlFor="linkInput" value="Listing on company home page" />
          </div>
          <TextInput
            id="linkInput"
            name="campaignData.linkHomePage"
            defaultValue={campaignData.linkHomePage}
            onChange={onInputChange} />
        </div>
        <div id="comment">
          <div className="mb-2 block">
            <Label htmlFor="commentInput" value="Comment" />
          </div>
          <Textarea
            id="commentInput"
            name="campaignData.comment"
            defaultValue={campaignData.comment}
            onChange={onTextAreaChange}
          />

        </div>
      </Form>
    </FormWrapper>
  );
};

export default FormAddedValues;

//agent name, link to address on company home page and campaign area