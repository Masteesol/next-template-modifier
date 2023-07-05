import Link from "next/link";
import {
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
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import textContent from "@/text/textContent.json"
const LandingPageContent = () => {
    const text = textContent.landingPage
    //const { t } = useTranslation("common");
    const { isAuthenticated } = useContext(AuthContext)

    return (
        <FlexColContainer>
            <FlexColContainer className="min-h-[100vh]">
                <FlexRowCentered className="w-full min-h-[35rem] bg-gradient-to-r from-green-400 to-blue-200 text-white p-4">
                    <FlexColRowContainer className="w-full gap-12 max-w-[1240px]">
                        <FlexRowCenteredY className="flex-1 gap-4 items-end md:items-center justify-center md:justify-start">
                            <Image src={logo} alt="logo" height={100} width={100} />
                            <FlexColContainer>
                                <h1 className="text-lg md:text-2xl">{text.header.title}</h1>
                                <h2 className="text-3xl md:text-4xl">{text.header.tagline}</h2>
                            </FlexColContainer>
                        </FlexRowCenteredY>
                        <FlexRowContainer className="gap-4 flex-1 text-white justify-center md:justify-end">
                            {!isAuthenticated ?
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
                                : <FlexRowCentered className="gap-4">
                                    <Link href={"/app"} className="p-4 text-base rounded bg-green-400 border-[1px] border-transparent hover:opacity-70">
                                        <h4>To the app</h4>
                                    </Link>
                                </FlexRowCentered>
                            }
                        </FlexRowContainer>
                    </FlexColRowContainer>
                </FlexRowCentered>
                <FlexColCenteredX className="p-4 mt-12">
                    <FlexColContainer className="w-full max-w-[1240px] gap-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FlexColCenteredY className="flex-1 gap-4">
                                <H2 className="text-green-500">{text.gridContainers[0].title}</H2>
                                <p className="text-gray-700">{text.gridContainers[0].content}</p>
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
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FlexColCentered>
                                <Image src={text.gridContainers[2].media.link} alt={`${text.gridContainers[2].media.alt}`} width={400} height={400} />
                            </FlexColCentered>
                            <FlexColCenteredY className="gap-4">
                                <H2 className="text-green-500">{text.gridContainers[2].title}</H2>
                                <p>{text.gridContainers[2].content}</p>
                            </FlexColCenteredY>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            <FlexColCenteredY className="gap-4">
                                <H2 className="text-green-500">{text.gridContainers[1].title}</H2>
                                <p>{text.gridContainers[1].content}</p>
                            </FlexColCenteredY>
                            <FlexColCentered className="shadow">
                                <Image src={text.gridContainers[1].media.link} alt={`${text.gridContainers[1].media.alt}`} width={600} height={600} />
                            </FlexColCentered>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FlexColCentered>
                                <Image src={text.gridContainers[3].media.link} alt={`${text.gridContainers[3].media.alt}`} width={400} height={400} />
                            </FlexColCentered>
                            <FlexColCenteredY className="gap-4">
                                <H2 className="text-green-500">{text.gridContainers[3].title}</H2>
                                <p>{text.gridContainers[3].content}</p>
                            </FlexColCenteredY>
                        </div>
                    </FlexColContainer>
                </FlexColCenteredX>
            </FlexColContainer>

            <FlexColCentered className="spacer min-h-[10rem] w-full bg-green-200 mt-12">
                <h2>Created by Marius Solheim</h2>
            </FlexColCentered>
        </FlexColContainer>
    );
}

export default LandingPageContent