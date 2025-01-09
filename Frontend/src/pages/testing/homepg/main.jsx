import React from 'react';
import Part1 from './part1';
import Part2 from './part2';
import Part3 from './part3';
import Part4 from './part4';
import Part6 from './part6';
import Part7 from './part7';
import Cmpnycarousel from '../../../components/cmpny-carousel';
import Header from '../../../components/Header';
import Chatbot from '../chatbot/chatbot';

const HomepgMain = () => {
  return (
    <div className="">
      {/* Other components like routes */}
      <div className='z-100'>
      <Chatbot />
      </div>
      
   
    <div className="">
      <Header/>
     <Part1/>
     <Cmpnycarousel/>
     <Part7/>
     <Part2/>
     <Part3/>
     <Part6/>
     <Part4/>
  
    </div>
    </div>
  );
};

export default HomepgMain;
