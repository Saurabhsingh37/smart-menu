import { useEffect, useRef } from "react";
import { useOrder } from "../context/OrderContext";

function ReviewOrder({ isOpen, onBack }) {
  const backButtonRef = useRef(null);

  const {
    items,
    totalAmount,
    additionalAmount,
    finalTotal,
  } = useOrder();

  useEffect(() => {
    if (!isOpen) return;

    backButtonRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onBack();
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
  }, [isOpen, onBack]);

  if (!isOpen) {
    return null;
  }

  // WhatsApp
  const sendToWhatsApp = () => {
    const orderLines = items
      .map((item, index) => {
        const itemTotal =
          Number(item.price) * item.quantity;

        return `${index + 1}. ${item.name}
   Qty: ${item.quantity} × ₹${Number(
          item.price
        ).toFixed(0)} = ₹${itemTotal.toFixed(0)}`;
      })
      .join("\n\n");

    const message = `🔥 HOT & SPICE
Order Request

────────────────
${orderLines}

────────────────
Items Total: ₹${totalAmount.toFixed(0)}
Additional Amount: ₹${Number(
      additionalAmount || 0
    ).toFixed(0)}
FINAL TOTAL: ₹${finalTotal.toFixed(0)}
────────────────

Please prepare this order.
Thank you! 🙏`;

    const whatsappUrl =
      `https://wa.me/918979190850?text=${encodeURIComponent(
        message
      )}`;

    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-[300]
        overflow-y-auto
        bg-[#100906]
        px-4
        py-6
        sm:px-6
        sm:py-10
      "
    >
      {/* Ambient Glow */}
      <div
        className="
          pointer-events-none
          fixed
          left-1/2
          top-1/2
          h-[500px]
          w-[500px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-orange-500/10
          blur-[120px]
        "
      />

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-md
        "
      >
        {/* Header */}
        <div
          className="
            mb-5
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
                tracking-[0.25em]
                text-orange-400
              "
            >
              Final Check
            </p>

            <h1
              className="
                mt-1
                text-2xl
                font-black
                tracking-tight
                text-white
              "
            >
              Review Order
            </h1>
          </div>

          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              border
              border-orange-400/20
              bg-orange-500/10
              text-xl
            "
          >
            🧾
          </div>
        </div>

        {/* =========================
            RESTAURANT SLIP
        ========================= */}
        <div
          className="
            relative
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-[#f8f4ed]
            text-black
            shadow-[0_30px_80px_rgba(0,0,0,0.45)]
          "
        >
          {/* Orange Top */}
          <div className="h-1.5 bg-orange-500" />

          {/* Restaurant Header */}
          <div
            className="
              px-6
              pb-5
              pt-7
              text-center
            "
          >
            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.3em]
                text-orange-600
              "
            >
              Pure Vegetarian Restaurant
            </p>

            <h2
              className="
                mt-2
                text-3xl
                font-black
                tracking-[0.08em]
              "
            >
              HOT & SPICE
            </h2>

            <p
              className="
                mt-1
                text-xs
                text-black/45
              "
            >
              Haridwar
            </p>

            <div
              className="
                mt-5
                border-t
                border-dashed
                border-black/15
              "
            />
          </div>

          {/* Items */}
          <div className="px-6">
            {items.map((item, index) => {
              const itemTotal =
                Number(item.price) *
                item.quantity;

              return (
                <div
                  key={item.id}
                  className="
                    mb-4
                    flex
                    items-start
                    justify-between
                    gap-4
                  "
                >
                  <div className="min-w-0">
                    <div className="flex gap-2">
                      <span
                        className="
                          text-xs
                          font-bold
                          text-black/35
                        "
                      >
                        {index + 1}.
                      </span>

                      <div>
                        <p
                          className="
                            text-sm
                            font-bold
                            leading-5
                          "
                        >
                          {item.name}
                        </p>

                        <p
                          className="
                            mt-0.5
                            text-xs
                            text-black/45
                          "
                        >
                          {item.quantity} × ₹
                          {Number(
                            item.price
                          ).toFixed(0)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <span
                    className="
                      shrink-0
                      text-sm
                      font-black
                    "
                  >
                    ₹{itemTotal.toFixed(0)}
                  </span>
                </div>
              );
            })}

            {/* Divider */}
            <div
              className="
                my-6
                border-t
                border-dashed
                border-black/15
              "
            />

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
                  text-black/50
                "
              >
                Items Total
              </span>

              <span
                className="
                  text-lg
                  font-black
                "
              >
                ₹{totalAmount.toFixed(0)}
              </span>
            </div>

            {/* Additional Amount */}
            <div
              className="
                mt-3
                flex
                items-center
                justify-between
              "
            >
              <span
                className="
                  text-sm
                  text-black/50
                "
              >
                Additional Amount
              </span>

              <span
                className="
                  text-sm
                  font-bold
                "
              >
                ₹
                {Number(
                  additionalAmount || 0
                ).toFixed(0)}
              </span>
            </div>

            {/* Total Divider */}
            <div
              className="
                my-5
                border-t-2
                border-dashed
                border-black/20
              "
            />

            {/* Final Total */}
            <div
              className="
                flex
                items-end
                justify-between
                pb-7
              "
            >
              <div>
                <p
                  className="
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.2em]
                    text-orange-600
                  "
                >
                  Final Total
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    text-black/40
                  "
                >
                  Items + additional amount
                </p>
              </div>

              <span
                className="
                  text-3xl
                  font-black
                  tracking-tight
                  text-orange-600
                "
              >
                ₹{finalTotal.toFixed(0)}
              </span>
            </div>
          </div>

          {/* Receipt Bottom */}
          <div
            className="
              h-3
              bg-[radial-gradient(circle_at_6px_0,transparent_6px,#f8f4ed_6.5px)]
              bg-[length:12px_12px]
              rotate-180
            "
          />
        </div>

        {/* Buttons */}
        <div className="mt-5 space-y-3">
          {/* Edit */}
          <button
            ref={backButtonRef}
            type="button"
            onClick={onBack}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-2xl
              border
              border-white/10
              bg-white/[0.05]
              px-5
              py-4
              text-sm
              font-bold
              text-white
              backdrop-blur-xl
              transition-all
              duration-300
              hover:border-orange-400/30
              hover:bg-white/[0.08]
              active:scale-[0.98]
              focus:outline-none
              focus:ring-2
              focus:ring-orange-400
            "
          >
            <span className="text-lg">
              ✏️
            </span>

            Edit Order
          </button>

          {/* WhatsApp */}
          <button
            type="button"
            onClick={sendToWhatsApp}
            disabled={items.length === 0}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-3
              rounded-2xl
              border
              border-green-400/30
              bg-green-500
              px-5
              py-4
              text-sm
              font-black
              uppercase
              tracking-wider
              text-white
              shadow-[0_12px_35px_rgba(34,197,94,0.2)]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-green-400
              active:scale-[0.98]
              disabled:cursor-not-allowed
              disabled:opacity-40
              focus:outline-none
              focus:ring-2
              focus:ring-green-300
            "
          >
            <span className="text-xl">
              💬
            </span>

            Send on WhatsApp
          </button>
        </div>

        <p
          className="
            mt-4
            text-center
            text-[10px]
            leading-5
            text-white/25
          "
        >
          Please review your order before sending it
          to HOT & SPICE.
        </p>
      </div>
    </div>
  );
}

export default ReviewOrder;
