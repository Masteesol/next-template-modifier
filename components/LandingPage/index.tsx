import Link from "next/link";
import PageLayout from "@/components/LandingPage/PageLayout";
import { FlexColCenteredX, FlexColCenteredY, FlexColContainer, FlexColRowContainer, FlexRowCentered, FlexRowCenteredY, FlexRowContainer, H2 } from "@/components/styled-global-components";
//import { useTranslation } from "next-i18next";
//import { translateOrDefault } from "@/utils/i18nUtils";
import Image from "next/image";
import logo from "@/public/logo.png"

const LandingPageContent = () => {
    //const { t } = useTranslation("common");
    return (
        <>
            <PageLayout>
                <FlexRowCentered className="w-full min-h-[35rem] bg-gradient-to-r from-green-400 to-blue-200 text-white p-4">
                    <FlexColRowContainer className="w-full gap-12 max-w-[1240px]">
                        <FlexRowCenteredY className="flex-1 gap-4 items-end md:items-center justify-center md:justify-start">
                            <Image src={logo} alt="logo" height={100} width={100} />
                            <FlexColContainer>
                                <h1 className="text-lg md:text-2xl">Template Modifier App</h1>
                                <h2 className="text-3xl md:text-4xl">Simplify your workflow</h2>
                            </FlexColContainer>
                        </FlexRowCenteredY>
                        <FlexRowContainer className="gap-4 flex-1 text-white justify-center md:justify-end">
                            <FlexRowCentered className="gap-4">
                                <FlexRowCentered>
                                    <Link href={"/sign-in"} className="p-4 text-base rounded bg-green-400 border-[1px] border-transparent hover:opacity-70">
                                        <h4>Sign In</h4>
                                    </Link>
                                </FlexRowCentered>
                                <FlexRowCentered >
                                    <Link href="/sign-up" className="p-4 text-base rounded bg-transparent border-[1px] border-white hover:opacity-70">
                                        <h4>Sign Up</h4>
                                    </Link>
                                </FlexRowCentered>
                            </FlexRowCentered>
                        </FlexRowContainer>
                    </FlexColRowContainer>
                </FlexRowCentered>
                <FlexColCenteredX className="p-4 pt-12 min-h-[50vh]">
                    <FlexColContainer className="w-full max-w-[1240px] gap-12">
                        <FlexColRowContainer className="w-full gap-8">
                            <FlexColCenteredY className="flex-1 gap-4">
                                <H2 className="text-green-500">An Efficient workflow</H2>
                                <p className="text-gray-700">The Template Modifier App from <span className="text-green-500">Templify</span> is created to simplify the job of creating and modifying text templates, and the copying them to the clipboard.</p>
                            </FlexColCenteredY>
                            <div className="shadow rounded flex-1">
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
                        </FlexColRowContainer>
                    </FlexColContainer>
                </FlexColCenteredX>
                <div className="spacer h-[10rem] w-full"></div>
            </PageLayout >
        </>
    );
}

export default LandingPageContent