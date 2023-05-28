import { Address } from "@/types";

interface TextInputChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & EventTarget;
}

export const handleInputChange = (setListingData: React.Dispatch<React.SetStateAction<Address | null>>) => (e: TextInputChangeEvent) => {
    const nameParts = e.target.name.split('.');
    setListingData((prevState: Address | null) => {
        if (prevState) {
            let updatedState = { ...prevState };
            let target: { [key: string]: any } = updatedState;
            for (let i = 0; i < nameParts.length - 1; i++) {
                target = target[nameParts[i]];
            }
            target[nameParts[nameParts.length - 1]] = e.target.value;
            return updatedState;
        } else {
            // Return null or create a new state here based on your requirements
            return null;
        }
    });
};


interface TextAreaChangeEvent extends React.ChangeEvent<HTMLTextAreaElement> {
    target: HTMLTextAreaElement & EventTarget;
}

export const handleTextAreaChange = (setListingData: React.Dispatch<React.SetStateAction<Address | null>>) => (e: TextAreaChangeEvent) => {
    const nameParts = e.target.name.split('.');
    setListingData((prevState: Address | null) => {
        if (prevState) {
            let updatedState = { ...prevState };
            let target: { [key: string]: any } = updatedState;
            for (let i = 0; i < nameParts.length - 1; i++) {
                target = target[nameParts[i]];
            }
            target[nameParts[nameParts.length - 1]] = e.target.value;
            return updatedState;
        } else {
            // Return null or create a new state here based on your requirements
            return null;
        }
    });
};

interface SelectChangeEvent extends React.ChangeEvent<HTMLSelectElement> {
    target: HTMLSelectElement & EventTarget;
}

export const handleSelectChange = (setListingData: React.Dispatch<React.SetStateAction<Address | null>>) => (e: SelectChangeEvent) => {
    const nameParts = e.target.name.split('.');
    setListingData((prevState: Address | null) => {
        if (prevState) {
            let updatedState = { ...prevState };
            let target: { [key: string]: any } = updatedState;
            for (let i = 0; i < nameParts.length - 1; i++) {
                target = target[nameParts[i]];
            }
            target[nameParts[nameParts.length - 1]] = e.target.value;
            return updatedState;
        } else {
            // Return null or create a new state here based on your requirements
            return null;
        }
    });
};


interface DateInputChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & EventTarget;
}

export const handleDateInputChange = (setListingData: React.Dispatch<React.SetStateAction<Address | null>>) => (e: DateInputChangeEvent) => {
    const nameParts = e.target.name.split('.');
    setListingData((prevState: Address | null) => {
        if (prevState) {
            let updatedState = { ...prevState };
            let target: { [key: string]: any } = updatedState;
            for (let i = 0; i < nameParts.length - 1; i++) {
                target = target[nameParts[i]];
            }
            target[nameParts[nameParts.length - 1]] = e.target.value;
            return updatedState;
        } else {
            // Return null or create a new state here based on your requirements
            return null;
        }
    });
};
