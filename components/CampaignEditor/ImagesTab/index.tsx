import React from "react";
import { CardBaseLight, FlexColCentered, FlexRowContainer } from "@/components/styled-global-components";
import { FaUpload } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';

interface Image {
    id: string;
    link: string;
}

type Images = Image[]

interface ImagesTabProps {
    selectedImages: Images;
    setSelectedImages: React.Dispatch<React.SetStateAction<Images>>;
    allImages: Images;
    setAllImages: React.Dispatch<React.SetStateAction<Images>>;
}

const ImagesTab: React.FC<ImagesTabProps> = ({ selectedImages, setSelectedImages, allImages, setAllImages }) => {
    console.log(allImages)
    const handleUploadClick = () => {
        const input = document.createElement("input");
        input.type = "file";
        //input.accept = "image/jpeg, image/png";
        input.onchange = (e: Event) => {
            const file = (e.target as HTMLInputElement)?.files?.[0];
            if (file) {
                if (file.size > 200 * 1024) {
                    console.error("File size exceeds 200KB.");
                    return;
                }
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    const newImage = { id: uuidv4(), link: reader.result as string };
                    setAllImages((prevImages: Images): Images => [
                        newImage,
                        ...prevImages,
                    ]);
                };
            }
        };
        input.click();
    };

    const changeSelectedImages = (e: React.MouseEvent<HTMLDivElement>) => {
        const imageId = e.currentTarget.id;
        const currentIndex = selectedImages.findIndex((img) => img.id === imageId);

        if (currentIndex === -1) {
            if (selectedImages.length < 2) {
                const imageToAdd = allImages.find((img) => img.id === imageId);
                if (imageToAdd) {
                    setSelectedImages((prevSelectedImages): any => [
                        ...prevSelectedImages,
                        imageToAdd,
                    ]);
                }
            } else {
                console.log("You can only select 2 images.");
            }
        } else {
            setSelectedImages((prevSelectedImages) =>
                prevSelectedImages.filter((img) => img.id !== imageId)
            );
        }
        console.log(selectedImages)
    };

    return (
        <FlexRowContainer className="gap-2 flex-wrap">
            <CardBaseLight>
                <FlexColCentered
                    className="w-[10rem] h-[10rem] md:w-[15rem] md:h-[15rem] shadow rounded p-5"
                    onClick={handleUploadClick}
                >
                    {/* You can replace the content of this div with the upload button design */}
                    <FlexColCentered className="font-bold text-xl lg:text-5xl border-dashed border-slate-400 border-[1px] rounded w-full h-full">
                        <FaUpload className="text-slate-400" />
                    </FlexColCentered>
                </FlexColCentered>
            </CardBaseLight>
            {allImages
                ? allImages.map((item, index) => {
                    const id = item.id;
                    return (
                        <div
                            key={index}
                            className={`w-[10rem] h-[10rem] md:w-[15rem] md:h-[15rem] relative overflow-hidden ${selectedImages.findIndex((img) => img.id === id) !== -1 ? "overlay" : ""
                                }`}
                            onClick={(e) => changeSelectedImages(e)}
                            id={id}
                        >
                            {selectedImages.findIndex((img) => img.id === id) !== -1 && (
                                <>
                                    <div className="overlay-bg"></div>
                                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-xl lg:text-6xl z-20">
                                        {selectedImages.findIndex((img) => img.id === id) + 1}
                                    </span>
                                </>
                            )}
                            <img src={item.link} alt="testimage" className="w-full h-full object-cover" />
                        </div>
                    );
                })
                : ""}
        </FlexRowContainer>
    );

};

export default ImagesTab;
