import Head from "next/head";
import PageLayout from "../../components/PageLayout";
import { Error404PageContent } from "@/components/ErrorPageComponent";

export default function Home() {
  return (
    <>
      <Head>
        <title>404 error</title>
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <Error404PageContent />
      </PageLayout>
    </>
  );
}
