export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  variants: ShopifyVariant[];
  images: ShopifyImage[];
  tags: string[];
  productType: string;
  vendor: string;
  availableForSale: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  onlineStoreUrl: string;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  compareAtPrice?: {
    amount: string;
    currencyCode: string;
  };
  availableForSale: boolean;
  currentlyNotInStock: boolean;
  quantityAvailable: number;
  image?: ShopifyImage;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  sku: string;
  weight: number;
  weightUnit: string;
}

export interface ShopifyImage {
  id: string;
  url: string;
  src: string; // Shopify uses src for image URLs
  altText: string;
  width: number;
  height: number;
}

export interface ShopifyLineItem {
  id: string;
  quantity: number;
  title: string;
  variant: ShopifyVariant;
  customAttributes: {
    key: string;
    value: string;
  }[];
}

export interface ShopifyCheckout {
  id: string;
  webUrl: string;
  subtotalPrice: {
    amount: string;
    currencyCode: string;
  };
  totalTax: {
    amount: string;
    currencyCode: string;
  };
  totalPrice: {
    amount: string;
    currencyCode: string;
  };
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
  email?: string;
  discountApplications: ShopifyDiscountApplication[];
  appliedGiftCards: ShopifyGiftCard[];
  shippingAddress?: ShopifyAddress;
  shippingLine?: ShopifyShippingRate;
  customAttributes: {
    key: string;
    value: string;
  }[];
  note?: string;
  paymentDue: {
    amount: string;
    currencyCode: string;
  };
  ready: boolean;
  requiresShipping: boolean;
  taxesIncluded: boolean;
  taxExempt: boolean;
  currencyCode: string;
  lineItems: ShopifyLineItem[];
  orderStatusUrl?: string;
  order?: {
    id: string;
    processedAt: string;
    orderNumber: number;
    statusUrl: string;
  };
}

export interface ShopifyDiscountApplication {
  targetSelection: string;
  targetType: string;
  value: {
    percentage?: number;
    amount?: {
      amount: string;
      currencyCode: string;
    };
  };
  title: string;
  description?: string;
  code?: string;
}

export interface ShopifyGiftCard {
  id: string;
  lastCharacters: string;
  balance: {
    amount: string;
    currencyCode: string;
  };
  usedAmount: {
    amount: string;
    currencyCode: string;
  };
}

export interface ShopifyAddress {
  address1: string;
  address2?: string;
  city: string;
  company?: string;
  country: string;
  countryCode: string;
  firstName: string;
  lastName: string;
  phone?: string;
  province: string;
  provinceCode: string;
  zip: string;
}

export interface ShopifyShippingRate {
  handle: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  title: string;
}

export interface ShopContextType {
  products: ShopifyProduct[];
  checkout: ShopifyCheckout;
  buttonloader: string;
  quantityvalue: number;
  quantityoverlay: boolean;
  selectedqtyoverlay: string | null;
  fetchAllShopifyProducts: () => Promise<void>;
  fetchProductByHandle: (handle: string) => Promise<ShopifyProduct | null>;
  addItemToShopifyCart: (variantId: string, quantity: number) => Promise<void>;
  removeShopifyCartItem: (productID: string[]) => Promise<void>;
  increment: (itemId: string, qValue: number) => Promise<void>;
  decrement: (itemId: string) => Promise<void>;
  addShopifyDiscount: (discountCode: string) => Promise<void>;
  removeShopifyDiscount: (checkout: ShopifyCheckout) => Promise<void>;
  setQuantityValue: (value: number) => void;
}

export interface ShopProviderProps {
  children: React.ReactNode;
}
