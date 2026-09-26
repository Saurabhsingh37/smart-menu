import { useEffect, useRef } from "react";
import { useOrder } from "../context/OrderContext";

function OrderBookDrawer({
  isOpen,
  onClose,
  onReview,
}) {
  const closeButtonRef = useRef(null);

  const {
    items,
    increaseQty,
    decreaseQty,
    removeItem,
    totalAmount,
    additionalAmount,
    setAdditionalAmount,
    finalTotal,
  } = useOrder();

  // Close with Escape
  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [isOpen, onClose]);

  // Prevent background scrolling
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        originalOverflow;
    };
  }, [isOpen]);

  return (
    <div
      className={`
        fixed
        inset-0
        z-[200]
        transition-opacity
        duration-500
        ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }
      `}
      role="presentation"
      aria-hidden={!isOpen}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close order book"
        onClick={onClose}
        tabIndex={isOpen ? 0 : -1}
        className="
          absolute
          inset-0
          h-full
          w-full
          cursor-default
          bg-black/75
          backdrop-blur-md
        "
      />

      {/* Ambient Glow */}
      <div
        className={`
          pointer-events-none
          absolute
          right-[-120px]
          top-[20%]
          h-[420px]
          w-[420px]
          rounded-full
          bg-orange-500/10
          blur-[100px]
          transition-all
          duration-700
          ${
            isOpen
              ? "scale-100 opacity-100"
              : "scale-75 opacity-0"
          }
        `}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-book-title"
        className={`
          absolute
          right-0
          top-0
          flex
          h-full
          w-full
          max-w-md
          flex-col
          overflow-hidden
          border-l
          border-white/10
          bg-[#100906]/85
          backdrop-blur-3xl
          shadow-[-30px_0_80px_rgba(0,0,0,0.65)]
          transition-transform
          duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]
          ${
            isOpen
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >
        {/* Glass Border */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            rounded-l-[2rem]
            border
            border-white/[0.04]
          "
        />

        {/* Top Line */}
        <div
          className="
            pointer-events-none
            absolute
            left-0
            right-0
            top-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-orange-400/70
            to-transparent
          "
        />

        {/* Header */}
        <div
          className="
            relative
            flex
            items-center
            justify-between
            border-b
            border-white/[0.08]
            bg-white/[0.025]
            px-5
            py-5
          "
        >
          <div>
            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.25em]
                text-orange-400
              "
            >
              Your Selection
            </p>

            <h2
              id="order-book-title"
              className="
                mt-1
                text-2xl
                font-black
                tracking-tight
                text-white
              "
            >
              Order Book
            </h2>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            tabIndex={isOpen ? 0 : -1}
            aria-label="Close order book"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-white/10
              bg-white/[0.04]
              text-xl
              text-white/50
              transition-all
              duration-300
              hover:rotate-90
              hover:border-orange-400/30
              hover:bg-orange-500/10
              hover:text-orange-400
              focus:outline-none
              focus:ring-2
              focus:ring-orange-400
            "
          >
            ×
          </button>
        </div>

        {/* Items */}
        <div
          className="
            relative
            flex-1
            overflow-y-auto
            px-5
            py-5
          "
        >
          {items.length === 0 ? (
            <div
              className="
                flex
                h-full
                flex-col
                items-center
                justify-center
                text-center
              "
            >
              <div
                className="
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-3xl
                  border
                  border-orange-400/20
                  bg-orange-500/10
                  text-4xl
                "
              >
                📖
              </div>

              <h3
                className="
                  mt-5
                  text-lg
                  font-bold
                  text-white
                "
              >
                Your Order Book is empty
              </h3>

              <p
                className="
                  mt-2
                  max-w-xs
                  text-sm
                  leading-6
                  text-white/40
                "
              >
                Add your favourite dishes from the
                menu and they will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/[0.08]
                    bg-white/[0.035]
                    p-3
                    shadow-[0_12px_35px_rgba(0,0,0,0.2)]
                    backdrop-blur-xl
                  "
                  style={{
                    animation: isOpen
                      ? `orderItemIn 500ms cubic-bezier(0.22,1,0.36,1) ${
                          index * 70
                        }ms both`
                      : "none",
                  }}
                >
                  <div className="relative flex gap-3">
                    {/* Image */}
                    <div
                      className="
                        relative
                        h-20
                        w-20
                        shrink-0
                        overflow-hidden
                        rounded-xl
                        border
                        border-white/10
                        bg-black/30
                      "
                    >
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={
                            item.image_alt ||
                            item.name
                          }
                          className="
                            h-full
                            w-full
                            object-cover
                            transition-transform
                            duration-500
                            group-hover:scale-110
                          "
                        />
                      ) : (
                        <div
                          className="
                            flex
                            h-full
                            w-full
                            items-center
                            justify-center
                            text-2xl
                          "
                        >
                          🍽️
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="min-w-0 flex-1">
                      <h3
                        className="
                          truncate
                          text-sm
                          font-bold
                          text-white
                        "
                      >
                        {item.name}
                      </h3>

                      <p
                        className="
                          mt-1
                          text-sm
                          font-bold
                          text-orange-400
                        "
                      >
                        ₹
                        {Number(item.price).toFixed(
                          0
                        )}
                      </p>

                      {/* Quantity */}
                      <div
                        className="
                          mt-3
                          flex
                          items-center
                          justify-between
                        "
                      >
                        <div
                          className="
                            flex
                            items-center
                            overflow-hidden
                            rounded-lg
                            border
                            border-white/10
                            bg-black/30
                          "
                        >
                          <button
                            type="button"
                            onClick={() =>
                              decreaseQty(
                                item.id
                              )
                            }
                            className="
                              flex
                              h-8
                              w-8
                              items-center
                              justify-center
                              text-white/60
                              hover:text-orange-400
                            "
                          >
                            −
                          </button>

                          <span
                            className="
                              flex
                              min-w-8
                              justify-center
                              text-sm
                              font-bold
                              text-white
                            "
                          >
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              increaseQty(
                                item.id
                              )
                            }
                            className="
                              flex
                              h-8
                              w-8
                              items-center
                              justify-center
                              text-white/60
                              hover:text-orange-400
                            "
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            removeItem(item.id)
                          }
                          className="
                            text-xs
                            font-semibold
                            text-white/30
                            hover:text-red-400
                          "
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div
                    className="
                      mt-3
                      flex
                      items-center
                      justify-between
                      border-t
                      border-white/[0.06]
                      pt-3
                    "
                  >
                    <span
                      className="
                        text-xs
                        text-white/30
                      "
                    >
                      Item total
                    </span>

                    <span
                      className="
                        text-sm
                        font-black
                        text-white
                      "
                    >
                      ₹
                      {(
                        Number(item.price) *
                        item.quantity
                      ).toFixed(0)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Summary */}
        {items.length > 0 && (
          <div
            className="
              relative
              border-t
              border-white/[0.08]
              bg-black/30
              px-5
              pb-5
              pt-4
            "
          >
            {/* Items Total */}
            <div
              className="
                flex
                items-center
                justify-between
              "
            >
              <span
                className="
                  text-sm
                  font-semibold
                  text-white/45
                "
              >
                Items Total
              </span>

              <span
                className="
                  text-lg
                  font-bold
                  text-white
                "
              >
                ₹{totalAmount.toFixed(0)}
              </span>
            </div>

            {/* Additional Amount */}
            <div
              className="
                mt-4
                rounded-2xl
                border
                border-white/[0.08]
                bg-white/[0.035]
                p-3
              "
            >
              <label
                htmlFor="additional-amount"
                className="
                  block
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-white/40
                "
              >
                Additional Amount
              </label>

              <div
                className="
                  mt-2
                  flex
                  items-center
                  overflow-hidden
                  rounded-xl
                  border
                  border-white/10
                  bg-black/30
                  focus-within:border-orange-400/40
                "
              >
                <span
                  className="
                    pl-4
                    text-sm
                    font-bold
                    text-orange-400
                  "
                >
                  ₹
                </span>

                <input
                  id="additional-amount"
                  type="number"
                  min="0"
                  step="1"
                  inputMode="numeric"
                  value={additionalAmount}
                  onChange={(event) => {
                    const value =
                      event.target.value;

                    if (
                      value === "" ||
                      Number(value) >= 0
                    ) {
                      setAdditionalAmount(value);
                    }
                  }}
                  placeholder="0"
                  className="
                    w-full
                    bg-transparent
                    px-3
                    py-3
                    text-sm
                    font-bold
                    text-white
                    outline-none
                    placeholder:text-white/20
                  "
                />
              </div>
            </div>

            {/* Final Total */}
            <div
              className="
                my-4
                h-px
                bg-gradient-to-r
                from-transparent
                via-white/10
                to-transparent
              "
            />

            <div
              className="
                flex
                items-center
                justify-between
              "
            >
              <div>
                <p
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-orange-400
                  "
                >
                  Final Total
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    text-white/30
                  "
                >
                  Items + additional amount
                </p>
              </div>

              <span
                className="
                  text-3xl
                  font-black
                  text-orange-400
                "
              >
                ₹{finalTotal.toFixed(0)}
              </span>
            </div>

            {/* Review */}
            <button
              type="button"
              onClick={onReview}
              disabled={items.length === 0}
              className="
                mt-4
                w-full
                rounded-2xl
                border
                border-orange-400/30
                bg-orange-500
                px-5
                py-4
                text-sm
                font-black
                uppercase
                tracking-wider
                text-black
                shadow-[0_12px_35px_rgba(249,115,22,0.18)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-orange-400
                active:scale-[0.98]
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              Review Order
            </button>
          </div>
        )}
      </aside>

      <style>
        {`
          @keyframes orderItemIn {
            from {
              opacity: 0;
              transform: translateX(30px) scale(0.97);
            }

            to {
              opacity: 1;
              transform: translateX(0) scale(1);
            }
          }
        `}
      </style>
    </div>
  );
}

export default OrderBookDrawer;
