import Part1 from "./part1";
import Part2 from "./part2";
import Part3 from "./part3";
import Header from "../../../components/Header";

const TestdetailpgMain = () => {
  return (
    <div>

<Header/>
    
     <Part1/>
     <div className="lg:mr-7 lg:ml-11">
     <Part2/>
     <Part3/>
    </div>
    </div>
  );
};

export default TestdetailpgMain;
