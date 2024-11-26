import Hero from "./hero";
import Part2 from "./part2";
import Part3 from "./part3";
import Header from "../../../components/Header";
import ExploreTests from "./tests";
import Footer from "../../../components/Footer";

const TestdetailpgMain = () => {
  return (
    <div>

<Header/>
    
     <Hero/>
     <div className="lg:mr-7 lg:ml-11">
     <Part2/>
     <Part3/>
     <ExploreTests/>
    </div>
    <Footer/>
    </div>
  );
};

export default TestdetailpgMain;
