// GenerateJPG.tsx
//import { toJpeg } from "html-to-image";
import domtoimage from 'dom-to-image';
import { CTAButton } from '@/components/styled-global-components';
const sleep = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

const GenerateJPGs = ({ updateGeneratedJPGs, setActiveIndex, setActiveTabIndex }: any) => {
  const generateAllJPGs = async () => {
    const images = Array.from(document.querySelectorAll('.template-container'));

    for (let i = 0; i < images.length; i++) {
      // Make the current image visible
      //images[i].classList.remove('hidden');
      setActiveIndex(i);
      // Wait for a short delay to allow the image to render
      await sleep(200);

      const dataUrl = await domtoimage.toJpeg(images[i], { quality: 0.95 });
      const id = images[i].getAttribute('id');
      updateGeneratedJPGs(id, dataUrl);

      // Hide the current image again
      images[i].classList.add('hidden');
    }
    setActiveTabIndex(4);
  };


  return <CTAButton onClick={generateAllJPGs}>Generate JPGs</CTAButton>
};

export default GenerateJPGs;
