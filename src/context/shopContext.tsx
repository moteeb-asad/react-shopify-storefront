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
  const [checkout, setCheckout] = useState<ShopifyCheckout | null>(null);
  const [buttonloader, setButtonLoader] = useState<string>("");
  const [quantityvalue, setQuantityValue] = useState<number>(1);
  const [quantityoverlay, setQuantityOverlay] = useState<boolean>(false);
  const [selectedqtyoverlay, setSelectedqtyOverlay] = useState<string>("");

  useEffect(() => {
    // Clean up old cart_id from localStorage (migration from manual Cart API attempt)
    if (localStorage.cart_id) {
      localStorage.removeItem("cart_id");
    }

    if (localStorage.checkout_id) {
      fetchCheckout(localStorage.checkout_id);
    } else {
      createCheckout();
    }
  }, []);

  async function createCheckout() {
    try {
      console.log("Creating new checkout...");
      const checkout = await client.checkout.create();
      localStorage.setItem("checkout_id", checkout.id);
      setCheckout(checkout);
      console.log("Checkout created:", checkout);
    } catch (error) {
      console.error("Error creating checkout:", error);
    }
  }

  async function fetchCheckout(checkoutId: string) {
    try {
      console.log("Fetching checkout:", checkoutId);
      const checkout = await client.checkout.fetch(checkoutId);
      setCheckout(checkout);
      console.log("Checkout fetched:", checkout);
    } catch (error) {
      console.error("Error fetching checkout:", error);
      // If fetch fails, create new checkout
      createCheckout();
    }
  }

  async function addItemToCheckout(variantId: string, quantity: number) {
    setButtonLoader(variantId);
    try {
      if (!checkout) {
        console.log("Checkout not ready, creating new checkout...");
        await createCheckout();
        return;
      }

      const lineItemsToAdd = [
        {
          variantId: variantId,
          quantity: quantity,
        },
      ];

      const updatedCheckout = await client.checkout.addLineItems(
        checkout.id,
        lineItemsToAdd
      );
      setCheckout(updatedCheckout);
      setButtonLoader("");
      toast.success(`Item added to cart!`);
      console.log("Item added to checkout:", updatedCheckout);
    } catch (error) {
      console.error("Error adding item to checkout:", error);
      setButtonLoader("");
      toast.error("Error adding item to cart");
    }
  }

  async function removeShopifyCheckoutItem(lineItemId: string) {
    try {
      if (!checkout) return;

      const updatedCheckout = await client.checkout.removeLineItems(
        checkout.id,
        [lineItemId]
      );
      setCheckout(updatedCheckout);
      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Error removing item from cart");
    }
  }

  async function increment(lineItemId: string, quantity: number) {
    setSelectedqtyOverlay(lineItemId);
    setQuantityOverlay(true);
    try {
      if (!checkout) return;

      const lineItemsToUpdate = [
        {
          id: lineItemId,
          quantity: quantity + 1,
        },
      ];

      const updatedCheckout = await client.checkout.updateLineItems(
        checkout.id,
        lineItemsToUpdate
      );
      setCheckout(updatedCheckout);
      setQuantityOverlay(false);
    } catch (error) {
      console.error("Error updating quantity:", error);
      setQuantityOverlay(false);
    }
  }

  async function decrement(lineItemId: string, quantity: number) {
    if (quantity === 1) {
      removeShopifyCheckoutItem(lineItemId);
      return;
    }

    setSelectedqtyOverlay(lineItemId);
    setQuantityOverlay(true);
    try {
      if (!checkout) return;

      const lineItemsToUpdate = [
        {
          id: lineItemId,
          quantity: quantity - 1,
        },
      ];

      const updatedCheckout = await client.checkout.updateLineItems(
        checkout.id,
        lineItemsToUpdate
      );
      setCheckout(updatedCheckout);
      setQuantityOverlay(false);
    } catch (error) {
      console.error("Error updating quantity:", error);
      setQuantityOverlay(false);
    }
  }

  async function removeShopifyDiscount() {
    try {
      if (!checkout) return;

      const updatedCheckout = await client.checkout.removeDiscount(checkout.id);
      setCheckout(updatedCheckout);
    } catch (error) {
      console.error("Error removing discount:", error);
    }
  }

  async function fetchProducts() {
    try {
      const products = await client.product.fetchAll();
      setProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  async function fetchProductByHandle(
    handle: string
  ): Promise<ShopifyProduct | null> {
    try {
      const product = await client.product.fetchByHandle(handle);
      return product;
    } catch (error) {
      console.error("Error fetching product:", error);
      return null;
    }
  }

  const contextValue: ShopContextType = {
    products,
    checkout,
    fetchProducts,
    addItemToCheckout,
    fetchProductByHandle,
    removeShopifyCheckoutItem,
    removeShopifyDiscount,
    increment,
    decrement,
    quantityvalue,
    setQuantityValue,
    quantityoverlay,
    selectedqtyoverlay,
    buttonloader,
  };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
}

function useShop() {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}

export default ShopProvider;
export { useShop };
