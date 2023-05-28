// CustomCarousel.tsx
import React, { ReactNode } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FlexColCenteredX, FlexColCenteredY } from '../../../styled-global-components';

interface PreviewCarouselProps {
  children: ReactNode[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const PreviewCarousel: React.FC<PreviewCarouselProps> = ({ children, activeIndex, setActiveIndex }) => {

  const handleSlideTo = (index: number) => {
    setActiveIndex(index);
  };

  const handlePrev = () => {
    setActiveIndex(activeIndex === 0 ? children.length - 1 : activeIndex - 1);
  };

  const handleNext = () => {
    setActiveIndex(activeIndex === children.length - 1 ? 0 : activeIndex + 1);
  };

  return (
    <div id="carousel-container" className="relative w-full max-w-[90vw] border-[1px] border-slate-300 rounded p-4">
      <FlexColCenteredX className="relative overflow-hidden h-full min-h-[60vh] m-8">
        {children.map((child, index) => (
          <FlexColCenteredY
            key={index}
            className={`${index === activeIndex ? 'block' : 'hidden'
              } duration-700 ease-in-out w-full`}
          >
            {child}
          </FlexColCenteredY>
        ))}
      </FlexColCenteredX>
      <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
        {children.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${index === activeIndex
              ? 'bg-slate-800 dark:bg-slate-200'
              : 'bg-slate-400'
              }`}
            aria-current={index === activeIndex}
            aria-label={`Slide ${index + 1}`}
            onClick={() => handleSlideTo(index)}
          />
        ))}
      </div>
      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none text-2xl"
        onClick={handlePrev}
      >
        <FaChevronLeft />
      </button>
      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none text-2xl"
        onClick={handleNext}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default PreviewCarousel;
