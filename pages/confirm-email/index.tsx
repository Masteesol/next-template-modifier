import PageLayout from '@/components/landing/PageLayout';
import { FlexColCentered, H1 } from "@/components/shared/styled-global-components";
import { CheckIcon } from '@/components/shared/CustomIcons';

const ConfirmEmail = () => {
    return (
        <PageLayout>
            <FlexColCentered className="h-full gap-8 text-center">
                <H1>Thank you for confirming your email!</H1>
                <FlexColCentered className="gap-4">
                    <CheckIcon />
                </FlexColCentered>
            </FlexColCentered>
        </PageLayout>
    );
};

export default ConfirmEmail;
