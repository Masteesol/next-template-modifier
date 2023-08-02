import React from 'react'
import {
    DividerHorizontal,
    FlexColCentered,
    FlexColContainer,
    FlexRowCenteredY,
    GridSm1Md2,
    H1,
    H2,
    H3
} from "@/components/shared/styled-global-components";
import Image from "next/image"
import appText from "@/text/textContent.json"
const TutorialPageContent = () => {
    const tutorialText = appText.tutorial
    const { collections, singles, summary } = tutorialText
    return (
        <FlexColCentered className="w-full">
            <FlexColContainer className="max-w-[1000px] w-full gap-8 text-sm md:text-base p-2 md:p-4">
                <H1>Using the app</H1>
                <FlexColContainer className="gap-2">
                    <H2>{summary.title}</H2>
                    <p>{summary.content}</p>
                </FlexColContainer>
                <FlexColContainer className="gap-8 bg-white p-2 md:p-4 rounded">
                    <FlexColContainer className="gap-2">
                        <FlexRowCenteredY className="gap-4">
                            <H2>{singles.about.title}</H2>
                            <p className="py-1 px-2 rounded text-xs md:text-sm bg-green-200 text-green-800">Single</p>
                        </FlexRowCenteredY>
                        <DividerHorizontal className="border-gray-100" />
                        <GridSm1Md2 className="gap-2 md:gap-4">
                            <FlexColContainer className="gap-2 justify-center">
                                <p>{singles.about.content}</p>
                            </FlexColContainer>
                            <FlexColCentered className="max-h-[20rem] overflow-hidden rounded shadow w-full">
                                <Image className="w-full" src={singles.about.media.link} alt={singles.about.media.alt} height={400} width={400} />
                            </FlexColCentered>
                        </GridSm1Md2>

                    </FlexColContainer>
                    <TutorialSingleCard
                        title={singles.editText.title}
                        content={singles.editText.content}
                        alt={singles.editText.media.alt}
                        link={singles.editText.media.link}
                        inverted={true}
                    />
                    <TutorialSingleCard
                        title={singles.editLimiters.title}
                        content={singles.editLimiters.content}
                        alt={singles.editLimiters.media.alt}
                        link={singles.editLimiters.media.link}
                        inverted={false}
                    />
                    <GridSm1Md2 className="gap-4">
                        <TutorialVerticalCard
                            title={singles.editLimitersActive.media[0].title}
                            content={singles.editLimitersActive.content}
                            alt={singles.editLimitersActive.media[0].alt}
                            link={singles.editLimitersActive.media[0].link}
                            is_collection={false}
                            styles="justify-end"
                        />
                        <TutorialVerticalCard
                            title={singles.editLimitersActive.media[1].title}
                            content={singles.editText.content}
                            alt={singles.editLimitersActive.media[1].alt}
                            link={singles.editLimitersActive.media[1].link}
                            is_collection={false}
                            styles="justify-end"
                        />
                    </GridSm1Md2>

                </FlexColContainer>
                <FlexColContainer className="gap-8 bg-white p-2 md:p-4 rounded">
                    <FlexColContainer className="gap-4">
                        <FlexRowCenteredY className="gap-4">
                            <H2>{collections.about.title}</H2>
                            <p className="py-1 px-2 rounded text-xs md:text-sm bg-violet-200 text-violet-800">Collection</p>
                        </FlexRowCenteredY>
                        <DividerHorizontal className="border-gray-100" />
                        <GridSm1Md2>
                            <FlexColContainer className="gap-2 justify-center">
                                <p>{collections.about.content}</p>
                                <i className="text-gray-500">{collections.about.comment}</i>
                            </FlexColContainer>
                            <FlexColCentered className="max-h-[20rem] overflow-hidden rounded shadow w-full">
                                <Image className="w-full" src={collections.about.media.link} alt={collections.about.media.alt} height={400} width={400} />
                            </FlexColCentered>
                        </GridSm1Md2>


                    </FlexColContainer>
                    <GridSm1Md2 className="gap-4">
                        <TutorialVerticalCard
                            title={collections.editText.title}
                            content={collections.editText.content}
                            alt={collections.editText.media.alt}
                            link={collections.editText.media.link}
                            is_collection={true}
                            styles="justify-end"
                        />
                        <TutorialVerticalCard
                            title={collections.editOrder.title}
                            content={collections.editOrder.content}
                            alt={collections.editOrder.media.alt}
                            link={collections.editOrder.media.link}
                            is_collection={true}
                            styles=""
                        />
                    </GridSm1Md2>
                </FlexColContainer>
            </FlexColContainer>
            <div className="h-[20rem]"></div>
        </FlexColCentered >
    )
}

export default TutorialPageContent

const TutorialSingleCard = ({ title, content, alt, link, inverted }:
    { title: string, content: string, alt: string, link: string, inverted: boolean }) => {
    const order = inverted ? "md:order-first" : ""
    return (
        <FlexColContainer className="gap-4 bg-green-50 text-green-800 p-2 rounded">
            <H3 className="font-bold">{title}</H3>
            <GridSm1Md2 className="gap-4">
                <FlexColContainer className="gap-4 justify-center">
                    <p className="text-sm md:text-base">{content}</p>
                </FlexColContainer>
                <FlexColContainer className={`${order} gap-2 items-center md:items-start w-full`}>
                    <FlexColCentered className="max-h-[20rem] overflow-hidden rounded shadow w-full">
                        <Image className="w-full" src={link} alt={alt} height={400} width={400} />
                    </FlexColCentered>
                </FlexColContainer>
            </GridSm1Md2>
        </FlexColContainer>
    )
}

const TutorialVerticalCard = ({ title, content, alt, link, is_collection, styles }:
    { title: string, content: string, alt: string, link: string, is_collection: boolean; styles: string }) => {
    const theme = !is_collection ? "bg-green-50 text-green-800" : "bg-purple-50 text-purple-800"
    return (
        <FlexColContainer className={`${theme} gap-4 p-2 rounded`}>
            <H3 className="font-bold">{title}</H3>
            <p className="text-sm">{content}</p>
            <FlexColCentered className={`max-h-[20rem] overflow-hidden rounded shadow w-full ${styles}`}>
                <Image className="w-full" src={link} alt={alt} height={400} width={400} />
            </FlexColCentered>
        </FlexColContainer>
    )
}