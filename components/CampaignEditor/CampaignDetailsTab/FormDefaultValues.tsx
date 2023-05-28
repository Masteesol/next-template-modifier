import { useTranslation } from "next-i18next";

import { Badge, Label, TextInput } from "flowbite-react";
import { Form, FormWrapper } from "@/components/styled-global-components";
import { translateOrDefault } from "@/utils/i18nUtils";
import { Address, AddressData } from "@/types";

import { handleInputChange } from "@/utils/handleFormElementChange";
import { useState } from "react";


interface FormDefaultValues {
  addressData: AddressData;
  setListingData: React.Dispatch<React.SetStateAction<Address | null>>
  isEditActive: boolean;
}

interface ValidationErrors {
  price?: string;
  bedrooms?: string;
  size?: string;
  [key: string]: string | undefined;
}

const FormDefaultValues = ({ addressData, setListingData, isEditActive }: FormDefaultValues) => {
  const { t } = useTranslation("common");

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    // If name includes "price", "bedrooms", or "size", check if the input is a valid number.
    if (name.includes("price") || name.includes("bedrooms") || name.includes("size")) {
      if (!/^\d+$/.test(value)) {
        // If the input is not a valid number, set a validation error and return.
        setValidationErrors(prev => ({ ...prev, [name]: 'Input must be a number' }));
        console.log("first")
        return;
      } else {
        // If the input is a valid number, remove any existing validation error for this field.
        setValidationErrors(prev => {
          const { [name]: _, ...rest } = prev;
          return rest;
        });
      }
    }

    // If we reach this line, the input is valid or the field does not need to be a number.
    // Therefore, we can safely update the listing data.
    handleInputChange(setListingData)(event);
  };


  return (
    <FormWrapper className={`${!isEditActive && "bg-gray-200 dark:bg-gray-900"} flex-1 gap-4`}>
      <Form>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="title" value="Street Address" />
          </div>
          <TextInput
            id="title"
            type="text"
            name="addressData.street"
            onChange={onInputChange}
            defaultValue={`${addressData.street}`}
            disabled={!isEditActive}
            required={true}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="price" value="Price (NOK)" />
          </div>
          <TextInput
            id="price"
            type="number"
            name="addressData.price"
            disabled={!isEditActive}
            onChange={onInputChange}
            defaultValue={`${addressData.price}`}
            required={true}
          />
          {validationErrors["addressData.price"] && <Badge color="warning">{validationErrors["addressData.price"]}</Badge>}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="bedrooms" value="Bedrooms" />
          </div>
          <TextInput
            id="bedrooms"
            type="number"
            name="addressData.bedrooms"
            onChange={onInputChange}
            defaultValue={`${addressData.bedrooms}`}
            disabled={!isEditActive}
            required={true}
          />
          {validationErrors["addressData.bedrooms"] && <Badge color="warning">{validationErrors["addressData.bedrooms"]}</Badge>}
        </div>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="size-primary"
              value={translateOrDefault(t, "pages.newCampaign.form.labels.sizePrimary", "Size (m²) - Primary Area")}
            />
          </div>
          <TextInput
            id="size-primary"
            type="number"
            placeholder="80"
            name="addressData.size"
            required={true}
            onChange={onInputChange}
            defaultValue={`${addressData.sizePrimary}`}
            disabled={!isEditActive}
          />
          {validationErrors["addressData.size"] && <Badge color="warning">{validationErrors["addressData.size"]}</Badge>}
        </div>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="size-usable"
              value={translateOrDefault(t, "pages.newCampaign.form.labels.sizeUsable", "Size (m²) - Usable Area")}
            />
          </div>
          <TextInput
            id="size-usable"
            type="number"
            placeholder="100"
            name="addressData.size"
            required={true}
            onChange={onInputChange}
            defaultValue={`${addressData.sizeUsable}`}
            disabled={!isEditActive}
          />
          {validationErrors["addressData.size"] && <Badge color="warning">{validationErrors["addressData.size"]}</Badge>}
        </div>

        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="size"
              value={translateOrDefault(t, "pages.newCampaign.form.labels.area", "Location")}
            />
          </div>
          <TextInput
            id="area"
            type="text"
            placeholder="Oslo"
            name="addressData.city"
            onChange={onInputChange}
            defaultValue={addressData.city}
            disabled={!isEditActive}
            required={true}
          />
        </div>
      </Form>

    </FormWrapper>
  );
};

export default FormDefaultValues;

