import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const IMAGES_PER_PAGE = 16;
const AUTO_CHANGE_TIME = 5000;

/* =====================================================
   GALLERY PLACEHOLDER
===================================================== */

function GalleryPlaceholder() {
  return (
    <div
      className="
        aspect-square
        overflow-hidden
        rounded-xl
        border
        border-white/[0.08]
        bg-white/[0.025]
        shadow-lg
        shadow-black/10
      "
    >
      <div
        className="
          h-full
          w-full
          animate-pulse
          bg-white/[0.04]
        "
      />
    </div>
  );
}

/* =====================================================
   GALLERY
===================================================== */

function Gallery() {
  const [images, setImages] = useState([]);

  const [currentPage, setCurrentPage] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [isChanging, setIsChanging] =
    useState(false);

  /* =====================================================
     LOAD ALL AVAILABLE MENU IMAGES
  ====================================================== */

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    setLoading(true);
    setError("");

    const {
      data,
      error: galleryError,
    } = await supabase
      .from("menu_items")
      .select(`
        id,
        name,
        image_url,
        image_alt,
        sort_order
      `)
      .eq("is_available", true)
      .not("image_url", "is", null)
      .order("sort_order", {
        ascending: true,
      });

    if (galleryError) {
      console.error(
        "Gallery loading error:",
        galleryError
      );

      setError(
        "Unable to load gallery images."
      );

      setImages([]);
      setLoading(false);

      return;
    }

    const validImages = (data || []).filter(
      (item) => item.image_url
    );

    setImages(validImages);
    setCurrentPage(0);
    setLoading(false);
  };

  /* =====================================================
     TOTAL PAGES
  ====================================================== */

  const totalPages = Math.ceil(
    images.length / IMAGES_PER_PAGE
  );

  /* =====================================================
     CURRENT IMAGES
  ====================================================== */

  const startIndex =
    currentPage * IMAGES_PER_PAGE;

  const visibleImages = images.slice(
    startIndex,
    startIndex + IMAGES_PER_PAGE
  );

  /* =====================================================
     AUTOMATIC MAGICAL CHANGE
  ====================================================== */

  useEffect(() => {
    if (totalPages <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setIsChanging(true);

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
     LOADING
  ====================================================== */

  if (loading) {
    return (
      <section
        id="gallery"
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

          {/* Header */}

          <div
            className="
              mx-auto
              mb-8
              max-w-3xl
              text-center
            "
          >
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
              ✦ Taste Through Your Eyes ✦
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
              Our Gallery
            </h2>
          </div>

          {/* Loading grid */}

          <div
            className="
              grid
              grid-cols-4
              gap-2
              sm:gap-3
              md:gap-4
            "
          >
            {Array.from({
              length: IMAGES_PER_PAGE,
            }).map((_, index) => (
              <GalleryPlaceholder
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
        id="gallery"
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
     NO IMAGES
  ====================================================== */

  if (images.length === 0) {
    return null;
  }

  return (
    <section
      id="gallery"
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
            HEADER
        ================================================== */}

        <div
          className="
            mx-auto
            mb-8
            max-w-3xl
            text-center
          "
        >

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
            ✦ Taste Through Your Eyes ✦
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
                tracking-tight
                text-orange-400
                sm:text-1xl
                md:text-1xl
              "
            >
              Our Gallery
            </h2>
          </div>

          <p
            className="
              mx-auto
              mt-4
              max-w-2xl
              text-sm
              leading-6
              text-white/40
              sm:text-base
            "
          >
            A glimpse of the flavours we
            create at HOT & SPICE.
          </p>

        </div>

        {/* =================================================
            IMAGE GRID
        ================================================== */}

        <div
          className={`
            grid
            grid-cols-4
            gap-2
            transition-all
            duration-500
            ease-out
            sm:gap-3
            md:gap-4
            ${
              isChanging
                ? "scale-[0.985] opacity-0 blur-[2px]"
                : "scale-100 opacity-100 blur-0"
            }
          `}
        >

          {visibleImages.map(
            (image, index) => (
              <div
                key={`${image.id}-${currentPage}`}
                className="
                  group
                  relative
                  aspect-square
                  overflow-hidden
                  rounded-xl
                  border
                  border-white/[0.08]
                  bg-white/[0.025]
                  shadow-lg
                  shadow-black/10
                  transition-all
                  duration-500
                  hover:-translate-y-1
                  hover:border-orange-400/30
                  hover:shadow-orange-500/10
                "
                style={{
                  transitionDelay: `${index * 35}ms`,
                }}
              >

                {/* Image */}

                <img
                  src={image.image_url}
                  alt={
                    image.image_alt ||
                    image.name
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
                    transition-all
                    duration-700
                    group-hover:scale-110
                  "
                />

                {/* Dark glass overlay */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-br
                    from-white/[0.04]
                    via-transparent
                    to-black/20
                    opacity-60
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                  "
                />

                {/* Orange glow */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -bottom-8
                    -right-8
                    h-16
                    w-16
                    rounded-full
                    bg-orange-500/10
                    blur-2xl
                    opacity-0
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                  "
                />

              </div>
            )
          )}

          {/* Fill remaining spaces */}

          {Array.from({
            length:
              IMAGES_PER_PAGE -
              visibleImages.length,
          }).map((_, index) => (
            <GalleryPlaceholder
              key={`placeholder-${index}`}
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

            {/* Previous */}

            <button
              type="button"
              onClick={() => {
                setIsChanging(true);

                setTimeout(() => {
                  setCurrentPage((page) =>
                    page === 0
                      ? totalPages - 1
                      : page - 1
                  );

                  setIsChanging(false);
                }, 300);
              }}
              aria-label="Previous gallery images"
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

            {/* Dots */}

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
                  onClick={() => {
                    if (
                      index ===
                      currentPage
                    ) {
                      return;
                    }

                    setIsChanging(true);

                    setTimeout(() => {
                      setCurrentPage(index);
                      setIsChanging(false);
                    }, 300);
                  }}
                  aria-label={`Show gallery page ${
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

            {/* Next */}

            <button
              type="button"
              onClick={() => {
                setIsChanging(true);

                setTimeout(() => {
                  setCurrentPage((page) =>
                    page >=
                      totalPages - 1
                      ? 0
                      : page + 1
                  );

                  setIsChanging(false);
                }, 300);
              }}
              aria-label="Next gallery images"
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
            ✦ Discover more flavours ✦
          </p>
        )}

      </div>
    </section>
  );
}

export default Gallery;
