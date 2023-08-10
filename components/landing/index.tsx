import Link from "next/link";
import {
    BrightButton,
    FlexColCentered,
    FlexColCenteredX,
    FlexColCenteredY,
    FlexColContainer,
    FlexColRowContainer,
    FlexRowCentered,
    FlexRowCenteredY,
    FlexRowContainer,
    H2
} from "@/components/shared/styled-global-components";
//import { useTranslation } from "next-i18next";
//import { translateOrDefault } from "@/utils/i18nUtils";
import Image from "next/image";
import logo from "@/public/logo.png"
import textContent from "@/text/textContent.json"
import { BsCheckLg } from "react-icons/bs";
import TemplateCardStandAlone from "../app/TemplateEditor/Tutorial/StandAloneTemplate";
const LandingPageContent = () => {
    const text = textContent.landingPage
    //const { t } = useTranslation("common");

    return (
        <FlexColContainer>
            <FlexColContainer className="min-h-[100vh]">
                <FlexRowCentered className="w-full min-h-[35rem] bg-gradient-to-t from-green-400 to-green-600 text-white p-4">
                    <FlexColRowContainer className="relative w-full gap-12 max-w-[1240px]">
                        {/* Opaque logo */}

                        <FlexRowContainer className="right-24 z-1 absolute w-full h-full items-center justify-center hidden md:flex">
                            <Image
                                className="opacity-10"
                                src={logo}
                                alt="logo"
                                height={400}
                                width={400}
                            />
                        </FlexRowContainer>

                        <FlexRowCenteredY className=" flex-1 gap-4 items-end md:items-center justify-center md:justify-start">
                            {/* Opaque glass card */}

                            <FlexColContainer className="gap-6 border border-white border-solid border-opacity-10 bg-white bg-opacity-10 px-4 py-4 backdrop-blur-sm rounded md:w-fit w-full">
                                <h1 className="text-xl font-medium">
                                    Powerful templating in seconds
                                </h1>
                                <div>
                                    <p>Included in the free plan:</p>
                                    <FlexRowCenteredY className="gap-1">
                                        <BsCheckLg /> 25 templates
                                    </FlexRowCenteredY>
                                    <FlexRowCenteredY className="gap-1">
                                        <BsCheckLg /> 25 categories
                                    </FlexRowCenteredY>
                                    <FlexRowCenteredY className="gap-1">
                                        <BsCheckLg /> 1000 characters per template
                                    </FlexRowCenteredY>
                                </div>
                                <Link href="/sign-up">
                                    <BrightButton>Create a free account</BrightButton>
                                </Link>
                            </FlexColContainer>
                        </FlexRowCenteredY>

                        {/* App demo */}
                        <FlexColContainer className="items-center relative w-full gap-4 flex-1 justify-center md:justify-end text-white">
                            <h2 className="font-bold text-white">Try it for yourself!</h2>
                            <div className="text-black">
                                <TemplateCardStandAlone />
                            </div>
                            <FlexColRowContainer>
                                <p>
                                    Need a tour? Click{" "}
                                    <Link className="underline" href="/landing/tutorial">
                                        here
                                    </Link>{" "}
                                    for the tutorial
                                </p>
                            </FlexColRowContainer>
                        </FlexColContainer>
                    </FlexColRowContainer>
                </FlexRowCentered>
                {/* Main content */}
                <FlexRowCentered>
                    <h2 className="md:mt-7 mt-3 p-4 text-3xl font-bold bg-gradient-to-t from-green-400 to-green-600 bg-clip-text text-transparent">
                        Explore What Makes Templify Great
                    </h2>
                </FlexRowCentered>

                {/* Grid */}
                <FlexColCenteredX className="p-4 mt-12">
                    <FlexColContainer className="w-full max-w-[1240px] gap-14">
                        {text.gridContainers.map((item, index) => {
                            const isOdd = index % 2 !== 0;
                            const reverseFirst = isOdd && "md:order-last";
                            const reverseSecond = isOdd && "md:order-first";

                            return (
                                <div
                                    key={`${index}-grid-item`}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-14"
                                >
                                    <FlexColCenteredY className={"flex-1 gap-4" + reverseFirst}>
                                        <FlexColContainer className="w-fit">
                                            <H2 className={"text-neutral-800 font-bold"}>
                                                {item.title}
                                            </H2>
                                            <div className="h-0.5 w-full bg-green-400 my-4"></div>
                                        </FlexColContainer>
                                        <p className={"text-gray-700"}>{item.content}</p>
                                    </FlexColCenteredY>
                                    <FlexColCentered className={`shadow ${reverseSecond}`}>
                                        <Image
                                            className="w-[600px] h-[300px] object-cover"
                                            src={item.media.link}
                                            alt={`${item.media.alt}`}
                                            width="600"
                                            height="300"
                                        />
                                    </FlexColCentered>
                                </div>
                            );
                        })}
                    </FlexColContainer>
                </FlexColCenteredX>
            </FlexColContainer>

            <FlexColCentered className="spacer min-h-[10rem] w-full bg-green-700 mt-12 text-white">
                <h2>Created by Marius Solheim</h2>
            </FlexColCentered>
        </FlexColContainer>
    );
}

export default LandingPageContent


{/* <FlexColContainer>
        //     <FlexColContainer className="min-h-[100vh]">
        //         <FlexRowCentered className="w-full min-h-[35rem] bg-gradient-to-r from-green-400 to-blue-200 text-white p-4">
        //             <FlexColRowContainer className="w-full gap-12 max-w-[1240px]">
        //                 <FlexRowCenteredY className="flex-1 gap-4 items-end md:items-center justify-center md:justify-start">
        //                     <Image src={logo} alt="logo" height={100} width={100} />
        //                     <FlexColContainer>
        //                         <h1 className="text-lg md:text-2xl">{text.header.title}</h1>
        //                         <h2 className="text-3xl md:text-4xl">{text.header.tagline}</h2>
        //                     </FlexColContainer>
        //                 </FlexRowCenteredY>
        //                 <FlexRowContainer className="gap-4 flex-1 text-white justify-center md:justify-end">
        //                     <FlexRowCentered className="gap-4">
        //                         <FlexRowCentered>
        //                             <Link href={"/sign-in"} className="p-4 text-base rounded bg-green-400 border-[1px] border-transparent hover:opacity-70">
        //                                 <h4>Sign In</h4>
        //                             </Link>
        //                         </FlexRowCentered>
        //                         <FlexRowCentered >
        //                             <Link href="/sign-up" className="p-4 text-base rounded bg-transparent border-[1px] border-white hover:opacity-70">
        //                                 <h4>Sign Up</h4>
        //                             </Link>
        //                         </FlexRowCentered>
        //                     </FlexRowCentered>
        //                 </FlexRowContainer>
        //             </FlexColRowContainer>
        //         </FlexRowCentered>
        //         <FlexColCenteredX className="p-4 mt-12">
        //             <FlexColContainer className="w-full max-w-[1240px] gap-12">
        //                 {text.gridContainers.map((item, index) => {
        //                     const isOdd = index % 2 !== 0
        //                     const reverseFirst = isOdd ? "md:order-last" : "shadow"
        //                     const reverseSecond = isOdd ? "md:order-first" : "shadow"

        //                     return (
        //                         <div key={`${index}-grid-item`} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        //                             <FlexColCenteredY className={"flex-1 gap-4" + reverseFirst}>
        //                                 <H2 className={"text-green-500"}>{item.title}</H2>
        //                                 <p className={"text-gray-700"}>{item.content}</p>
        //                             </FlexColCenteredY>
        //                             <FlexColCentered className={`${reverseSecond}`}>
        //                                 <Image src={item.media.link} alt={`${item.media.alt}`} width={isOdd ? 400 : 600} height={isOdd ? 300 : 600} />
        //                             </FlexColCentered>
        //                         </div>
        //                     )
        //                 })}
        //             </FlexColContainer>
        //         </FlexColCenteredX>
        //     </FlexColContainer>

        //     <FlexColCentered className="spacer min-h-[10rem] w-full bg-green-200 mt-12">
        //         <h2>Created by Marius Solheim</h2>
        //     </FlexColCentered>
        // </FlexColContainer> */}