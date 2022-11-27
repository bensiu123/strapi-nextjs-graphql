import {
  AddToCartDocument,
  GetCartDocument,
  RemoveFromCartDocument,
  UpdateCartDocument,
} from "@/graphql/generated";
import { Dish } from "@/interfaces/restaurant";
import { useMutation, useQuery } from "@apollo/client";
import { useMemo, useState } from "react";

export type DishInCart = Dish & {
  cartId?: string;
  quantity: number;
};

export const useCart = () => {
  const [items, setItems] = useState<DishInCart[]>([]);

  const getCartQuery = useQuery(GetCartDocument, {
    onCompleted: (data) => {
      const items: DishInCart[] =
        data.carts?.data
          .map<DishInCart | null>((cart) => {
            const { id: cartId, attributes } = cart;
            if (!attributes) return null;
            const quantity = attributes.quantity;
            const dishId = attributes.dish?.data?.id;
            const dish = attributes.dish?.data?.attributes;
            const url =
              attributes.dish?.data?.attributes?.image?.data?.attributes?.url;
            if (!cartId || !quantity || !dishId || !dish || !url) return null;

            const { name, description, price } = dish;
            if (!name || !description || !price) return null;

            return {
              cartId,
              id: dishId,
              quantity,
              name,
              description,
              price,
              image: { url },
            };
          })
          .filter((i): i is DishInCart => i !== null) || [];

      setItems(items);
    },
  });

  const [addToCart, addToCartMutation] = useMutation(AddToCartDocument);

  const [updateCart, updateCartMutation] = useMutation(UpdateCartDocument);

  const [removeFromCart, removeFromCartMutation] = useMutation(
    RemoveFromCartDocument
  );

  const total = useMemo<number>(
    () => items.reduce((total, i) => total + i.price, 0),
    [items]
  );

  const addItem = (item: Dish) => {
    setItems((prev) => {
      const existingItemIndex = prev.findIndex((i) => i.id === item.id);

      if (existingItemIndex === -1) {
        const newItem: DishInCart = { ...item, quantity: 1 };
        return [...prev, newItem];
      } else {
        const oldItem = prev[existingItemIndex];
        if (!oldItem) return prev; // type-guard only
        const newItem: DishInCart = {
          ...oldItem,
          quantity: oldItem.quantity + 1,
        };
        return prev.map((i) => (i.id === item.id ? newItem : i));
      }
    });
  };

  const removeItem = (item: Dish) => {
    setItems((prev) => {
      const existingItemIndex = prev.findIndex((i) => i.id === item.id);
      const existingItem = prev[existingItemIndex];
      if (!existingItem) return prev;

      if (existingItem.quantity > 1) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
        );
      } else {
        const items = [...prev];
        items.splice(existingItemIndex, 1);
        return items;
      }
    });
  };

  const isInCart = (item: Dish): boolean => {
    return items.some((i) => i.id === item.id);
  };

  const getQuantityInCart = (item: Dish): number => {
    const itemExists = items.find((i) => i.id === item.id);
    if (!itemExists) return 0;
    return itemExists.quantity;
  };

  return { items, addItem, removeItem, total, isInCart, getQuantityInCart };
};
