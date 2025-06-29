import Client from "shopify-buy";
import { useState, createContext, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import {
  ShopifyProduct,
  ShopifyCheckout,
  ShopContextType,
  ShopProviderProps,
} from "../types/shop";

const client = Client.buildClient({
  domain: import.meta.env.VITE_SHOPIFY_DOMAIN,
  storefrontAccessToken: import.meta.env.VITE_SHOPIFY_API,
});

const ShopContext = createContext<ShopContextType | undefined>(undefined);

function ShopProvider({ children }: ShopProviderProps) {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [checkout, setCheckout] = useState<ShopifyCheckout>(
    {} as ShopifyCheckout
  );
  const [buttonloader, setButtonLoader] = useState<string>("");
  const [quantityvalue, setQuantityValue] = useState<number>(0);
  const [quantityoverlay, setQuantityOverlay] = useState<boolean>(false);
  const [selectedqtyoverlay, setSelectedQtyOverlay] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (localStorage.checkout_id) {
      fetchCheckout(localStorage.checkout_id);
    } else {
      createCheckout();
    }
  }, []);

  const createCheckout = async (): Promise<void> => {
    const checkout = await client.checkout.create();
    localStorage.setItem("checkout_id", checkout.id);
    setCheckout(checkout as ShopifyCheckout);
  };

  const fetchCheckout = async (checkoutId: string): Promise<void> => {
    client.checkout.fetch(checkoutId).then((checkout: any) => {
      setCheckout(checkout as ShopifyCheckout);
    });
  };

  const fetchAllProducts = async (): Promise<void> => {
    const products = await client.product.fetchAll();
    setProducts(products as ShopifyProduct[]);
  };

  const fetchProductByHandle = async (
    handle: string
  ): Promise<ShopifyProduct | null> => {
    try {
      const product = await client.product.fetchByHandle(handle);
      return product as ShopifyProduct;
    } catch (error) {
      console.error("Error fetching product:", error);
      return null;
    }
  };

  const addItemToCart = async (
    variantId: string,
    quantity: number
  ): Promise<void> => {
    setButtonLoader("active");
    const lineItemsToAdd = [
      {
        variantId: variantId,
        quantity: quantity || 1,
      },
    ];

    const cart = await client.checkout.addLineItems(
      checkout.id,
      lineItemsToAdd
    );
    setCheckout(cart as ShopifyCheckout);
    setButtonLoader("");
    toast.success("Product Added To Cart!");
  };

  const removeCartItem = async (productID: string[]): Promise<void> => {
    const removeItem = await client.checkout.removeLineItems(
      checkout.id,
      productID
    );
    setCheckout(removeItem as ShopifyCheckout);
  };

  const incrementQuantity = async (
    itemId: string,
    qValue: number
  ): Promise<void> => {
    if (qValue > 0) {
      setSelectedQtyOverlay(itemId);
      setQuantityOverlay(true);
      setQuantityValue(qValue);
      const lineItemsToUpdate = [{ id: itemId, quantity: qValue + 1 }];
      const updateCartItem = await client.checkout.updateLineItems(
        checkout.id,
        lineItemsToUpdate
      );
      setCheckout(updateCartItem as ShopifyCheckout);
    }
    setQuantityOverlay(false);
  };

  const decrementQuantity = async (itemId: string): Promise<void> => {
    setSelectedQtyOverlay(itemId);
    setQuantityOverlay(true);
    let updatedQuantity = 0;

    if (checkout.lineItems) {
      checkout.lineItems.forEach((curElem) => {
        if (curElem.id === itemId) {
          updatedQuantity = curElem.quantity - 1;
        }
      });
    }

    const lineItemsToUpdate = [{ id: itemId, quantity: updatedQuantity }];

    const updateCartItem = await client.checkout.updateLineItems(
      checkout.id,
      lineItemsToUpdate
    );
    setCheckout(updateCartItem as ShopifyCheckout);
    setQuantityOverlay(false);
  };

  const addDiscount = async (discountCode: string): Promise<void> => {
    const addDiscountCode = await client.checkout.addDiscount(
      checkout.id,
      discountCode
    );
    setCheckout(addDiscountCode as ShopifyCheckout);
  };

  const removeDiscount = async (checkout: ShopifyCheckout): Promise<void> => {
    const removeDiscountCode = await client.checkout.removeDiscount(
      checkout.id
    );
    setCheckout(removeDiscountCode as ShopifyCheckout);
  };

  const contextValue: ShopContextType = {
    products,
    checkout,
    buttonloader,
    quantityvalue,
    quantityoverlay,
    selectedqtyoverlay,
    fetchAllShopifyProducts: fetchAllProducts,
    fetchProductByHandle,
    addItemToShopifyCart: addItemToCart,
    removeShopifyCartItem: removeCartItem,
    increment: incrementQuantity,
    decrement: decrementQuantity,
    addShopifyDiscount: addDiscount,
    removeShopifyDiscount: removeDiscount,
    setQuantityValue: setQuantityValue,
  };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
}

// Custom hook for using the shop context
export const useShop = (): ShopContextType => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};

export { ShopContext };
export default ShopProvider;
