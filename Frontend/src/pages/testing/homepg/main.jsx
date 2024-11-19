import React from 'react';
import Part1 from './part1';
import Part2 from './part2';
import Part3 from './part3';
import Part4 from './part4';
import Part5 from './part5';
import Part6 from './part6';
import Cmpnycarousel from '../../../components/cmpny-carousel';
import Header from '../../../components/Header';

const HomepgMain = () => {
  return (
    <div className="">
      <Header/>
     <Part1/>
     <Cmpnycarousel/>
     <Part2/>
     <Part3/>
     <Part6/>
     <Part4/>
     <Part5/>
    </div>
  );
};

export default HomepgMain;
