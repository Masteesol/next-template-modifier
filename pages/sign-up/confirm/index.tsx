import PageLayout from '@/components/landing/PageLayout';
import { FlexColCentered } from "@/components/shared/styled-global-components";
import { CheckIcon } from '@/components/shared/CustomIcons';

const ConfirmEmail = () => {
    return (
        <PageLayout>
            <FlexColCentered className="h-full">
                <FlexColCentered className="gap-8 text-center max-w-[700px]">
                    <FlexColCentered className="gap-4">
                        <CheckIcon />
                        <h1 className="font-bold">Thank you for signing up!</h1>
                    </FlexColCentered>
                    <FlexColCentered className="text-gray-700">
                        <p>We have sent you an email confirmation link to your registered email.</p>
                        <p>You must confirm email to be able to sign in.</p>
                    </FlexColCentered>
                </FlexColCentered>
            </FlexColCentered>
        </PageLayout>
    );
};

export default ConfirmEmail;
