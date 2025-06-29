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

export interface ShopifyCart {
  id: string;
  webUrl: string;
  checkoutUrl: string;
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalTaxAmount?: {
      amount: string;
      currencyCode: string;
    };
  };
  createdAt: string;
  updatedAt: string;
  lines: ShopifyCartLine[];
  totalQuantity: number;
  note?: string;
  attributes: {
    key: string;
    value: string;
  }[];
  discountCodes: ShopifyDiscountCode[];
  estimatedCost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalTaxAmount?: {
      amount: string;
      currencyCode: string;
    };
    totalDutyAmount?: {
      amount: string;
      currencyCode: string;
    };
  };
}

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    product: ShopifyProduct;
  };
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
    amountPerQuantity: {
      amount: string;
      currencyCode: string;
    };
    compareAtAmountPerQuantity?: {
      amount: string;
      currencyCode: string;
    };
  };
  attributes: {
    key: string;
    value: string;
  }[];
}

export interface ShopifyDiscountCode {
  code: string;
  applicable: boolean;
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
  checkout: ShopifyCheckout | null;
  buttonloader: string;
  quantityvalue: number;
  quantityoverlay: boolean;
  selectedqtyoverlay: string;
  fetchProducts: () => Promise<void>;
  fetchProductByHandle: (handle: string) => Promise<ShopifyProduct | null>;
  addItemToCheckout: (variantId: string, quantity: number) => Promise<void>;
  removeShopifyCheckoutItem: (lineItemId: string) => Promise<void>;
  increment: (lineItemId: string, quantity: number) => Promise<void>;
  decrement: (lineItemId: string, quantity: number) => Promise<void>;
  removeShopifyDiscount: () => Promise<void>;
  setQuantityValue: (value: number) => void;
}

export interface ShopProviderProps {
  children: React.ReactNode;
}
