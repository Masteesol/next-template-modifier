import Head from "next/head";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { Label, Select, TextInput } from "flowbite-react";
import PageLayout from "@/components/PageLayout";
import {
  FlexColCenteredX,
  FormWrapper,
  H1,
  SubmitButton,
} from "@/components/styled-global-components";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { translateOrDefault } from "@/utils/i18nUtils";

export default function Page() {
  const { t } = useTranslation("common");
  return (
    <>
      <Head>
        <title>{translateOrDefault(t, "pages.registerNew.heading", "Register New")}</title>
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <FlexColCenteredX className="gap-8">
          <H1>{translateOrDefault(t, "pages.registerNew.heading", "Register New")}</H1>
          <FormWrapper className="gap-4 max-w-[700px] w-full">

            <form className="flex flex-col gap-4">
              <div id="select">
                <div className="mb-2 block">
                  <Label
                    htmlFor="host"
                    value={translateOrDefault(t, "pages.registerNew.form.labels.select-host", "Select Host")}
                  />
                </div>
                <Select id="host" required={true}>
                  <option>Next Vitec</option>
                </Select>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="companyName"
                    value={translateOrDefault(t, "pages.registerNew.form.labels.company-name", "Company Name")}
                  />
                </div>
                <TextInput
                  id="companyName"
                  type="text"
                  placeholder="Example"
                  required={true}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="installationid"
                    value={translateOrDefault(t, "pages.registerNew.form.labels.installationID", "Installation ID")}
                  />
                </div>
                <TextInput
                  id="installationid"
                  type="text"
                  placeholder="XXXXX"
                  required={true}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="fbid"
                    value={translateOrDefault(t, "pages.registerNew.form.labels.facebookID", "Facebook ID")}
                  />
                </div>
                <TextInput
                  id="fbid"
                  type="text"
                  placeholder="act_xxxxxxxxxxxxxxxx"
                  required={false}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="instaid"
                    value={translateOrDefault(t, "pages.registerNew.form.labels.instagramID", "Instagram ID")}
                  />
                </div>
                <TextInput
                  id="instaid"
                  type="text"
                  placeholder="xxxxxxxxxxxxxxxx"
                  required={false}
                />
              </div>
              <SubmitButton
                type="submit"
              >
                {translateOrDefault(t, "buttons.submit", "Save")}
              </SubmitButton>
              <Label
                className="text-center"
                value={t("pages.registerNew.form.labels.submit") || ""}
              />
            </form>
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