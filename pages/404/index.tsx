import Head from "next/head";
import {
  FlexColCentered,
  GenericButton,
  H1
} from "@/components/shared/styled-global-components";
import Link from "next/link"
const Page = () => {
  return (
    <>
      <Head>
        <title>404 error</title>
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FlexColCentered className="h-[100vh]">
        <H1 className="pb-9">
          404: Page you are trying to find does not exist.
        </H1>
        <Link href="/">
          <GenericButton className="bg-green-700 text-white">
            Take me home
          </GenericButton>
        </Link>
      </FlexColCentered>

    </>
  );
}

export default Page;

