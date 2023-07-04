import PageLayout from '@/components/landing/PageLayout';
import { FlexColCentered, GenericButton } from "@/components/shared/styled-global-components";
import { CheckIcon } from '@/components/shared/CustomIcons';
import Link from "next/link"
const ConfirmEmail = () => {
    return (
        <PageLayout>
            <FlexColCentered className="h-full">
                <FlexColCentered className="gap-8">
                    <FlexColCentered className="gap-4">
                        <CheckIcon />
                        <h1 className="font-bold">Thank you for signing up</h1>
                    </FlexColCentered>
                    <p className="text-gray-700">We have sent you an email confirmation link to your registered email.</p>
                    <Link href="/sign-in">
                        <GenericButton className="bg-green-700 text-white">
                            To sign in
                        </GenericButton>
                    </Link>
                </FlexColCentered>
            </FlexColCentered>
        </PageLayout>
    );
};

export default ConfirmEmail;
