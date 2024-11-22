import Header from "../../components/Header";
import Cards from "./cards";
import Banners from "./banner";
import MentorsSection from "./mentors";
import AwardsSection from "./awards";
import Footer from "../../components/Footer";
import Hero from "./hero";
import Cmpnycarousel from "../../components/cmpny-carousel";

const Aboutmain = () => {
 
  return (
    <>
      <Header />
      <Hero/>
      <Cmpnycarousel/>
      <Cards/>
      <Banners/>
      <MentorsSection/>
      <AwardsSection/>
      <Footer/>
    </>
  );
};

export default Aboutmain;
