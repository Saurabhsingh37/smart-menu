import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import { useOrder } from "../context/OrderContext";

const ITEMS_PER_PAGE = 4;
const AUTO_CHANGE_TIME = 5000;

/* =====================================================
   PLACEHOLDER CARD
===================================================== */

function SpecialPlaceholder() {
  return (
    <div
      className="
        relative
        flex
        min-h-[230px]
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-white/[0.08]
        bg-white/[0.025]
        shadow-lg
        shadow-black/10
        sm:min-h-[285px]
      "
    >
      <div
        className="
          flex
          aspect-[4/3]
          items-center
          justify-center
          bg-white/[0.025]
        "
      >
        <div
          className="
            h-12
            w-12
            animate-pulse
            rounded-full
            border
            border-white/10
            bg-white/[0.04]
          "
        />
      </div>

      <div className="space-y-3 p-3">
        <div className="h-3 w-16 animate-pulse rounded-full bg-white/[0.06]" />

        <div className="h-4 w-3/4 animate-pulse rounded-full bg-white/[0.06]" />

        <div className="h-3 w-1/2 animate-pulse rounded-full bg-white/[0.04]" />

        <div className="flex justify-between pt-3">
          <div className="h-4 w-16 animate-pulse rounded-full bg-white/[0.06]" />
          <div className="h-9 w-9 animate-pulse rounded-full bg-white/[0.06]" />
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   TODAY SPECIAL
===================================================== */

function TodaySpecial() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  const { addItem } = useOrder();

  /* =====================================================
     LOAD ALL AVAILABLE ITEMS
  ====================================================== */

  useEffect(() => {
    fetchTodaySpecialItems();
  }, []);

  const fetchTodaySpecialItems = async () => {
    setLoading(true);
    setError("");

    try {
      /* ===============================================
         LOAD CATEGORIES
      =============================================== */

      const {
        data: categoryData,
        error: categoryError,
      } = await supabase
        .from("menu_categories")
        .select(`
          id,
          name
        `)
        .eq("is_active", true);

      if (categoryError) {
        console.error(
          "Today Special category error:",
          categoryError
        );

        throw categoryError;
      }

      /* ===============================================
         LOAD ALL AVAILABLE MENU ITEMS
      =============================================== */

      const {
        data: itemData,
        error: itemError,
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
        .eq("is_available", true)
        .order("sort_order", {
          ascending: true,
        });

      if (itemError) {
        console.error(
          "Today Special item error:",
          itemError
        );

        throw itemError;
      }

      setCategories(categoryData || []);
      setItems(itemData || []);
      setCurrentPage(0);
    } catch (err) {
      console.error(
        "Today Special loading error:",
        err
      );

      setError(
        "Unable to load today's special menu."
      );

      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     CATEGORY NAME
  ====================================================== */

  const categoryMap = useMemo(() => {
    return categories.reduce(
      (map, category) => {
        map[category.id] = category.name;
        return map;
      },
      {}
    );
  }, [categories]);

  /* =====================================================
     TOTAL PAGES
  ====================================================== */

  const totalPages = Math.ceil(
    items.length / ITEMS_PER_PAGE
  );

  /* =====================================================
     CURRENT 4 ITEMS
  ====================================================== */

  const visibleItems = useMemo(() => {
    const startIndex =
      currentPage * ITEMS_PER_PAGE;

    return items.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [items, currentPage]);

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
     AUTOMATIC MAGIC CHANGE
  ====================================================== */

  useEffect(() => {
    if (totalPages <= 1) {
      return;
    }

    const timer = setInterval(() => {
      /* Start transition */

      setIsChanging(true);

      /* Change page after fade-out starts */

      setTimeout(() => {
        setCurrentPage((page) => {
          if (page >= totalPages - 1) {
            return 0;
          }

          return page + 1;
        });

        setIsChanging(false);
      }, 450);
    }, AUTO_CHANGE_TIME);

    return () => {
      clearInterval(timer);
    };
  }, [totalPages]);

  /* =====================================================
     MANUAL PAGE CHANGE
  ====================================================== */

  const changePage = (page) => {
    if (page === currentPage) {
      return;
    }

    setIsChanging(true);

    setTimeout(() => {
      setCurrentPage(page);
      setIsChanging(false);
    }, 300);
  };

  /* =====================================================
     LOADING
  ====================================================== */

  if (loading) {
    return (
      <section
        className="
          relative
          bg-transparent
          px-4
          py-16
          text-white
          sm:px-6
          lg:px-8
        "
      >
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto mb-8 max-w-3xl text-center">
            <p
              className="
                mb-3
                text-xs
                font-semibold
                uppercase
                tracking-[0.3em]
                text-orange-500
              "
            >
              Handpicked For You
            </p>

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
              Today Special
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {Array.from({
              length: ITEMS_PER_PAGE,
            }).map((_, index) => (
              <SpecialPlaceholder
                key={index}
              />
            ))}
          </div>

        </div>
      </section>
    );
  }

  /* =====================================================
     ERROR
  ====================================================== */

  if (error) {
    return (
      <section
        className="
          relative
          bg-transparent
          px-4
          py-16
          text-white
          sm:px-6
          lg:px-8
        "
      >
        <div className="mx-auto max-w-7xl">
          <div
            className="
              rounded-2xl
              border
              border-red-500/20
              bg-red-500/[0.06]
              px-5
              py-8
              text-center
              text-sm
              text-red-300
            "
          >
            {error}
          </div>
        </div>
      </section>
    );
  }

  /* =====================================================
     EMPTY
  ====================================================== */

  if (items.length === 0) {
    return null;
  }

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-transparent
        px-4
        py-16
        text-white
        sm:px-6
        lg:px-8
      "
    >
      <div className="mx-auto max-w-7xl">

        {/* =================================================
            SECTION HEADER
        ================================================== */}

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
            ✦ Handpicked From Our Menu ✦
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
              shadow-[0_0_40px_rgba(249,115,22,0.08)]
              backdrop-blur-md
              sm:px-7
              sm:py-4
            "
          >
            <h2
              className="
              text-1xl
              font-black
              uppercase
              tracking-[0.08em]
              text-white
              sm:text-40xl
              sm:tracking-[0.10em]
              md:text-5xl
              md:tracking-[0.11em]
            "
            >
              Today Special
            </h2>
          </div>

          <p
            className="
              mx-auto
              mt-4
              max-w-2xl
              text-sm
              leading-6
              text-white/45
              sm:text-base
            "
          >
            A magical rotation of delicious
            vegetarian favourites from our menu.
          </p>

        </div>

        {/* =================================================
            CARDS
        ================================================== */}

        <div
          className={`
            grid
            grid-cols-2
            gap-4
            transition-all
            duration-500
            ease-out
            ${
              isChanging
                ? "scale-[0.985] opacity-0 blur-[2px]"
                : "scale-100 opacity-100 blur-0"
            }
          `}
        >

          {visibleItems.map(
            (item, index) => (
              <article
                key={item.id}
                className="
                  group
                  flex
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
                  duration-500
                  hover:-translate-y-1
                  hover:border-orange-400/25
                  hover:bg-white/[0.05]
                  sm:min-h-[285px]
                "
                style={{
                  transitionDelay: `${index * 70}ms`,
                }}
              >

                {/* =======================================
                    IMAGE
                ======================================== */}

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
                        duration-700
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

                  {/* Image gradient */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-x-0
                      bottom-0
                      h-1/2
                      bg-gradient-to-t
                      from-black/60
                      to-transparent
                    "
                  />

                  {/* =====================================
                      CATEGORY
                  ====================================== */}

                  <div
                    className="
                      absolute
                      bottom-2
                      left-2
                      max-w-[75%]
                      truncate
                      rounded-full
                      border
                      border-white/10
                      bg-black/55
                      px-2
                      py-1
                      text-[9px]
                      font-semibold
                      text-white/70
                      backdrop-blur-md
                      sm:text-[10px]
                    "
                  >
                    {categoryMap[item.category_id] ||
                      "Menu"}
                  </div>

                  {/* =====================================
                      SPICE
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
                      POPULAR
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

                {/* =======================================
                    CONTENT
                ======================================== */}

                <div
                  className="
                    flex
                    flex-1
                    flex-col
                    p-3
                  "
                >

                  <h3
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
                  </h3>

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

                  {/* PRICE + ADD */}

                  <div
                    className="
                      mt-auto
                      flex
                      items-center
                      justify-between
                      gap-2
                      pt-2
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

                    <button
                      type="button"
                      aria-label={`Add ${item.name}`}
                      onClick={() =>
                        addItem(item)
                      }
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

          {/* Fill empty spaces on final page */}

          {Array.from({
            length:
              ITEMS_PER_PAGE -
              visibleItems.length,
          }).map((_, index) => (
            <SpecialPlaceholder
              key={`empty-${index}`}
            />
          ))}

        </div>

        {/* =================================================
            PAGE INDICATORS
        ================================================== */}

        {totalPages > 1 && (
          <div
            className="
              mt-7
              flex
              items-center
              justify-center
              gap-3
            "
          >

            <button
              type="button"
              onClick={() =>
                changePage(
                  currentPage === 0
                    ? totalPages - 1
                    : currentPage - 1
                )
              }
              aria-label="Previous special items"
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                bg-white/[0.035]
                text-sm
                text-white/60
                backdrop-blur-md
                transition
                hover:border-orange-400/30
                hover:bg-orange-500/[0.08]
                hover:text-orange-300
              "
            >
              ←
            </button>

            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              {Array.from({
                length: totalPages,
              }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() =>
                    changePage(index)
                  }
                  aria-label={`Show special page ${
                    index + 1
                  }`}
                  className={`
                    h-2
                    rounded-full
                    transition-all
                    duration-300
                    ${
                      currentPage === index
                        ? "w-7 bg-orange-500"
                        : "w-2 bg-white/20"
                    }
                  `}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() =>
                changePage(
                  currentPage >=
                    totalPages - 1
                    ? 0
                    : currentPage + 1
                )
              }
              aria-label="Next special items"
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                bg-white/[0.035]
                text-sm
                text-white/60
                backdrop-blur-md
                transition
                hover:border-orange-400/30
                hover:bg-orange-500/[0.08]
                hover:text-orange-300
              "
            >
              →
            </button>

          </div>
        )}

        {/* Auto rotation hint */}

        {totalPages > 1 && (
          <p
            className="
              mt-3
              text-center
              text-[9px]
              uppercase
              tracking-[0.2em]
              text-white/20
            "
          >
            ✦ Automatically changing favourites ✦
          </p>
        )}

      </div>
    </section>
  );
}

export default TodaySpecial;
