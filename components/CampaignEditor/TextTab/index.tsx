//import { useTranslation } from "next-i18next";

import { Accordion, Label, TextInput } from "flowbite-react";
import {
    FlexColCenteredX,
    FlexColContainer,
    Form, FormWrapper, onHoverInfoLabel,
} from "@/components/styled-global-components";
//import { translateOrDefault } from "@/utils/i18nUtils";
import { BannerText, Address } from "@/types";
import { handleInputChange } from "@/utils/handleFormElementChange";
import { FaQuestionCircle } from "react-icons/fa";


const FormBannerText = ({ bannerText, setListingData }: { bannerText: BannerText; setListingData: React.Dispatch<React.SetStateAction<Address | null>> }) => {
    //const { t } = useTranslation("common");
    const onInputChange = handleInputChange(setListingData);
    return (
        <FormWrapper>
            <Form>
                <Accordion alwaysOpen={true}>
                    <Accordion.Panel>
                        <Accordion.Title>
                            Adform
                        </Accordion.Title>
                        <Accordion.Content>
                            <FlexColContainer className="gap-4">
                                <div>
                                    <FlexColCenteredX className="items-end">
                                        <onHoverInfoLabel.container>
                                            <FaQuestionCircle />
                                            <onHoverInfoLabel.label className="right-0 top-[-2rem] w-[15rem]">Override default and set price text for all the banners sizes</onHoverInfoLabel.label>
                                        </onHoverInfoLabel.container>
                                    </FlexColCenteredX>
                                    <div className="mb-2 block">
                                        <Label htmlFor="price-priceText" value="Banner Text - Property Sales Price" />
                                    </div>
                                    <TextInput
                                        id="price-priceText"
                                        type="text"
                                        name={`bannerText.adForm.priceText`}
                                        required={true}
                                        placeholder="Banner price text"
                                        defaultValue={bannerText.adForm.priceText}
                                        onChange={onInputChange}
                                    />
                                </div>
                                <div>
                                    <FlexColCenteredX className="items-end">
                                        <onHoverInfoLabel.container>
                                            <FaQuestionCircle />
                                            <onHoverInfoLabel.label className="right-0 top-[-2rem] w-[15rem]">Override default and set size text for all the banners sizes</onHoverInfoLabel.label>
                                        </onHoverInfoLabel.container>
                                    </FlexColCenteredX>
                                    <div className="mb-2 block">
                                        <Label htmlFor="size-text" value="Banner Text - Property Size" />
                                    </div>
                                    <TextInput
                                        id="size-text"
                                        type="text"
                                        name={`bannerText.adForm.sizeText`}
                                        required={true}
                                        placeholder="Banner property price text"
                                        defaultValue={bannerText.adForm.sizeText}
                                        onChange={onInputChange}
                                    />
                                </div>
                                <div>
                                    <FlexColCenteredX className="items-end">
                                        <onHoverInfoLabel.container>
                                            <FaQuestionCircle />
                                            <onHoverInfoLabel.label className="right-0 top-[-2rem] w-[15rem]">Override default text and set the description text for all banners</onHoverInfoLabel.label>
                                        </onHoverInfoLabel.container>
                                    </FlexColCenteredX>
                                    <div className="mb-2 block">
                                        <Label htmlFor="description-text" value="Banner Text - Property Description" />
                                    </div>
                                    <TextInput
                                        id="description-text"
                                        type="text"
                                        placeholder="Property description text"
                                        name={`bannerText.adForm.descriptionText`}
                                        required={true}
                                        defaultValue={bannerText.adForm.descriptionText}
                                        onChange={onInputChange}
                                    />
                                </div>
                            </FlexColContainer>
                        </Accordion.Content>
                    </Accordion.Panel>
                    <Accordion.Panel>
                        <Accordion.Title>
                            Facebook
                        </Accordion.Title>
                        <Accordion.Content>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="main-text" value="Main Text" />
                                </div>
                                <TextInput
                                    id="main-text"
                                    name="bannerText.facebook.mainText"
                                    type="text"
                                    required={true}
                                    defaultValue={bannerText.facebook.mainText || ''}
                                    onChange={onInputChange}
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="fb-heading" value="Heading" />
                                </div>
                                <TextInput
                                    id="fb-heading"
                                    name="bannerText.facebook.heading"
                                    type="text"
                                    required={true}
                                    defaultValue={bannerText.facebook.heading}
                                    onChange={onInputChange}
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="fb-details" value="Details" />
                                </div>
                                <TextInput
                                    id="fb-details"
                                    type="text"
                                    name="bannerText.facebook.details"
                                    required={true}
                                    defaultValue={bannerText.facebook.details}
                                    onChange={onInputChange}
                                />
                            </div>
                        </Accordion.Content>
                    </Accordion.Panel>
                </Accordion>
            </Form>
        </FormWrapper>
    );
};

export default FormBannerText;
