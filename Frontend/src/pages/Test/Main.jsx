import Searchsec from "./search";
import Header from "../../components/Header";
import UPE from "./upe";
import Footer from "../../components/Footer";
import Hero from "./Hero";
import Exams from "./exams";
import Banners from "./banners";
export default function TestMain() {

    return(
        <div>
            <Header/>
            
                <Hero/>
                <div className="mt-20  ">
                <UPE/>
                <div className="lg:mr-40 lg:ml-40">
                <Searchsec/>
                </div>
                <Exams/>
                
                <div className="lg:mx-20">
                <Banners/>
                </div>
                <Footer/>
            </div>
        </div>
    );
}