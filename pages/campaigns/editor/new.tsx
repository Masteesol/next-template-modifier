import Head from "next/head";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import PageLayout from "@/components/PageLayout";
import {
    FlexColCenteredX,
    Form,
    FormWrapper,
    H1,
    SubmitButton,
} from "@/components/styled-global-components";
import { Label, TextInput } from "flowbite-react";
import { translateOrDefault } from "@/utils/i18nUtils";

export default function Page() {
    const { t } = useTranslation("common");

    return (
        <>
            <Head>
                <title>{translateOrDefault(t, "pages.newCampaign.heading", "New Campaign")}</title>
                <meta name="robots" content="noindex" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageLayout>
                <FlexColCenteredX className="min-h-full w-full gap-8">
                    <H1>{translateOrDefault(t, "pages.newCampaign.heading", "New Campaign")}</H1>
                    <FormWrapper>
                        <Form >
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="title"
                                        value={translateOrDefault(t, "pages.newCampaign.form.labels.address", "Property Address")}
                                    />
                                </div>
                                <TextInput
                                    id="title"
                                    type="text"
                                    placeholder="Address"
                                    required={true}
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="price"
                                        value={translateOrDefault(t, "pages.newCampaign.form.labels.price", "Price")}
                                    />
                                </div>
                                <TextInput
                                    id="price"
                                    type="text"
                                    placeholder="30000000"
                                    required={true}
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="bedrooms"
                                        value={translateOrDefault(t, "pages.newCampaign.form.labels.rooms", "Bedrooms")}
                                    />
                                </div>
                                <TextInput
                                    id="bedrooms"
                                    type="number"
                                    placeholder="2"
                                    required={true}
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="size"
                                        value={translateOrDefault(t, "pages.newCampaign.form.labels.sizePrimary", "Size (sqm) - Primary Area")}
                                    />
                                </div>
                                <TextInput
                                    id="size"
                                    type="number"
                                    placeholder="80"
                                    required={true}
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="size"
                                        value={translateOrDefault(t, "pages.newCampaign.form.labels.sizeUsable", "Size (sqm) - Usable Area")}
                                    />
                                </div>
                                <TextInput
                                    id="size"
                                    type="number"
                                    placeholder="100"
                                    required={true}
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="size"
                                        value={translateOrDefault(t, "pages.newCampaign.form.labels.area", "Location")}
                                    />
                                </div>
                                <TextInput
                                    id="area"
                                    type="text"
                                    placeholder="Oslo"
                                    required={true}
                                />
                            </div>
                            <SubmitButton
                                type="submit"
                            >
                                {translateOrDefault(t, "buttons.submit", "Send")}
                            </SubmitButton>
                            <Label
                                className="text-center"
                                value={translateOrDefault(t, "pages.newCampaign.form.labels.submit", "Save and proceed to the client page")}
                            />
                        </Form>
                    </FormWrapper>
                </FlexColCenteredX>
            </PageLayout>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale as string, ["common"])),
        },
    };
};