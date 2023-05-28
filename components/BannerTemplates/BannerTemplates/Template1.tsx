import React, { useState } from 'react';
import DraggableImage from '../BannerComponents/DraggableImage';
//import { InputPropertySize, InputPropertyDescription, InputPropertyPrice } from '../BannerComponents/AdjustableInput';
import { useOverrideOrDefault, TextAreaDescription, TextAreaRowItem } from '../BannerComponents/AdjustableInput';
import { DividerPipe, FlexColCentered, FlexColCenteredX, FlexColCenteredY, FlexColContainer, FlexRowCentered, FlexRowCenteredY, FlexRowContainer } from '@/components/styled-global-components';
import tw from 'tailwind-styled-components';
import { AddressData, BannerText, CampaignData } from '@/types';
import { useSelectedCompany } from '@/context/SelectedCompanyContext';


interface ListingInfo {
    addressData: AddressData;
    bannerText: BannerText,
    campaignData: CampaignData;
}

interface Scale {
    forSale: number,
    description: number,
    rowItems: number,
    logo: number,
    imageSize: number
}

interface TemplatesProps {
    selectedImages: { id: string; link: string }[];
    listingInfo: ListingInfo,
    scale: Scale,
}

const ForSaleTag = tw(FlexColCentered)`
    absolute 
    top-0 
    z-50
`

const WrapperRow = tw(FlexRowContainer)`
    overflow-hidden 
    relative 
    z-40
`

const WrapperCol = tw(FlexColContainer)`
    overflow-hidden 
    relative 
    z-40
`



const getCorrectListingInfo = (listingInfo: ListingInfo) => {
    const { addressData, bannerText, campaignData } = listingInfo;
    //console.log(listingInfo)
    const { priceText, sizeText, descriptionText } = bannerText.adForm
    const { comment } = campaignData
    const { sizePrimary, price, city } = addressData
    const bannerTextOverridesAll = {
        priceText,
        sizeText,
        descriptionText,
    }
    const bannerTextDefaults = {
        size: sizePrimary,
        price,
        city,
        comment
    }
    return {
        bannerTextOverridesAll,
        bannerTextDefaults
    }
}


//980x600
export const Template980x600 = (({ selectedImages, listingInfo, scale }: TemplatesProps) => {
    const { selectedCompany } = useSelectedCompany();
    const { primary, secondary, highlighted }: any = selectedCompany && selectedCompany.theme.colors
    const { logo }: any = selectedCompany && selectedCompany
    const height = 600;
    const width = 980;

    const imageSrc = selectedImages[0].link;
    const [position, setPosition] = useState({ x: 0, y: -100 });
    const bannerText = getCorrectListingInfo(listingInfo);
    const { bannerTextDefaults, bannerTextOverridesAll } = bannerText
    const fontSizeRow = 24 * scale.rowItems
    const fontSizeDescription = 22 * scale.description
    const logoSize = 20 * scale.logo;
    const forSaleText = 24 * scale.forSale
    return (
        <>
            {selectedCompany &&
                <WrapperCol
                    id="img-980x600"
                    className="template-container"
                    style={{
                        width: width, // Limit the size to the original dimensions
                        height: height,
                        maxHeight: height,
                        maxWidth: width,
                    }}>
                    <ForSaleTag
                        className="p-4"
                        style={{
                            backgroundColor: highlighted.background,
                            color: highlighted.text,
                            fontSize: `${forSaleText}px`
                        }}
                    >
                        Til Salgs
                    </ForSaleTag>
                    <div className="relative min-h-[80%] w-full overflow-hidden z-20 bg-slate-200">
                        <DraggableImage
                            imageSrc={imageSrc}
                            position={position}
                            onDrag={(newPosition: any) => setPosition(newPosition)}
                            scale={scale.imageSize}
                        />
                    </div>
                    <FlexColContainer className="absolute bottom-0 w-full h-full max-h-[230px] z-30">
                        <FlexRowCenteredY className={`min-h-[56px] max-h-[70px] h-full w-full p-4 gap-4`} style={{ backgroundColor: primary.background, color: primary.text }}>
                            <FlexColCenteredY>
                                <TextAreaRowItem fontSize={fontSizeRow} textValue={bannerTextDefaults.city} />
                            </FlexColCenteredY>
                            <DividerPipe style={{ borderColor: secondary.background, height: `${fontSizeRow * 1.5}px` }} />
                            <FlexColCenteredY>
                                <TextAreaRowItem fontSize={fontSizeRow} textValue={useOverrideOrDefault.size(bannerTextOverridesAll.sizeText, bannerTextDefaults.size)} />
                            </FlexColCenteredY>
                            <DividerPipe style={{ borderColor: secondary.background, height: `${fontSizeRow * 1.5}px` }} />
                            <FlexColCenteredY>
                                <TextAreaRowItem fontSize={fontSizeRow} textValue={useOverrideOrDefault.text(bannerTextOverridesAll.priceText, bannerTextDefaults.price)} />
                            </FlexColCenteredY>
                        </FlexRowCenteredY>
                        <FlexRowCenteredY className={`min-h-[109px] flex-1 w-full p-4 gap-4 overflow-hidden`} style={{ backgroundColor: secondary.background, color: secondary.text }}>
                            <TextAreaDescription fontSize={fontSizeDescription} textValue={useOverrideOrDefault.description(bannerTextOverridesAll.descriptionText, bannerTextDefaults.comment)} />
                            <img src={logo} alt="test" className={`h-auto ms-auto`} style={{ width: `${logoSize}%` }} />
                        </FlexRowCenteredY>
                    </FlexColContainer>
                </WrapperCol>}
        </>
    )
})


//980x300

export const Template980x300 = (({ selectedImages, listingInfo, scale }: TemplatesProps) => {
    const { selectedCompany } = useSelectedCompany();
    const { logo }: any = selectedCompany && selectedCompany
    const { primary, secondary, highlighted }: any = selectedCompany && selectedCompany.theme.colors
    const imageSrc = selectedImages[0].link;
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const bannerText = getCorrectListingInfo(listingInfo);
    const { bannerTextDefaults, bannerTextOverridesAll } = bannerText
    const height = 300;
    const width = 980;
    const fontSizeRow = 22 * scale.rowItems
    const fontSizeDescription = 24 * scale.description
    const logoSize = 30 * scale.logo;
    const forSaleText = 25 * scale.forSale
    return (
        <WrapperRow
            id="img-980x300"
            className="template-container overflow-hidden"
            style={{
                width: width, // Limit the size to the original dimensions
                height: height,
                maxHeight: height,
                maxWidth: width,
            }}>
            <ForSaleTag
                className="h-[62px] w-[186px] text-2xl"
                style={{
                    backgroundColor: highlighted.background,
                    color: highlighted.text,
                    fontSize: `${forSaleText}px`
                }}
            >
                Til Salgs
            </ForSaleTag>
            <div className="relative h-full w-full overflow-hidden z-20 bg-slate-200">
                <DraggableImage
                    imageSrc={imageSrc}
                    position={position}
                    onDrag={(newPosition: any) => setPosition(newPosition)}
                    scale={scale.imageSize}
                />
            </div>
            <FlexColContainer className="w-[50%] h-full">
                <FlexColContainer className="w-full p-4 gap-4 h-full" style={{ backgroundColor: secondary.background, color: secondary.text }}>
                    <FlexColCenteredY className="h-[50%]">
                        <TextAreaDescription fontSize={fontSizeDescription} textValue={useOverrideOrDefault.description(bannerTextOverridesAll.descriptionText, bannerTextDefaults.comment)} />
                    </FlexColCenteredY>
                    <FlexRowCenteredY className="gap-4">
                        <FlexColCenteredY>
                            <TextAreaRowItem fontSize={fontSizeRow} textValue={bannerTextDefaults.city} />
                        </FlexColCenteredY>
                        <DividerPipe style={{ borderColor: primary.background, height: `${fontSizeRow * 1.5}px` }} />
                        <FlexColCenteredY>
                            <TextAreaRowItem fontSize={fontSizeRow} textValue={useOverrideOrDefault.size(bannerTextOverridesAll.sizeText, bannerTextDefaults.size)} />
                        </FlexColCenteredY>
                        <DividerPipe style={{ borderColor: primary.background, height: `${fontSizeRow * 1.5}px` }} />
                        <FlexColCenteredY>
                            <TextAreaRowItem fontSize={fontSizeRow} textValue={useOverrideOrDefault.text(bannerTextOverridesAll.priceText, bannerTextDefaults.price)} />
                        </FlexColCenteredY>
                    </FlexRowCenteredY>
                    <FlexRowCenteredY className="justify-end">
                        <img src={logo} alt="test" className={`h-auto min-w-[112px]`} style={{ width: `${logoSize}%` }} />
                    </FlexRowCenteredY>
                </FlexColContainer>
            </FlexColContainer>
        </WrapperRow>
    );
});


//580x400

export const Template580x400 = (({ selectedImages, listingInfo, scale }: TemplatesProps) => {
    const { selectedCompany } = useSelectedCompany();
    const { primary, secondary, highlighted }: any = selectedCompany && selectedCompany.theme.colors;
    const { logo }: any = selectedCompany && selectedCompany
    const imageSrc = selectedImages[0].link
    const bannerText = getCorrectListingInfo(listingInfo);
    const { bannerTextDefaults, bannerTextOverridesAll } = bannerText
    const [position, setPosition] = useState({ x: 0, y: -50 });
    const width = 580;
    const height = 400;
    const fontSizeRow = 24 * scale.rowItems
    const fontSizeDescription = 17 * scale.description
    const logoSize = 20 * scale.logo;
    const forSaleText = 20 * scale.forSale
    return (
        <WrapperCol
            id="img-580x400"
            className="template-container"
            style={{
                width: width, // Limit the size to the original dimensions
                height: height,
                maxHeight: height,
                maxWidth: width,
            }}
        >
            <ForSaleTag className={`p-4`}
                style={{
                    backgroundColor: highlighted.background,
                    color: highlighted.text,
                    fontSize: `${forSaleText}px`
                }}>
                Til Salgs
            </ForSaleTag>
            <div className="h-full w-full overflow-hidden z-20 bg-slate-200">
                <DraggableImage
                    imageSrc={imageSrc}
                    position={position}
                    onDrag={(newPosition: any) => setPosition(newPosition)}
                    scale={scale.imageSize}
                />
            </div>
            <FlexColContainer className="absolute bottom-0 max-h-[170px] h-full z-50 w-full">
                <FlexRowCenteredY className={`min-h-[56px] max-h-[56px] h-full w-full p-2 gap-4`} style={{ backgroundColor: primary.background, color: primary.text }}>
                    <TextAreaRowItem fontSize={fontSizeRow} textValue={bannerTextDefaults.city} />
                    <DividerPipe style={{ borderColor: secondary.background, height: `${fontSizeRow * 1.5}px` }} />
                    <TextAreaRowItem fontSize={fontSizeRow} textValue={useOverrideOrDefault.size(bannerTextOverridesAll.sizeText, bannerTextDefaults.size)} />
                    <DividerPipe style={{ borderColor: secondary.background, height: `${fontSizeRow * 1.5}px` }} />
                    <TextAreaRowItem fontSize={fontSizeRow} textValue={useOverrideOrDefault.text(bannerTextOverridesAll.priceText, bannerTextDefaults.price)} />
                </FlexRowCenteredY>
                <FlexRowCenteredY className={`min-h-[70px] h-full w-full p-2`} style={{ backgroundColor: secondary.background, color: secondary.text }}>
                    <TextAreaDescription fontSize={fontSizeDescription} textValue={useOverrideOrDefault.description(bannerTextOverridesAll.descriptionText, bannerTextDefaults.comment)} />
                    <img src={logo} alt="test" className={`h-auto ms-auto min-w-[112px]`} style={{ width: `${logoSize}%` }} />
                </FlexRowCenteredY>
            </FlexColContainer>
        </WrapperCol>
    )
})


//300x600

export const Template300x600 = (({ selectedImages, listingInfo, scale }: TemplatesProps) => {
    const { selectedCompany } = useSelectedCompany();
    const { primary, secondary, highlighted }: any = selectedCompany && selectedCompany.theme.colors
    const { logo }: any = selectedCompany && selectedCompany
    const imageSrc = selectedImages[0].link
    const bannerText = getCorrectListingInfo(listingInfo);
    const { bannerTextDefaults, bannerTextOverridesAll } = bannerText
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const width = 300;
    const height = 600;

    const fontSizeRow = 24 * scale.rowItems
    const fontSizeDescription = 20 * scale.description
    const logoSize = 45 * scale.logo;
    const forSaleText = 20 * scale.forSale
    return (
        <WrapperCol
            id="img-300x600"
            className="template-container"
            style={{
                width: width, // Limit the size to the original dimensions
                height: height,
                maxHeight: height,
                maxWidth: width,
            }}
        >
            <ForSaleTag
                className={`h-[40px] w-[106px] text-base`}
                style={{
                    backgroundColor: highlighted.background,
                    color: highlighted.text,
                    fontSize: `${forSaleText}px`
                }}>
                Til Salgs
            </ForSaleTag>
            <div className="relative h-[40%] w-full overflow-hidden z-20 bg-slate-200">
                <DraggableImage
                    imageSrc={imageSrc}
                    position={position}
                    onDrag={(newPosition: any) => setPosition(newPosition)}
                    scale={scale.imageSize}
                />
            </div>
            <FlexColContainer className="flex-1 h-full w-full">
                <FlexColCenteredX className={`w-full text-xl p-4`} style={{ backgroundColor: primary.background, color: primary.text }}>
                    <FlexRowCentered className="gap-4 w-full">
                        <TextAreaRowItem fontSize={fontSizeRow} textValue={bannerTextDefaults.city} />
                        <DividerPipe style={{ borderColor: secondary.background, height: `${fontSizeRow * 1.5}px` }} />                        <FlexColContainer>
                            <TextAreaRowItem fontSize={fontSizeRow} textValue={useOverrideOrDefault.size(bannerTextOverridesAll.sizeText, bannerTextDefaults.size)} />
                        </FlexColContainer>
                    </FlexRowCentered>
                    <TextAreaRowItem fontSize={fontSizeRow} textValue={useOverrideOrDefault.text(bannerTextOverridesAll.priceText, bannerTextDefaults.price)} />
                </FlexColCenteredX>
                <FlexColCenteredX className={`max-h-[250px] h-full w-full p-4 gap-4`} style={{ backgroundColor: secondary.background, color: secondary.text }}>
                    <TextAreaDescription className="text-center" fontSize={fontSizeDescription} textValue={useOverrideOrDefault.description(bannerTextOverridesAll.descriptionText, bannerTextDefaults.comment)} />
                    <img src={logo} alt="test" className={`h-auto min-w-[112px]`} style={{ width: `${logoSize}%` }} />
                </FlexColCenteredX>
            </FlexColContainer>
        </WrapperCol >
    )
})

//300x250

export const Template300x250 = (({ selectedImages, listingInfo, scale }: TemplatesProps) => {
    const { selectedCompany } = useSelectedCompany();
    const bannerText = getCorrectListingInfo(listingInfo);
    const { bannerTextDefaults, bannerTextOverridesAll } = bannerText
    const { logo }: any = selectedCompany && selectedCompany
    const { primary, secondary, highlighted }: any = selectedCompany && selectedCompany.theme.colors
    const imageSrc = selectedImages[0].link
    const [position, setPosition] = useState({ x: 0, y: -30 });
    const width = 300;
    const height = 250;

    const fontSizeRow = 16 * scale.rowItems
    const fontSizeDescription = 14 * scale.description
    const logoSize = 25 * scale.logo;
    const forSaleText = 15 * scale.forSale
    return (
        <WrapperCol
            id="img-300x250"
            className="template-container"
            style={{
                width: width, // Limit the size to the original dimensions
                height: height,
                maxHeight: height,
                maxWidth: width
            }}
        >
            <ForSaleTag
                className={`p-2`}
                style={{
                    backgroundColor: highlighted.background,
                    color: highlighted.text,
                    fontSize: `${forSaleText}px`
                }}>
                Til Salgs
            </ForSaleTag>
            <div className="relative h-full w-full overflow-hidden z-20 bg-slate-200">
                <DraggableImage
                    imageSrc={imageSrc}
                    position={position}
                    onDrag={(newPosition: any) => setPosition(newPosition)}
                    scale={scale.imageSize}
                />
            </div>
            <FlexColContainer>
                <FlexRowCenteredY className={`w-full text-sm p-2 gap-2`} style={{ backgroundColor: primary.background, color: primary.text }}>
                    <FlexRowCenteredY className="gap-2 w-full">
                        <FlexColCenteredY>
                            <TextAreaRowItem fontSize={fontSizeRow} textValue={bannerTextDefaults.city} />
                        </FlexColCenteredY>
                        <DividerPipe style={{ borderColor: secondary.background, height: `${fontSizeRow * 1.5}px` }} />                        <FlexColCenteredY className="px-2">
                            <TextAreaRowItem fontSize={fontSizeRow} textValue={useOverrideOrDefault.size(bannerTextOverridesAll.sizeText, bannerTextDefaults.size)} />
                        </FlexColCenteredY>
                        <DividerPipe style={{ borderColor: secondary.background, height: `${fontSizeRow * 1.5}px` }} />                        <FlexColCenteredY className="px-2">
                            <TextAreaRowItem fontSize={fontSizeRow} textValue={useOverrideOrDefault.text(bannerTextOverridesAll.priceText, bannerTextDefaults.price)} />
                        </FlexColCenteredY>
                    </FlexRowCenteredY>
                </FlexRowCenteredY>
                <FlexRowCenteredY className={`w-full max-h-[100px] min-h-[70px]  p-2 gap-2 text-sm`} style={{ backgroundColor: secondary.background, color: secondary.text }}>
                    <TextAreaDescription fontSize={fontSizeDescription} textValue={useOverrideOrDefault.description(bannerTextOverridesAll.descriptionText, bannerTextDefaults.comment)} />
                    <img src={logo} alt="test" className={`h-auto min-w-[70px]`} style={{ width: `${logoSize}%` }} />
                </FlexRowCenteredY>
            </FlexColContainer>
        </WrapperCol>
    )
})