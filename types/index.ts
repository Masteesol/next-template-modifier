export interface Image {
  id: string;
  link: string;
}

export interface Media {
  images: Image[];
  createdBanners: any[]; // consider defining a type for this if possible
}

export interface AddressData {
  street: string;
  zip: string;
  city: string;
  price: number;
  bedrooms: number;
  sizePrimary: number;
  sizeUsable: number;
}

export interface Facebook {
  mainText: string;
  heading: string;
  details: string;
}

export interface BannerSizeText {
  size980x600: {
    priceText: string;
    sizeText: string;
    descriptionText: string;
  };
  size980x300: {
    priceText: string;
    sizeText: string;
    descriptionText: string;
  };
  size580x400: {
    priceText: string;
    sizeText: string;
    descriptionText: string;
  };
  size300x250: {
    priceText: string;
    sizeText: string;
    descriptionText: string;
  };
  size300x600: {
    priceText: string;
    sizeText: string;
    descriptionText: string;
  };
}

export interface AdForm {
  bannerSizeText: BannerSizeText;
  priceText: string;
  sizeText: string;
  descriptionText: string;
}

export interface BannerText {
  facebook: Facebook;
  adForm: AdForm;
}

export interface CampaignData {
  realtorName: string;
  startDate: string;
  endDate: string;
  product: number;
  campaignArea: string;
  linkHomePage: string;
  comment: string;
}

export interface Address {
  addressData: AddressData;
  campaignData: CampaignData;
  bannerText: BannerText;
  media: Media;
  created_at: string;
  id: number;
  office: string;
  published: boolean;
  archived: boolean;
  in_billing: boolean;
  in_staging: boolean;
  active: boolean;
  cancelled: boolean;
}

export interface Addresses {
  addresses: Address[];
}
