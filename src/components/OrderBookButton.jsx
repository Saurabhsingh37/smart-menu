import { useOrder } from "../context/OrderContext";

function OrderBookButton({ onClick }) {
  const { totalItems, totalAmount } = useOrder();

  // Don't show the button when the order is empty
  if (totalItems === 0) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Open order book with ${totalItems} items`}
      className="
        fixed
        bottom-5
        right-4
        z-[100]
        flex
        items-center
        gap-3
        rounded-2xl
        border
        border-orange-400/30
        bg-black/70
        px-4
        py-3
        text-left
        shadow-[0_0_30px_rgba(249,115,22,0.18)]
        backdrop-blur-xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-orange-400/50
        hover:bg-black/80
        active:scale-95
        sm:bottom-6
        sm:right-6
      "
    >
      {/* Order icon */}
      <div
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-orange-500
          text-xl
          shadow-lg
          shadow-orange-500/20
        "
      >
        📖
      </div>

      {/* Order information */}
      <div className="min-w-0">
        <p
          className="
            text-[10px]
            font-bold
            uppercase
            tracking-[0.18em]
            text-orange-400
          "
        >
          Your Order
        </p>

        <div className="mt-0.5 flex items-center gap-2">
          <span
            className="
              text-sm
              font-bold
              text-white
            "
          >
            {totalItems}{" "}
            {totalItems === 1
              ? "item"
              : "items"}
          </span>

          <span className="text-white/20">
            •
          </span>

          <span
            className="
              text-sm
              font-black
              text-orange-400
            "
          >
            ₹{totalAmount.toFixed(0)}
          </span>
        </div>
      </div>

      {/* Arrow */}
      <div
        className="
          ml-1
          text-lg
          text-white/40
        "
      >
        →
      </div>
    </button>
  );
}

export default OrderBookButton;
