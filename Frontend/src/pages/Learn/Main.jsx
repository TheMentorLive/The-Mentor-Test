import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Hero from "./Hero";
import Cexams from "./Cexams";
import Aexams from "./Aexams";
import CompanyExams from "./CBexams";
import Features from "./Features";
import UCexams from "./UCexams";
import Item from "./detail/item";
export default function LearnMain() {

    return(
        <div>
            <Header/>
            <Hero/>
            <Cexams/>
            <Aexams/>
            <CompanyExams/>
            <Features/>
            <UCexams/>
            <Footer/>
        </div>
    );
}






// /**
//  * v0 by Vercel.
//  * @see https://v0.dev/t/DUCytbsQuGs
//  * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
//  */
// export default function Component() {
//     return (
//       <section className="max-w-4xl mx-auto p-4">
       
//       </section>
//     )
//   }