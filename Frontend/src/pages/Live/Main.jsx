import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Mentorship from "../landingPage/mentorship";
import Hero from "./Hero";
import Whyus from "./whyus";
import OEE from "./oee";
import Orient from "./Orient";
import Emerge from "./Emerge";
import KeyFeatures from "./KeyFeat";
// import Component from "./test";

export default function Main() {

    return(
        <div>
            <Header/>
            <div className="mt-20">
                <Hero/>
                {/* <Component/> */}

                <Whyus/>
                <OEE/>
                <Orient/>
                <Emerge/>
                <KeyFeatures/>
                <Mentorship/>

                <Footer/>
            </div>
        </div>
    );
}