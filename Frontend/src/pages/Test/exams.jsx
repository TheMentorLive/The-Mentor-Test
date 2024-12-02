import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cexams from "../Learn/Cexams";
import CompanyExams from "../Learn/CBexams";
import Aexams from '../Learn/Aexams';
import { GEUESTENDPOINTS } from '/src/constants/ApiConstants';

const Exams = () => {
  const [examsData, setExamsData] = useState({
    competitiveExams: [],
    companyExams: [],
    academicExams: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch exams data
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get(GEUESTENDPOINTS.UPCOMMINGTESTS); // Adjust the URL based on your backend API
        const exams = response.data;

        // Categorize exams by type
        const competitiveExams = exams.filter(exam => exam.examType === 'Competitive Exams');
        const companyExams = exams.filter(exam => exam.examType === 'Company-based Tests');
        const academicExams = exams.filter(exam => exam.examType === 'Academic Exams');

        console.log(academicExams);
        
        setExamsData({
          competitiveExams,
          companyExams,
          academicExams,
        });
      } catch (error) {
        setError("Failed to fetch exams");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  if (loading) return <div className="flex items-center justify-center min-h-fit">
  <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Cexams exams={examsData.competitiveExams} />
      <CompanyExams exams={examsData.companyExams} />
      <Aexams exams={examsData.academicExams} />
    </div>
  );
};

export default Exams;
