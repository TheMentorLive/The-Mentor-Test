// API base URL
export const API_BASE_URL = 'https://genai-backend-ten.vercel.app/api/';
// export const API_BASE_URL = 'http://localhost:8080/api/';


// API endpoints for admin
export const ADMINENDPOINTS = {
  GETUSERS: `${API_BASE_URL}admin/getUsers`,
  GETTEST: `${API_BASE_URL}admin/getTest`,
  ADDSUBJECT:`${API_BASE_URL}admin/addSubject`,
  GETSUBJECTS:`${API_BASE_URL}admin/getSubjects`,
  DELETESUBJECT:`${API_BASE_URL}admin/deleteSubject`,
  ADDTEST:`${API_BASE_URL}admin/addTest`,
   ADDCSVTEST:`${API_BASE_URL}admin/save-test`,
   GETMOCKTEST: `${API_BASE_URL}admin/getMockTest`,
   EDITMOCKTEST:`${API_BASE_URL}admin/editMockTest`,
   DELETEMOCKTEST:`${API_BASE_URL}admin/deleteMockTest`,
   GETMOCKTESTDETAILS:`${API_BASE_URL}admin/getMockTestDetails`,
   GETMAINTEST : `${API_BASE_URL}admin/getMainTest`,
   ADDCOURSE:`${API_BASE_URL}admin/addCourse`,
   GETCOURSE:`${API_BASE_URL}admin/getCourse`,
   DELETECOURSE:`${API_BASE_URL}admin/deleteCourse`,
   UPDATECOURSE:`${API_BASE_URL}admin/updateCourse`,

   ADDJOBS:`${API_BASE_URL}admin/addJobs`,
   GETJOBS:`${API_BASE_URL}admin/getJobs`,
   GETAllJOBS:`${API_BASE_URL}admin/getAllJobs`,

   ADDCATEGORY:`${API_BASE_URL}admin/addCategory`,
   ADDEXAMTYPE:`${API_BASE_URL}admin/addExamType`,
   GETCATEGORIES:`${API_BASE_URL}admin/getCategory`,
   GETEXAMTYPES:`${API_BASE_URL}admin/getExamType`,

   DELETECATEGORY:`${API_BASE_URL}admin/deleteCategory`,
   DELETEEXAMTYPE:`${API_BASE_URL}admin/deleteExamType`,
 
   
 

 
  // Add other endpoints here as needed
};

export const USERENDPOINTS = {
   GETTESTS: `${API_BASE_URL}user/getTests`,
    GETTESTSLANDING: `${API_BASE_URL}user/getTestsLanding`,
     SUBMITTEST: `${API_BASE_URL}user/submitTest`,
      GETCURRENTTESTRESULT: `${API_BASE_URL}user/results`,
        GETTESTHISTORY:`${API_BASE_URL}user/history `
}

export const GEUESTENDPOINTS = {
  GETGUESTJOBS: `${API_BASE_URL}user/getGuestJobs`,
 
}