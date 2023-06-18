import Head from "next/head";
import PageLayout from "../../components/PageLayout";
import { Error404PageContent } from "@/components/ErrorPageComponent";
import cookie from 'cookie'
import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
type PageProps = {
  authenticated: boolean,
}
const Page: NextPage<PageProps> = ({ authenticated }) => {
  return (
    <>
      <Head>
        <title>404 error</title>
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout authenticated={authenticated}>
        <Error404PageContent />
      </PageLayout>
    </>
  );
}

export default Page;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = context.req ? cookie.parse(context.req.headers.cookie || '') : undefined
  const token = cookies && cookies.supabaseToken
  const userID = cookies && cookies.userID
  const authenticated = token
  if (!authenticated) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false,
      },
    }
  }
  return {
    props: {
      authenticated: Boolean(token),
      userID: userID || null,
      ...(await serverSideTranslations(context.locale as string, ["common"]))
    }
  }
}