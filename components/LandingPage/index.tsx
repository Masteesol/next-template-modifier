import Link from "next/link";
import PageLayout from "@/components/LandingPage/PageLayout";
import { CardBaseLightHover, FlexColCentered, FlexColCenteredX, FlexColContainer, FlexRowCentered, FlexRowCenteredY } from "@/components/styled-global-components";
//import { useTranslation } from "next-i18next";
//import { translateOrDefault } from "@/utils/i18nUtils";
import Image from "next/image";
import logo from "@/public/logo.png"
import { FlexRowCenteredX, H2 } from "../styled-global-components";

const LandingPageContent = () => {
    //const { t } = useTranslation("common");
    return (
        <>
            <PageLayout>
                <FlexColCenteredX className="p-4 h-full">
                    <FlexColContainer className="gap-8  w-full max-w-[1240px]">
                        <FlexRowCenteredX className="w-full">
                            <FlexRowCenteredY className="w-full gap-4 items-center">
                                <Image src={logo} alt="logo" height={100} width={100} />
                                <FlexColContainer>
                                    <h1>Template Modifier App</h1>
                                    <H2>Simplify your workflow</H2>
                                </FlexColContainer>
                            </FlexRowCenteredY>
                        </FlexRowCenteredX>
                        <FlexColCentered className="gap-2">
                            <FlexRowCenteredY className="gap-4">
                                <Link href={"/sign-in"}>
                                    <CardBaseLightHover className="p-4 text-xl rounded bg-green-300">
                                        <h4>Sign In</h4>
                                    </CardBaseLightHover>
                                </Link>
                                <Link href="/sign-up">
                                    <FlexRowCentered className="p-4 text-green-500 text-xl rounded bg-transparent border-[1px] border-green-400 hover:opacity-70">
                                        <h4>Sign Up</h4>
                                    </FlexRowCentered>
                                </Link>
                            </FlexRowCenteredY>
                        </FlexColCentered>
                        <FlexColContainer className="w-full gap-4">
                            <div className="shadow rounded">
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
                            <h3 className="text-right">Using the template modifier app</h3>
                        </FlexColContainer>
                    </FlexColContainer>
                </FlexColCenteredX>
            </PageLayout >
        </>
    );
}

export default LandingPageContent