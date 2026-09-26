import { useState } from "react";

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

  const openReviewOrder = () => {
    setOrderBookOpen(false);
    setReviewOrderOpen(true);
  };

  const backToOrderBook = () => {
    setReviewOrderOpen(false);
    setOrderBookOpen(true);
  };

  return (
    <>
      <Hero />

      <Menu />

      <TodaySpecial />

      <Gallery />

      <Footer />

      {/* Floating Order Book Button */}
      <OrderBookButton
        onClick={() => setOrderBookOpen(true)}
      />

      {/* Order Book */}
      <OrderBookDrawer
        isOpen={orderBookOpen}
        onClose={() => setOrderBookOpen(false)}
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
