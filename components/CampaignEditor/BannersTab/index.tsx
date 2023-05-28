// PreviewTab.tsx
import React, { useState } from 'react';
import templatesMap from '@/components/BannerTemplates/templates';
import { FlexColCenteredY, FlexColContainer, FlexRowCenteredY, FlexRowContainer, H3, IconBackground } from '@/components/styled-global-components';
import PreviewCarousel from "@/components/CampaignEditor/BannersTab/BannerTabComponents/PreviewCarousel";
import GenerateJPGs from './BannerTabComponents/generateJPG';
import { AddressData, BannerText, CampaignData } from '@/types';
import { useSelectedCompany } from '@/context/SelectedCompanyContext';
import { FaSlidersH } from 'react-icons/fa';
import { ImageScaleSlider } from './BannerTabComponents/Sliders';
import SlidersToolBar from './BannerTabComponents/SlidersToolBar';

interface ListingInfo {
  addressData: AddressData;
  bannerText: BannerText;
  campaignData: CampaignData;
}


interface PreviewTabProps {
  selectedImages: { id: string; link: string }[];
  listingInfo: ListingInfo;
  updateGeneratedJPGs: any;
  setActiveTabIndex: (index: number) => void;
}

const PreviewTab: React.FC<PreviewTabProps> = ({ selectedImages, listingInfo, updateGeneratedJPGs, setActiveTabIndex }) => {
  //console.log(listingInfo)
  const [isVisible, setIsVisible] = useState(false);
  const { selectedCompany } = useSelectedCompany();
  const bannerTemplateId: any = selectedCompany && selectedCompany.theme.bannerTemplate
  const [activeIndex, setActiveIndex] = useState(0);

  const [scale980x600, setScale980x600] = useState({ forSale: 1, description: 1, rowItems: 1, logo: 1, imageSize: 1 });
  const [scale980x300, setScale980x300] = useState({ forSale: 1, description: 1, rowItems: 1, logo: 1, imageSize: 1 });
  const [scale580x400, setScale580x400] = useState({ forSale: 1, description: 1, rowItems: 1, logo: 1, imageSize: 1 });
  const [scale300x600, setScale300x600] = useState({ forSale: 1, description: 1, rowItems: 1, logo: 1, imageSize: 1.5 });
  const [scale300x250, setScale300x250] = useState({ forSale: 1, description: 1, rowItems: 1, logo: 1, imageSize: 1 });

  const [slidersPosition, setSlidersPosition] = useState({ x: 0, y: 0 })

  const customerData = {
    templateChoice: bannerTemplateId
  }

  const { templateChoice } = customerData;
  const chosenTemplates = templatesMap[templateChoice.toString()];
  const Template980x600 = chosenTemplates.Template980x600;
  const Template980x300 = chosenTemplates.Template980x300;
  const Template580x400 = chosenTemplates.Template580x400;
  const Template300x600 = chosenTemplates.Template300x600;
  const Template300x250 = chosenTemplates.Template300x250;

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    const name = e.target.name
    const id = e.target.id
    if (id.includes("980x600")) {
      setValueFromName(name, value, setScale980x600, scale980x600)
    }
    if (id.includes("980x300")) {
      setValueFromName(name, value, setScale980x300, scale980x300)
    }
    if (id.includes("580x400")) {
      setValueFromName(name, value, setScale580x400, scale580x400)
    }
    if (id.includes("300x600")) {
      setValueFromName(name, value, setScale300x600, scale300x600)
    }
    if (id.includes("300x250")) {
      setValueFromName(name, value, setScale300x250, scale300x250)
    }

  };

  const setValueFromName = (name: any, value: number, setScale: any, scale: any) => {
    switch (name) {
      case ("img"):
        const templateClone = { ...scale };
        templateClone["imageSize"] = value
        setScale(templateClone)
        break;
      case ("description"):
        const templateClone1 = { ...scale };
        templateClone1["description"] = value
        setScale(templateClone1)
        break;
      case ("row-items"):
        const templateClone2 = { ...scale };
        templateClone2["rowItems"] = value
        setScale(templateClone2)
        break;
      case ("logo"):
        const templateClone3 = { ...scale };
        templateClone3["logo"] = value
        setScale(templateClone3)
        break;
      case ("for-sale"):
        const templateClone4 = { ...scale };
        templateClone4["forSale"] = value
        setScale(templateClone4)
        break;
    }
  }


  return (
    selectedImages[0] ?
      <div className="relative">
        <FlexRowCenteredY className="gap-4 absolute right-0 top-[-3rem] cursor-pointer">
          <IconBackground onClick={toggleVisibility} className={`border-[2px] ${isVisible ? "border-slate-500" : "border-transparent"}`}>
            <FaSlidersH />
          </IconBackground>

          <GenerateJPGs
            updateGeneratedJPGs={updateGeneratedJPGs}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            setActiveTabIndex={setActiveTabIndex}
          />
        </FlexRowCenteredY>
        <PreviewCarousel
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        >
          <FlexColContainer className="gap-4 items-center">
            <FlexRowContainer className="gap-8 w-full justify-between">
              <FlexRowCenteredY className="justify-between w-full">
                <H3>980x600</H3>
                <ImageScaleSlider sliderID={`slider-980x600-img`} handleScaleChange={handleScaleChange} scale={scale980x600.imageSize} />
              </FlexRowCenteredY>
              {isVisible &&
                <SlidersToolBar
                  slidersPosition={slidersPosition}
                  setSlidersPosition={setSlidersPosition}
                  scale={scale980x600}
                  handleScaleChange={handleScaleChange}
                  sliderID="slider-980x600"
                />
              }
            </FlexRowContainer>
            <FlexColCenteredY className="min-h-[60vh]">
              <Template980x600
                selectedImages={selectedImages}
                listingInfo={listingInfo}
                scale={scale980x600}
              />
            </FlexColCenteredY>
          </FlexColContainer>
          <FlexColContainer className="gap-4 items-center">
            <FlexRowContainer className="gap-8 w-full justify-between">
              <FlexRowCenteredY className="justify-between w-full">
                <H3>580x400</H3>
                <ImageScaleSlider sliderID={`slider-580x400-img`} handleScaleChange={handleScaleChange} scale={scale580x400.imageSize} />
              </FlexRowCenteredY>
              {isVisible &&
                <SlidersToolBar
                  slidersPosition={slidersPosition}
                  setSlidersPosition={setSlidersPosition}
                  scale={scale580x400}
                  handleScaleChange={handleScaleChange}
                  sliderID="slider-580x400"
                />
              }
            </FlexRowContainer>
            <FlexColCenteredY className="min-h-[60vh]">
              <Template580x400
                selectedImages={selectedImages}
                listingInfo={listingInfo}
                scale={scale580x400}
              />
            </FlexColCenteredY>
          </FlexColContainer>
          <FlexColContainer className="gap-4 items-center">
            <FlexRowContainer className="gap-8 w-full justify-between">
              <FlexRowCenteredY className="justify-between w-full">
                <H3>980x300</H3>
                <ImageScaleSlider sliderID={`slider-980x300-img`} handleScaleChange={handleScaleChange} scale={scale980x300.imageSize} />
              </FlexRowCenteredY>
              {isVisible &&
                <SlidersToolBar
                  slidersPosition={slidersPosition}
                  setSlidersPosition={setSlidersPosition}
                  scale={scale980x300}
                  handleScaleChange={handleScaleChange}
                  sliderID="slider-980x300"
                />
              }
            </FlexRowContainer>
            <FlexColCenteredY className="min-h-[60vh]">
              <Template980x300
                selectedImages={selectedImages}
                listingInfo={listingInfo}
                scale={scale980x300}
              />
            </FlexColCenteredY>
          </FlexColContainer>
          <FlexColContainer className="gap-4 min-w-[25rem] items-center w-full">
            <FlexRowContainer className="gap-8 w-full justify-between">
              <FlexRowCenteredY className="justify-between w-full">
                <H3>300x600</H3>
                <ImageScaleSlider sliderID={`slider-300x600-img`} handleScaleChange={handleScaleChange} scale={scale300x600.imageSize} />
              </FlexRowCenteredY>
              {
                isVisible &&
                <SlidersToolBar
                  slidersPosition={slidersPosition}
                  setSlidersPosition={setSlidersPosition}
                  scale={scale300x600}
                  handleScaleChange={handleScaleChange}
                  sliderID="slider-300x600"
                />
              }
            </FlexRowContainer>
            <FlexColCenteredY className="min-h-[60vh]">
              <Template300x600
                selectedImages={selectedImages}
                listingInfo={listingInfo}
                scale={scale300x600}
              />
            </FlexColCenteredY>
          </FlexColContainer>
          <FlexColContainer className="gap-4 min-w-[25rem] items-center w-full">
            <FlexRowContainer className="gap-8 w-full justify-between">
              <FlexRowCenteredY className="justify-between w-full">
                <H3>300x250</H3>
                <ImageScaleSlider sliderID={`slider-300x250-img`} handleScaleChange={handleScaleChange} scale={scale300x250.imageSize} />
              </FlexRowCenteredY>
              {
                isVisible &&
                <SlidersToolBar
                  slidersPosition={slidersPosition}
                  setSlidersPosition={setSlidersPosition}
                  scale={scale300x250}
                  handleScaleChange={handleScaleChange}
                  sliderID="slider-300x250"
                />
              }
            </FlexRowContainer>
            <FlexColCenteredY className="min-h-[60vh]">
              <Template300x250
                selectedImages={selectedImages}
                listingInfo={listingInfo}
                scale={scale300x250}
              />
            </FlexColCenteredY>
          </FlexColContainer>
        </PreviewCarousel>
      </div>
      :
      <span>No Selected Images</span>
  );
};

export default PreviewTab;

