import Navbar from "./Main/navbar";
import Hero from "./Main/hero"

import Types from "./Main/types";
// import Live from "./Main/live";
import LiveTabs from "./Main/livetabs";
import Learntabs from "./Main/learntabs";
import Footer from "./Main/footer";

function Main1() {


  return (
    <>
      
      <div >
        <Navbar/>
        <Hero/>
        
        <Types/>
        {/* <Live/> */}
        <LiveTabs/>
        <Learntabs/>
        <Footer/>
      </div>
    </>
  );
}


export default Main1;

