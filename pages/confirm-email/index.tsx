import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PageLayout from '@/components/landing/PageLayout';
import { FlexColCentered, H1, H2 } from "@/components/shared/styled-global-components";
import { Badge } from 'flowbite-react';
import { CheckIcon } from '@/components/shared/CustomIcons';

const ConfirmEmail = () => {

    const router = useRouter();
    const [error, setError] = useState(false)
    const [confirmed, setConfirmed] = useState(false)
    const [redirecting, setRedirecting] = useState(false)

    useEffect(() => {
        const { access_token } = router.query;
        console.log(access_token)
        if (access_token && access_token !== "unauthorized_client") {
            setConfirmed(true)
            setTimeout(() => {
                setRedirecting(true)
                setTimeout(() => {
                    router.push("/")
                }, 1000)
            }, 2000)
        } else {
            setError(true)
        }
    }, [router]);

    return (
        <PageLayout>
            <FlexColCentered className="h-full gap-8">
                {error ?
                    <Badge color={"failure"}>Error validating email </Badge>
                    :
                    <H1>Thank you for confirming your email!</H1>
                }
                {
                    confirmed &&
                    <FlexColCentered className="gap-4">
                        <CheckIcon />
                        {redirecting && <H2>Redirecting...</H2>}
                    </FlexColCentered>
                }
            </FlexColCentered>
        </PageLayout>
    );
};

export default ConfirmEmail;
