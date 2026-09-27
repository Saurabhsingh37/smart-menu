import { useEffect, useState } from "react";

import Hero from "../sections/Hero";
import TodaySpecial from "../sections/TodaySpecial";
import Menu from "../sections/Menu";
import Gallery from "../sections/Gallery";
import Footer from "../components/footer";

import OrderBookButton from "../components/OrderBookButton";
import OrderBookDrawer from "../components/OrderBookDrawer";
import ReviewOrder from "../components/ReviewOrder";

function Home() {
  const [orderBookOpen, setOrderBookOpen] = useState(false);
  const [reviewOrderOpen, setReviewOrderOpen] = useState(false);

  // =========================================================
  // OPEN ORDER BOOK
  // =========================================================
  const openOrderBook = () => {
    setOrderBookOpen(true);
    setReviewOrderOpen(false);

    // Add a browser history entry
    window.history.pushState(
      { page: "order-book" },
      "",
      window.location.pathname
    );
  };

  // =========================================================
  // OPEN REVIEW
  // =========================================================
  const openReviewOrder = () => {
    setOrderBookOpen(false);
    setReviewOrderOpen(true);

    // Add a browser history entry
    window.history.pushState(
      { page: "review-order" },
      "",
      window.location.pathname
    );
  };

  // =========================================================
  // BACK TO ORDER BOOK
  // =========================================================
  const backToOrderBook = () => {
    setReviewOrderOpen(false);
    setOrderBookOpen(true);
  };

  // =========================================================
  // BROWSER BACK BUTTON
  // =========================================================
  useEffect(() => {
    const handleBrowserBack = () => {
      // If Review is open → go back to Order Book
      if (reviewOrderOpen) {
        setReviewOrderOpen(false);
        setOrderBookOpen(true);
        return;
      }

      // If Order Book is open → go back to Home
      if (orderBookOpen) {
        setOrderBookOpen(false);
        setReviewOrderOpen(false);
        return;
      }
    };

    window.addEventListener(
      "popstate",
      handleBrowserBack
    );

    return () => {
      window.removeEventListener(
        "popstate",
        handleBrowserBack
      );
    };
  }, [orderBookOpen, reviewOrderOpen]);

  return (
    <>
      <Hero />

      <Menu />

      <TodaySpecial />

      <Gallery />

      <Footer />

      {/* Floating Order Book Button */}
      <OrderBookButton
        onClick={openOrderBook}
      />

      {/* Order Book */}
      <OrderBookDrawer
        isOpen={orderBookOpen}
        onClose={() => {
          setOrderBookOpen(false);

          // Remove the history entry
          if (window.history.state?.page === "order-book") {
            window.history.back();
          }
        }}
        onReview={openReviewOrder}
      />

      {/* Review Order */}
      <ReviewOrder
        isOpen={reviewOrderOpen}
        onBack={backToOrderBook}
      />
    </>
  );
}

export default Home;
