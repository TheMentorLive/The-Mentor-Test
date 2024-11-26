import Header from "./Header";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cmpnycarousel from "./cmpny-carousel";
import { API_BASE_URL } from "../constants/ApiConstants";
import { toast } from 'react-toastify';
import axios from "axios";
import { FaChalkboardTeacher, FaClipboardList, FaUserGraduate } from "react-icons/fa";
import Footer from "./Footer";
import CountUp from 'react-countup';
import { Facebook, Twitter, LinkedIn } from '@mui/icons-material'

const About = () => {
 
  return (
    <>
      <Header />
      
    </>
  );
};

export default About;
