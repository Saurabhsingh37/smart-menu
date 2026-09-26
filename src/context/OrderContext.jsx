import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

const OrderContext = createContext(null);

export function OrderProvider({ children }) {
  const [items, setItems] = useState([]);

  // Additional restaurant-side amount
  const [additionalAmount, setAdditionalAmount] =
    useState("");

  const addItem = (item) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (orderItem) => orderItem.id === item.id
      );

      if (existingItem) {
        return currentItems.map((orderItem) =>
          orderItem.id === item.id
            ? {
                ...orderItem,
                quantity: orderItem.quantity + 1,
              }
            : orderItem
        );
      }

      return [
        ...currentItems,
        {
          ...item,
          quantity: 1,
        },
      ];
    });
  };

  const increaseQty = (itemId) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQty = (itemId) => {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === itemId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (itemId) => {
    setItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== itemId
      )
    );
  };

  const clearOrder = () => {
    setItems([]);
    setAdditionalAmount("");
  };

  const totalItems = useMemo(() => {
    return items.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }, [items]);

  const totalAmount = useMemo(() => {
    return items.reduce(
      (total, item) =>
        total +
        Number(item.price) * item.quantity,
      0
    );
  }, [items]);

  const extraAmount =
    Number(additionalAmount) || 0;

  const finalTotal =
    totalAmount + extraAmount;

  const value = {
    items,

    addItem,
    increaseQty,
    decreaseQty,
    removeItem,
    clearOrder,

    totalItems,
    totalAmount,

    additionalAmount,
    setAdditionalAmount,
    finalTotal,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error(
      "useOrder must be used inside an OrderProvider"
    );
  }

  return context;
}
