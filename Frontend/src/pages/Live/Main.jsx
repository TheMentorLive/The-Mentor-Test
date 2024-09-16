import Header from "../../components/Header";
import Hero from "./Hero";
import Whyus from "./whyus";
import OEE from "./oee";
import Orient from "./Orient";

export default function Main() {

    return(
        <div>
            <Header/>
            <div className="mt-20">
                <Hero/>
                <Whyus/>
                <OEE/>
                <Orient/>
            </div>
        </div>
    );
}