import axios from "axios";
import { GEUESTENDPOINTS } from "/src/constants/ApiConstants";
import { Video, Users, GraduationCap } from "lucide-react";
import { useState, useEffect } from "react";
import moment from "moment";

export default function UPE() {
  const [examTypes, setExamTypes] = useState([]); // Stores all exam types
  const [examData, setExamData] = useState([]); // Stores test data for the selected exam type
  const [selectedExamType, setSelectedExamType] = useState(""); // Tracks the selected exam type
  const [loading, setLoading] = useState(false);

  // Fetch all exam types on component mount
  useEffect(() => {
    const fetchExamTypes = async () => {
      try {
        const response = await axios.get(GEUESTENDPOINTS.EXAM_TYPES);
        setExamTypes(response.data);

        // Set default selection to the first exam type, if available
        if (response.data.length > 0) {
          setSelectedExamType(response.data[0].name);
        }
      } catch (error) {
        console.error("Error fetching exam types:", error);
      }
    };

    fetchExamTypes();
  }, []);

  // Fetch tests when the selected exam type changes
  useEffect(() => {
    if (!selectedExamType) return;

    const fetchExamData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(GEUESTENDPOINTS.TESTS_BY_TYPE, {
          params: {
            examType: selectedExamType,
          },
        });
        setExamData(response.data);
      } catch (error) {
        console.error("Error fetching exam data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExamData();
  }, [selectedExamType]);

  const features = [
    {
      title: "Comprehensive Test Coverage",
      description: "Covers all topics with updated and relevant questions.",
      Icon: Video,
    },
    {
      title: "Expertly Curated Questions",
      description: "Questions prepared by industry experts for effective learning.",
      Icon: Users,
    },
    {
      title: "Track Your Progress",
      description: "Analyze performance and improve with detailed insights.",
      Icon: GraduationCap,
    },
  ];

  return (
    <div className="mb-10">
      <section className="px-4 md:px-6 mt-16 mb-16 mr-20 ml-20">
        <h2 className="mb-8 text-3xl font-bold tracking-tighter">
          Upcoming Professional Exams
        </h2>

        {/* Sidebar for selecting exam types */}
        <div className="grid gap-6 lg:grid-cols-[200px_1fr]">
          <div className="space-y-2 mt-8">
            {examTypes.map((type) => (
              <button
                key={type._id}
                onClick={() => setSelectedExamType(type.name)}
                className={`w-full px-4 py-2 rounded-md text-left ${
                  selectedExamType === type.name
                    ? "bg-blue-600 text-white"
                    : "text-blue-600 border border-blue-600 hover:bg-blue-50"
                }`}
              >
                {type.name}
              </button>
            ))}
          </div>

          {/* Test details */}
          <div className="relative">
            {loading ? (
              <div className="text-center py-10">Loading...</div>
            ) : examData.length > 0 ? (
              <div className="flex flex-wrap gap-4">
                {examData.map((exam, i) => (
                  <div
                    key={i}
                    className="w-full md:w-[300px] bg-white rounded-lg shadow-lg p-6"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={exam.image || "https://via.placeholder.com/40"}
                        alt="Exam"
                        className="h-10 w-10 rounded-full"
                      />
                      <h3 className="font-semibold">{exam.title}</h3>
                    </div>
                    <p className="mt-4 text-sm text-gray-600">
                      Exam Created Date:  {exam.updatedAt
                        ? moment(exam.updatedAt).format("DD MMM YYYY")
                        : "TBA"}
                    </p>
                    <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Get Started
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                No tests available for this category.
              </div>
            )}
            <button className="absolute -right-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-white shadow-lg flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          </div>
          
        </div>
      </section>
    </div>
  );
}
