import Head from "next/head";
import { NextPage } from 'next';
import Link from "next/link";
import React, { useState } from "react";
import PageLayout from "../components/PageLayout";
import { CardBaseLightHover, FlexColCentered, FlexColCenteredX, FlexColContainer, FlexRowCentered, FlexRowCenteredY, H1, H2 } from "../components/styled-global-components";
//import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from 'next';
//import { translateOrDefault } from "@/utils/i18nUtils";
import TemplateCardStandAlone from "@/components/TemplateEditor/Homepage/TemplateCardStandAlone";
import cookie from 'cookie'
import Image from "next/image";
import logo from "@/public/logo.png"

const steps = [
  { title: "Intro", excerpt: "Getting Started", details: "This is a template modifier, created to simplify the job of creating and modifying text templates, and the copying them to the clipboard.", editorContentArray: ["Dear New User"] },
  { title: "Title", excerpt: "Add your title", details: "Click on the on the title field and replace the text", editorContent: "Delayed Order" },
  { title: "Text", excerpt: "Add your template text", details: "We open the edit tool and write or paste in our template text. We use the # symbol to indicate where we want the placeholders to be.", editorContent: "Dear #,\n\nWe would like to inform you that your order # has been delayed.\n\nThe new expected delivery date is # between # and #.\n\nKind regards,\nCustomer Support" },
  { title: "Input", excerpt: "Fill in the input fields", details: "Now we have created out first template. In the input fields we can add our text and the text will show up on the correct spot in the text.", editorContentArray: ["Mr. Doe", "1234567", "12/6/23", "16:00", "20:00"] },
  { title: "Copy", excerpt: "Copy text to clipboard", details: "Click on the copy icon down in the right corner to copy the modified text to you clipboard.", editorContentArray: ["Mr. Doe", "1234567", "12/6/23", "16:00", "20:00"] },
];

type PageProps = {
  authenticated: boolean,
}

const Page: NextPage<PageProps> = ({ authenticated }) => {
  //const { t } = useTranslation("common");
  const [activeStep, setActiveStep] = useState(0);
  return (
    <>
      <Head>
        <title>Templify Home Page</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout authenticated={authenticated}>
        {!authenticated &&
          <FlexRowCenteredY className="w-full py-8 px-8 gap-4 items-center">
            <Image src={logo} alt="logo" height={100} width={100} />
            <FlexColContainer className="w-full max-w-[1980px]">
              <h1>Template Modifier App</h1>
              <H2>Simplify your workflow</H2>
            </FlexColContainer>

          </FlexRowCenteredY>
        }
        <FlexColCenteredX className="w-full min-h-full p-4 my-8 gap-8">
          {!authenticated
            ? <FlexColCentered className="gap-2">
              <FlexRowCenteredY className="gap-4">
                <Link href={"/sign-in"}>
                  <CardBaseLightHover className="p-4 text-xl rounded bg-green-300">
                    <h4>Sign In</h4>
                  </CardBaseLightHover>
                </Link>
                <Link href={authenticated ? "/templates" : "/sign-up"}>
                  <FlexRowCentered className="p-4 text-green-500 text-xl rounded bg-transparent border-[1px] border-green-400 hover:opacity-70">
                    <h4>Sign Up</h4>
                  </FlexRowCentered>
                </Link>
              </FlexRowCenteredY>
            </FlexColCentered>
            : <H1 className="mb-8">How to use the app</H1>
          }


          {authenticated ?
            <FlexColCentered className="gap-8 max-w-[800px] h-full">
              <StepsComponent activeStep={activeStep} setActiveStep={setActiveStep} />
              <FlexColCenteredX className="gap-8 h-full mt-10">
                <h2 className="text-4xl">{steps[activeStep].title}</h2>
                <p className="text-center">{steps[activeStep].details}</p>
                <TemplateCardStandAlone steps={steps} activeStep={activeStep} />
              </FlexColCenteredX>
            </FlexColCentered>
            :
            <div className="max-w-[1440px] shadow rounded w-full">
              <video
                controls
                preload="none"
                width="100%"
                poster="https://res.cloudinary.com/dedym3sfv/image/upload/v1687692796/poster-templify-video_p3rgrm.jpg"
                src="https://res.cloudinary.com/dedym3sfv/video/upload/v1687693768/using_template_modifier_app_jnznvr.mp4"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          }

        </FlexColCenteredX>
      </PageLayout >
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = context.req ? cookie.parse(context.req.headers.cookie || '') : undefined
  const token = cookies && cookies.supabaseToken
  const userID = cookies && cookies.userID
  return {
    props: {
      authenticated: Boolean(token),
      userID: userID || null,
      ...(await serverSideTranslations(context.locale as string, ["common"]))
    }
  }
}
export default Page;

interface StepperTypes {
  title: string;
  active: boolean
  index: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  excerpt: string
}

const Step = ({ title, active, index, setActiveStep, excerpt }: StepperTypes) => {
  const color = active ? "green" : "gray";
  return (
    <>
      <li className={`flex items-center text-${color}-600 dark:text-${color}-500 gap-4 cursor-pointer relative group`} onClick={() => setActiveStep(index)}>
        <span className={`flex items-center justify-center w-8 h-8 font-bold border border-${color}-600 rounded-full shrink-0 dark:border-${color}-500`}>
          {`${index + 1}`}
        </span>
        <span>
          <h3 className="font-medium leading-tight">{title}</h3>
        </span>

        {/* Tooltip */}
        <div className="absolute z-10 w-32 px-2 py-1 text-sm text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-100  rounded-md opacity-0 group-hover:opacity-100 top-10 mb-2">
          {excerpt}
        </div>
      </li>
    </>
  );
}


interface StepComponentTypes {
  activeStep: number
  setActiveStep: React.Dispatch<React.SetStateAction<number>>
}

const StepsComponent = ({ activeStep, setActiveStep }: StepComponentTypes) => {
  return (
    <ol className="items-center justify-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0">
      {steps.map((step, index) => (
        <Step key={index} title={step.title} index={index} active={index === activeStep} setActiveStep={setActiveStep} excerpt={step.excerpt} />
      ))}
    </ol>
  );
}

