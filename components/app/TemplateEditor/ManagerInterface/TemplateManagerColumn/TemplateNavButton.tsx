
import { FlexRowCenteredY } from "@/components/shared/styled-global-components";
import { Templates } from "@/types/global";
import { BsArrowRight, BsFillGrid3X2GapFill } from "react-icons/bs";

interface ComponentProps {
    index: number;
    templateRefs: any;
    template: Templates;
    isEditing: boolean;
}

const NavButton = ({ index, templateRefs, template, isEditing }: ComponentProps) => {

    if (!template.favourited && isEditing) {
        return <div
            className={`w-full pe-2`}
            id={`${index}`}
        >
            <FlexRowCenteredY className="gap-4 justify-between cursor-grab">
                <h3>
                    {template.title.length > 25 ? `${template.title.substring(0, 25)}...` : `${template.title}`}
                </h3>
                <BsFillGrid3X2GapFill className="text-xl" />
            </FlexRowCenteredY>
        </div >
    }
    return <div className="w-full">
        <button
            className={`${template.is_collection ? "border-purple-600" : "border-green-600"} w-full text-left flex items-center gap-2 justify-between rounded-sm hover:border-l-4 pe-2 hover:ps-2 hover:pe-0 transition-all ease-in-out duration-300 transition-delay-200`}
            key={index}
            onClick={() => {
                //console.log(templateRefs[index])
                if (templateRefs[index] && templateRefs[index].current) {
                    const animateScroll = (element: HTMLElement, from: number, to: number, duration: number) => {
                        const start = performance.now();
                        requestAnimationFrame(function step(timestamp: number) {
                            const elapsed = timestamp - start;
                            element.scrollTop = from + ((to - from) * elapsed) / duration;
                            if (elapsed < duration) {
                                requestAnimationFrame(step);
                            } else {
                                element.scrollTop = to;
                            }
                        });
                    }
                    const scrollToTemplate = (index: number) => {
                        const container = document.querySelector('#templates-container') as HTMLElement; // get the container
                        //console.log(container)
                        const targetElement = templateRefs[index].current as HTMLDivElement; // get the target element

                        if (container && targetElement) {
                            const targetPosition = targetElement.offsetTop - container.offsetTop; // calculate target position
                            animateScroll(container, container.scrollTop, targetPosition, 200); // animate over 500ms
                        }
                    };

                    scrollToTemplate(index)
                }
            }}

        >
            <span
                className={`${template.is_collection ? "bg-purple-300" : "bg-green-300"} h-3 w-3 rounded-full`}
            /><span>
                {template.title.length > 25 ? `${template.title.substring(0, 25)}...` : `${template.title}`}
            </span>

            <BsArrowRight
                className="text-2xl cursor-pointer hover:text-green-800 dark:hover:text-green-100 ms-auto"
            />
        </button>
    </div>


}

export default NavButton;