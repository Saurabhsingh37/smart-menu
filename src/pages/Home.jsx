import Hero from "../sections/Hero";
import TodaySpecial from "../sections/TodaySpecial";
import Menu from "../sections/Menu";
import Gallery from "../sections/Gallery";
import Footer from "../components/footer";

function Home() {
  return (
    <>
      <Hero />
      <TodaySpecial />
      <Menu />
      <Gallery />
      <Footer />
    </>
  );
}

export default Home;