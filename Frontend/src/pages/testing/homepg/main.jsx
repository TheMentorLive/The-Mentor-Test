import React from 'react';
import Part1 from './part1';
import Part2 from './part2';
import Part3 from './part3';
import Part4 from './part4';
import Part5 from './part5';
import Cmpnycarousel from '../../../components/cmpny-carousel';

const HomepgMain = () => {
  return (
    <div className="container mx-auto p-8">
     <Part1/>
     <Cmpnycarousel/>
     <Part2/>
     <Part3/>
     <Part4/>
     <Part5/>
    </div>
  );
};

export default HomepgMain;
