import { useRouter } from "next/router";
import {
  FlexColContainer,
  FlexRowContainer,
} from "@/components/styled-global-components";
import Image from "next/image";
import React from "react";

const LanguageSwitcher: React.FC = () => {
  const router = useRouter();
  const changeLanguage = (lang: string) => {
    router.push(router.asPath, router.asPath, { locale: lang });
  };

  return (
    <FlexColContainer className="gap-2">
      <FlexRowContainer className="gap-2">
        <button onClick={() => changeLanguage("en")}>
          <Image
            src="/icons/flags/british.png"
            alt="US Flag"
            width="24"
            height="24"
          />
        </button>
        <button onClick={() => changeLanguage("no")}>
          <Image
            src="/icons/flags/norway.png"
            alt="Norwegian Flag"
            width="24"
            height="24"
          />
        </button>
      </FlexRowContainer>
    </FlexColContainer>
  );
};

export default LanguageSwitcher;
