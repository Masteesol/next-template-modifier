import { FaArrowRight } from "react-icons/fa";
import { HollowButton } from "@/components/shared/styled-global-components";

const NavHollowButton = ({ index, templateRefs, template }: any) => {
    return <HollowButton
        className="w-full text-left flex justify-between"
        key={index}
        onClick={() => {
            console.log(templateRefs[index])
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
                    console.log(container)
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
        {template.title}
        <FaArrowRight
            className="text-2xl cursor-pointer hover:text-green-800 dark:hover:text-green-100 ms-auto"
        />
    </HollowButton>
}

export default NavHollowButton;