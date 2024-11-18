import Searchsec from "./search";
import Header from "../../components/Header";
import UPE from "./upe";
import Footer from "./Footer";
import Hero from "./Hero";
export default function TestMain() {

    return(
        <div>
            <Header/>
            <div className="mt-20">
                <Hero/>
                <div className="mr-40 ml-40">
                <Searchsec/>
                <UPE/>
                </div>
                <Footer/>
            </div>
        </div>
    );
}