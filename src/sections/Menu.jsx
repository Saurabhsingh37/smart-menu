import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabase";
import { useOrder } from "../context/OrderContext";

const ITEMS_PER_PAGE = 4;

/* =====================================================
   PLACEHOLDER CARD
===================================================== */

function MenuPlaceholder() {
  return (
    <div
      className="
        group
        relative
        flex
        h-full
        min-h-[200px]
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-white/[0.08]
        bg-white/[0.025]
        shadow-lg
        shadow-black/10
        sm:min-h-[200px]
      "
    >
      {/* Crystal / glass atmosphere */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="
            absolute
            -left-10
            -top-10
            h-28
            w-28
            rounded-full
            bg-orange-500/[0.06]
            blur-3xl
            transition-all
            duration-700
            group-hover:bg-orange-500/[0.12]
          "
        />

        <div
          className="
            absolute
            -bottom-10
            -right-10
            h-28
            w-28
            rounded-full
            bg-white/[0.04]
            blur-3xl
          "
        />
      </div>

      {/* Placeholder image area */}
      <div
        className="
          relative
          flex
          min-h-[80px]
          flex-1
          items-center
          justify-center
          sm:min-h-[115px]
        "
      >
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-white/[0.03]
            text-xl
            text-white/20
          "
        >
          🍽️
        </div>
      </div>

      {/* Placeholder content */}
      <div className="relative space-y-3 p-3">
        <div className="h-3 w-16 rounded-full bg-white/[0.06]" />

        <div className="h-4 w-3/4 rounded-full bg-white/[0.06]" />

        <div className="h-3 w-1/2 rounded-full bg-white/[0.04]" />

        <div className="flex items-center justify-between pt-2">
          <div className="h-4 w-16 rounded-full bg-white/[0.06]" />

          <div className="h-9 w-9 rounded-full bg-white/[0.06]" />
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   MENU COMPONENT
===================================================== */

function Menu() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [items, setItems] = useState([]);

  const [loadingCategories, setLoadingCategories] =
    useState(true);

  const [loadingItems, setLoadingItems] =
    useState(false);

  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  /* =====================================================
     ORDER BOOK
  ====================================================== */

  const { addItem } = useOrder();

  /* =====================================================
     SWIPE REFERENCES
  ====================================================== */

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  /* =====================================================
     LOAD CATEGORIES
  ====================================================== */

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoadingCategories(true);
    setError("");

    const {
      data,
      error: categoriesError,
    } = await supabase
      .from("menu_categories")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", {
        ascending: true,
      });

    if (categoriesError) {
      console.error(
        "Category loading error:",
        categoriesError
      );

      setError(
        "Unable to load menu categories."
      );

      setLoadingCategories(false);
      return;
    }

    const loadedCategories = data || [];

    setCategories(loadedCategories);

    if (loadedCategories.length > 0) {
      setSelectedCategory(
        loadedCategories[0]
      );
    }

    setLoadingCategories(false);
  };

  /* =====================================================
     LOAD ITEMS WHEN CATEGORY CHANGES
  ====================================================== */

  useEffect(() => {
    if (!selectedCategory?.id) {
      setItems([]);
      return;
    }

    fetchMenuItems(selectedCategory.id);
  }, [selectedCategory]);

  const fetchMenuItems = async (categoryId) => {
    setLoadingItems(true);
    setError("");

    const {
      data,
      error: itemsError,
    } = await supabase
      .from("menu_items")
      .select(`
        id,
        category_id,
        name,
        slug,
        description,
        ingredients,
        price,
        image_url,
        image_alt,
        spice_level,
        is_popular,
        is_featured,
        is_available,
        sort_order
      `)
      .eq("category_id", categoryId)
      .eq("is_available", true)
      .order("sort_order", {
        ascending: true,
      });

    if (itemsError) {
      console.error(
        "Menu item loading error:",
        itemsError
      );

      setError(
        "Unable to load menu items."
      );

      setItems([]);
      setLoadingItems(false);

      return;
    }

    setItems(data || []);

    setCurrentPage(1);

    setLoadingItems(false);
  };

  /* =====================================================
     SPICE LABEL
  ====================================================== */

  const getSpiceLabel = (level) => {
    if (level === 0) return "Mild";
    if (level === 1) return "Medium";
    if (level === 2) return "Hot";
    if (level === 3) return "Very Hot";

    return "Mild";
  };

  /* =====================================================
     PAGINATION
  ====================================================== */

  const totalPages = Math.ceil(
    items.length / ITEMS_PER_PAGE
  );

  const startIndex =
    (currentPage - 1) *
    ITEMS_PER_PAGE;

  const visibleItems = items.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const placeholderCount = Math.max(
    0,
    ITEMS_PER_PAGE - visibleItems.length
  );

  /* =====================================================
     PREVIOUS PAGE
  ====================================================== */

  const goToPreviousPage = () => {
    setCurrentPage((page) =>
      Math.max(1, page - 1)
    );
  };

  /* =====================================================
     NEXT PAGE
  ====================================================== */

  const goToNextPage = () => {
    setCurrentPage((page) =>
      Math.min(totalPages, page + 1)
    );
  };

  /* =====================================================
     SWIPE START
  ====================================================== */

  const handleTouchStart = (e) => {
    touchStartX.current =
      e.touches[0].clientX;

    touchEndX.current =
      e.touches[0].clientX;
  };

  /* =====================================================
     SWIPE MOVE
  ====================================================== */

  const handleTouchMove = (e) => {
    touchEndX.current =
      e.touches[0].clientX;
  };

  /* =====================================================
     SWIPE END
  ====================================================== */

  const handleTouchEnd = () => {
    const swipeDistance =
      touchStartX.current -
      touchEndX.current;

    const minimumSwipeDistance = 50;

    // Swipe LEFT → NEXT
    if (
      swipeDistance >
        minimumSwipeDistance &&
      currentPage < totalPages
    ) {
      goToNextPage();
    }

    // Swipe RIGHT → PREVIOUS
    if (
      swipeDistance <
        -minimumSwipeDistance &&
      currentPage > 1
    ) {
      goToPreviousPage();
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  /* =====================================================
     CATEGORY LOADING
  ====================================================== */

  if (loadingCategories) {
    return (
      <section
        id="menu"
        className="
          relative
          bg-transparent
          px-4
          py-20
          text-white
          sm:px-6
          lg:px-8
        "
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-4">
            {Array.from({
              length: ITEMS_PER_PAGE,
            }).map((_, index) => (
              <MenuPlaceholder
                key={index}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="menu"
      className="
        relative
        bg-transparent
        px-4
        py-10
        text-white
        sm:px-6
        lg:px-8
      "
    >
      <div className="mx-auto max-w-7xl">

        {/* =====================================================
            SECTION HEADER
        ====================================================== */}

        <div className="mx-auto mb-8 max-w-3xl text-center">

          <p
            className="
              mb-3
              text-xs
              font-semibold
              uppercase
              tracking-[0.3em]
              text-orange-500
              sm:text-sm
            "
          >
            Fresh • Hot • Delicious
          </p>

          <div
            className="
              mx-auto
              inline-flex
              rounded-2xl
              border
              border-orange-400/20
              bg-orange-500/[0.06]
              px-5
              py-3
              shadow-[0_0_35px_rgba(249,115,22,0.08)]
              backdrop-blur-md
              sm:px-7
              sm:py-4
            "
          >
            <h2
              className="
                text-3xl
                font-black
                uppercase
                tracking-tight
                text-white
                sm:text-4xl
                md:text-5xl
              "
            >
              Explore Our Menu
            </h2>
          </div>

          <p
            className="
              mx-auto
              mt-4
              max-w-2xl
              text-sm
              leading-6
              text-white/50
              sm:text-base
            "
          >
            Discover our freshly prepared
            vegetarian favourites, made with
            authentic flavours and served with
            passion.
          </p>

          {/* Animated arrow */}
          <div className="mt-5 flex justify-center">
            <div
              className="
                animate-bounce
                text-lg
                text-orange-500/70
              "
            >
              ↓
            </div>
          </div>

        </div>

        {/* =====================================================
            CATEGORY NAVIGATION
        ====================================================== */}

        {categories.length > 0 && (
          <div
            className="
              mb-8
              overflow-x-auto
              pb-2
              scrollbar-none
            "
          >
            <div
              className="
                flex
                min-w-max
                gap-3
                px-1
              "
            >
              {categories.map(
                (category) => {
                  const isSelected =
                    selectedCategory?.id ===
                    category.id;

                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(
                          category
                        );

                        setCurrentPage(1);
                      }}
                      className={`
                        shrink-0
                        rounded-full
                        border
                        px-5
                        py-3
                        text-xs
                        font-bold
                        uppercase
                        tracking-[0.08em]
                        transition-all
                        duration-300
                        ${
                          isSelected
                            ? `
                              border-orange-400/60
                              bg-orange-500
                              text-white
                              shadow-[0_0_25px_rgba(249,115,22,0.25)]
                              ring-1
                              ring-orange-400/30
                            `
                            : `
                              border-white/[0.08]
                              bg-white/[0.035]
                              text-white/60
                              backdrop-blur-md
                              hover:border-orange-400/30
                              hover:bg-orange-500/[0.08]
                              hover:text-orange-300
                            `
                        }
                      `}
                    >
                      {category.name}
                    </button>
                  );
                }
              )}
            </div>
          </div>
        )}

        {/* =====================================================
            ERROR
        ====================================================== */}

        {error && (
          <div
            className="
              mb-6
              rounded-2xl
              border
              border-red-500/20
              bg-red-500/[0.08]
              px-4
              py-4
              text-center
              text-sm
              text-red-300
            "
          >
            {error}
          </div>
        )}

        {/* =====================================================
            SELECTED CATEGORY HEADER
        ====================================================== */}

        {selectedCategory && (
          <div
            className="
              mb-5
              flex
              items-end
              justify-between
              gap-4
            "
          >
            <div>
              <p
                className="
                  mb-1
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.25em]
                  text-orange-500
                "
              >
                Selected Category
              </p>

              <h3
                className="
                  text-1xl
                  font-black
                  uppercase
                  tracking-wide
                  text-white
                  sm:text-13xl
                "
              >
                {selectedCategory.name}
              </h3>
            </div>

            {/* Page counter */}
            {!loadingItems &&
              totalPages > 0 && (
                <div
                  className="
                    shrink-0
                    rounded-full
                    border
                    border-white/[0.08]
                    bg-white/[0.03]
                    px-3
                    py-1.5
                    text-xs
                    font-semibold
                    text-white/50
                    backdrop-blur-md
                  "
                >
                  {currentPage} /{" "}
                  {totalPages}
                </div>
              )}
          </div>
        )}

        {/* =====================================================
            MENU AREA
            2 × 2 GRID
            TOUCH SWIPE ENABLED
        ====================================================== */}

        {loadingItems ? (
          <div
            className="
              grid
              grid-cols-2
              gap-4
            "
          >
            {Array.from({
              length: ITEMS_PER_PAGE,
            }).map((_, index) => (
              <MenuPlaceholder
                key={index}
              />
            ))}
          </div>
        ) : (
          <div
            className="
              grid
              grid-cols-2
              gap-4
              touch-pan-y
              select-none
            "
            onTouchStart={
              handleTouchStart
            }
            onTouchMove={
              handleTouchMove
            }
            onTouchEnd={
              handleTouchEnd
            }
          >

            {/* =================================================
                REAL MENU ITEMS
            ================================================== */}

            {visibleItems.map(
              (item) => (
                <article
                  key={item.id}
                  className="
                    group
                    flex
                    h-full
                    min-h-[230px]
                    flex-col
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/[0.08]
                    bg-white/[0.035]
                    shadow-lg
                    shadow-black/10
                    backdrop-blur-md
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-orange-400/25
                    hover:bg-white/[0.05]
                    sm:min-h-[285px]
                  "
                >

                  {/* =========================================
                      IMAGE
                  ========================================== */}

                  <div
                    className="
                      relative
                      aspect-[4/3]
                      shrink-0
                      overflow-hidden
                      bg-black/20
                    "
                  >

                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={
                          item.image_alt ||
                          item.name
                        }
                        draggable="false"
                        onContextMenu={(e) =>
                          e.preventDefault()
                        }
                        className="
                          h-full
                          w-full
                          select-none
                          object-cover
                          transition-transform
                          duration-500
                          group-hover:scale-105
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
                          bg-white/[0.025]
                          text-4xl
                          text-white/20
                        "
                      >
                        🍽️
                      </div>
                    )}

                    {/* Dark image gradient */}
                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-x-0
                        bottom-0
                        h-1/2
                        bg-gradient-to-t
                        from-black/50
                        to-transparent
                      "
                    />

                    {/* =====================================
                        SPICE BADGE
                    ====================================== */}

                    {item.spice_level > 0 && (
                      <div
                        className="
                          absolute
                          left-2
                          top-2
                          rounded-full
                          border
                          border-orange-400/20
                          bg-black/55
                          px-2
                          py-1
                          text-[9px]
                          font-semibold
                          text-orange-300
                          backdrop-blur-md
                          sm:text-[10px]
                        "
                      >
                        🌶️{" "}
                        {getSpiceLabel(
                          item.spice_level
                        )}
                      </div>
                    )}

                    {/* =====================================
                        POPULAR BADGE
                    ====================================== */}

                    {item.is_popular && (
                      <div
                        className="
                          absolute
                          right-2
                          top-2
                          rounded-full
                          bg-orange-500
                          px-2
                          py-1
                          text-[9px]
                          font-bold
                          text-black
                          shadow-lg
                          shadow-orange-500/20
                          sm:text-[10px]
                        "
                      >
                        🔥 Popular
                      </div>
                    )}

                  </div>

                  {/* =========================================
                      CARD CONTENT
                  ========================================== */}

                  <div
                    className="
                      flex
                      flex-1
                      flex-col
                      p-3
                    "
                  >

                    {/* Name */}
                    <h4
                      className="
                        line-clamp-2
                        text-sm
                        font-bold
                        leading-5
                        text-white
                        sm:text-base
                      "
                    >
                      {item.name}
                    </h4>

                    {/* Description */}
                    {item.description ? (
                      <p
                        className="
                          mt-1.5
                          line-clamp-2
                          text-[10px]
                          leading-4
                          text-white/40
                          sm:text-xs
                        "
                      >
                        {item.description}
                      </p>
                    ) : (
                      <div className="h-4" />
                    )}

                    {/* =====================================
                        PRICE + PLUS
                    ====================================== */}

                    <div
                      className="
                        mt-auto
                        flex
                        items-center
                        justify-between
                        gap-2
                        pt-1
                      "
                    >

                      <span
                        className="
                          text-sm
                          font-black
                          text-orange-400
                          sm:text-base
                        "
                      >
                        ₹
                        {Number(
                          item.price
                        ).toFixed(0)}
                      </span>

                      {/* Add to Order Book */}
                      <button
                        type="button"
                        aria-label={`Add ${item.name}`}
                        onClick={() => {
                          addItem(item);
                        }}
                        className="
                          flex
                          h-8
                          w-8
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-orange-500
                          text-lg
                          font-bold
                          leading-none
                          text-black
                          shadow-lg
                          shadow-orange-500/20
                          transition-all
                          duration-200
                          hover:scale-110
                          hover:bg-orange-400
                          active:scale-95
                          sm:h-9
                          sm:w-9
                        "
                      >
                        +
                      </button>

                    </div>

                  </div>
                </article>
              )
            )}

            {/* =================================================
                FILL REMAINING SPACES
            ================================================== */}

            {Array.from({
              length: placeholderCount,
            }).map((_, index) => (
              <MenuPlaceholder
                key={`placeholder-${index}`}
              />
            ))}

          </div>
        )}

        {/* =====================================================
            EMPTY CATEGORY
        ====================================================== */}

        {!loadingItems &&
          items.length === 0 && (
            <div
              className="
                rounded-2xl
                border
                border-dashed
                border-white/[0.10]
                bg-white/[0.025]
                px-6
                py-12
                text-center
              "
            >
              <div className="mb-3 text-4xl">
                🍽️
              </div>

              <h4
                className="
                  text-lg
                  font-bold
                  text-white
                "
              >
                No items available
              </h4>

              <p
                className="
                  mt-2
                  text-sm
                  text-white/40
                "
              >
                More delicious items are
                coming soon.
              </p>
            </div>
          )}

        {/* =====================================================
            PAGINATION / SWIPE CONTROLS
        ====================================================== */}

        {!loadingItems &&
          items.length > ITEMS_PER_PAGE && (
            <div
              className="
                mt-7
                flex
                items-center
                justify-center
                gap-4
              "
            >

              {/* Previous */}
              <button
                type="button"
                onClick={
                  goToPreviousPage
                }
                disabled={
                  currentPage === 1
                }
                aria-label="Previous menu items"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.035]
                  text-lg
                  text-white/60
                  backdrop-blur-md
                  transition
                  hover:border-orange-400/30
                  hover:bg-orange-500/[0.08]
                  hover:text-orange-300
                  disabled:cursor-not-allowed
                  disabled:opacity-25
                "
              >
                ←
              </button>

              {/* Page dots */}
              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                {Array.from({
                  length: totalPages,
                }).map((_, index) => {
                  const page =
                    index + 1;

                  return (
                    <button
                      key={page}
                      type="button"
                      onClick={() =>
                        setCurrentPage(
                          page
                        )
                      }
                      aria-label={`Go to page ${page}`}
                      className={`
                        h-2
                        rounded-full
                        transition-all
                        duration-300
                        ${
                          currentPage ===
                          page
                            ? "w-6 bg-orange-500"
                            : "w-2 bg-white/20"
                        }
                      `}
                    />
                  );
                })}
              </div>

              {/* Next */}
              <button
                type="button"
                onClick={
                  goToNextPage
                }
                disabled={
                  currentPage ===
                  totalPages
                }
                aria-label="Next menu items"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.035]
                  text-lg
                  text-white/60
                  backdrop-blur-md
                  transition
                  hover:border-orange-400/30
                  hover:bg-orange-500/[0.08]
                  hover:text-orange-300
                  disabled:cursor-not-allowed
                  disabled:opacity-25
                "
              >
                →
              </button>

            </div>
          )}

        {/* Swipe hint on mobile */}
        {!loadingItems &&
          items.length > ITEMS_PER_PAGE && (
            <p
              className="
                mt-3
                text-center
                text-[10px]
                uppercase
                tracking-[0.18em]
                text-white/25
                sm:hidden
              "
            >
              Swipe left or right to
              explore
            </p>
          )}

      </div>
    </section>
  );
}

export default Menu;
